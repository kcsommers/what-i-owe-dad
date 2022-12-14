import { collection, Firestore, getDocs } from 'firebase/firestore';

export const getLoansCollection = async (db: Firestore) => {
  return await getDocs(collection(db, 'loans'));
};
