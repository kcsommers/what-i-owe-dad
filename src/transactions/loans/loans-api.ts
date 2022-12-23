import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';

export const getLoansCollection = async (db: Firestore) => {
  const loansRef = collection(db, 'loans');
  const q = query(loansRef, orderBy('date', 'desc'));
  return await getDocs(q);
};
