import { collection, Firestore, getDocs } from 'firebase/firestore';

export const getPaymentsCollection = async (db: Firestore) => {
  return await getDocs(collection(db, 'payments'));
};
