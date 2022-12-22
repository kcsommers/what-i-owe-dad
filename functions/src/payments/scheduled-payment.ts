import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';
admin.initializeApp();

interface ITransaction {
  amount: number;
  date: number;
  description: string;
}

// Define some parameters
const CHECKBOOK_API_URL = defineString('CHECKBOOK_API_URL');
const CHECKBOOK_API_KEY = defineString('CHECKBOOK_API_KEY');
const CHECKBOOK_API_SECRET = defineString('CHECKBOOK_API_SECRET');
const RECIPIENT_EMAIL = defineString('RECIPIENT_EMAIL');

const createCheckbookPayment = async (amount = 5000): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `${CHECKBOOK_API_KEY.value()}:${CHECKBOOK_API_SECRET.value()}`
    },
    body: JSON.stringify({
      recipient: RECIPIENT_EMAIL.value(),
      name: 'What I Owe Dad payment',
      amount: amount / 100,
      description: `Payment on ${new Date().toDateString()}`
    })
  };

  functions.logger.info('creating checkbook payment:::: ', amount);
  return fetch(`${CHECKBOOK_API_URL.value()}/digital`, options)
    .then((response) => response.json())
    .then((response) => {
      if (!response || response.error) {
        throw response.error;
      }
      functions.logger.info('checkbook payment response:::: ', response);
      return response;
    })
    .catch((error) => {
      functions.logger.error('checkbook payment error:::: ', error);
      throw error;
    });
};

const storePayment = async (payment: ITransaction) => {
  const writeResult = await admin
    .firestore()
    .collection('payments')
    .add(payment);
  return writeResult;
};

export const scheduledPayment = functions.https.onRequest(async (req, res) => {
  try {
    await storePayment({
      amount: 100,
      date: Date.now(),
      description: `Payment on ${new Date().toDateString()}`
    });
    const createPaymentResponse = await createCheckbookPayment();
    functions.logger.info('createPaymentResponse:::', createPaymentResponse);
    // Send back a message that we've successfully written the message
    res.json({
      result: `Payment with ID: ${createPaymentResponse.id} created.`
    });
  } catch (error) {
    res.json({ error });
  }
});

// .schedule('0 0 1 * *')
// export const scheduledPayment = functions.pubsub
//   .schedule('* * * * *')
//   .onRun(async (context) => {
//     try {
//       const dbResponse = await storePayment({
//         amount: 5000,
//         date: Date.now(),
//         description: `Payment on ${new Date().toDateString()}`
//       });
//       functions.logger.info(`Payment with ID: ${dbResponse.id} added to DB.`);
//       const checkbookResponse = await createCheckbookPayment();
//       // Send back a message that we've successfully written the message
//       functions.logger.info(
//         `Digital check with ID: ${checkbookResponse.id} created.`
//       );
//     } catch (error) {
//       functions.logger.error('checkbook payment error:::: ', error);
//     }
//   });
