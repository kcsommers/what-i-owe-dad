import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext, useContext, useMemo } from 'react';
import { firebaseConfig } from './firebase-config';

interface IFirebaseContext {
  app: FirebaseApp;
  auth: Auth;
  analytics: Analytics;
  firestore: Firestore;
}

export const FirebaseContext = createContext<IFirebaseContext>(
  {} as IFirebaseContext
);

export const FirebaseProvider = ({ children }) => {
  const app = useMemo(() => initializeApp(firebaseConfig), []);
  const auth = useMemo(() => getAuth(app), []);
  const analytics = useMemo(() => getAnalytics(app), []);
  const firestore = useMemo(() => getFirestore(app), []);

  const providerValue = useMemo(
    () => ({
      app,
      auth,
      analytics,
      firestore
    }),
    [app, auth, analytics, firestore]
  );

  return (
    <FirebaseContext.Provider value={providerValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
