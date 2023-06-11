import { AuthProvider } from './context';
import { FirebaseProvider } from './firebase/firebase.context';

export const AppProviders = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </FirebaseProvider>
  );
};
