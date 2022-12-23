import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';

export const getPaymentsCollection = async (db: Firestore) => {
  const paymentsRef = collection(db, 'payments');
  const q = query(paymentsRef, orderBy('date', 'desc'));
  return await getDocs(q);
};
