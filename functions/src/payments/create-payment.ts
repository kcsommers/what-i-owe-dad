import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';
admin.initializeApp();

type CheckbookTransaction = {
  amount: number;
  date: Date;
  description: string;
  id: string;
  image_uri: string;
  name: string;
  number: number;
  recipient: string;
  remittance_advice: string[];
  status: string;
  severity: string;
  message: string;
  error?: string;
};

const CHECKBOOK_API_URL = process.env.CHECKBOOK_API_URL;
const CHECKBOOK_API_KEY = process.env.CHECKBOOK_API_KEY;
const CHECKBOOK_API_SECRET = process.env.CHECKBOOK_API_SECRET;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

const createCheckbookPayment = async (amount = 50): Promise<any> => {
  functions.logger.log('Creating checkbook payment::::', amount);
  const options: RequestInit = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `${CHECKBOOK_API_KEY}:${CHECKBOOK_API_SECRET}`
    },
    body: JSON.stringify({
      recipient: RECIPIENT_EMAIL,
      account_type: 'CHECKING',
      routing_number: process.env.TO_ROUTING_NUMBER,
      account_number: process.env.TO_ACCOUNT_NUMBER,
      name: 'Joni Blue',
      amount,
      description: `Payment on ${new Date().toDateString()}`
    })
  };

  // return fetch(`${CHECKBOOK_API_URL}/digital`, options)
  return fetch(`${CHECKBOOK_API_URL}/direct`, options)
    .then((response: Response) => response.json())
    .then((response: CheckbookTransaction) => {
      if (!response || response.error) {
        throw response.error;
      }
      functions.logger.info('Checkbook payment successful::::');
      return response;
    });
};

const storePayment = async (payment: CheckbookTransaction) => {
  functions.logger.log('Writing payment to firestore::::');
  const writeResult = await admin
    .firestore()
    .collection('payments')
    .add(payment);
  return writeResult;
};

export const createPayment = functions
  .region('us-central1')
  .pubsub.schedule('0 0 1 * *')
  .timeZone('Etc/UTC')
  .onRun(async (context) => {
    functions.logger.log('Running createPayment function::::', context);
    try {
      const createPaymentResponse = await createCheckbookPayment();
      functions.logger.log(
        'Successfully created checkbook payment:::: ',
        createPaymentResponse
      );
      storePayment(createPaymentResponse);
    } catch (error) {
      functions.logger.error('Error creating payment:::: ', error);
    }
    return null;
  });
