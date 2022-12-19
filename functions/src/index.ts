import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Firestore.
import * as admin from 'firebase-admin';
admin.initializeApp();

// .schedule('0 0 1 * *')
export const scheduledPayment = functions.pubsub
  .schedule('* * * * *')
  .onRun((context) => {
    functions.logger.info('scheduled function context:::: ', context);
  });

export const addPayment = functions.https.onRequest(async (req, res) => {
  const paymentJSON = req.query.paymentJSON as string;
  const writeResult = await admin
    .firestore()
    .collection('payments')
    .add(JSON.parse(paymentJSON));
  // Send back a message that we've successfully written the message
  res.json({ result: `Payment with ID: ${writeResult.id} added.` });
});

// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore
//   .document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('Uppercasing', context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({ uppercase }, { merge: true });
//   });
