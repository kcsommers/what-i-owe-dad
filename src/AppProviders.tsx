import { BaseTheme } from 'kc_components/react/theme';
import { AuthProvider } from './context';
import { FirebaseProvider } from './firebase/firebase.context';

export const AppProviders = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <BaseTheme>{children}</BaseTheme>
      </AuthProvider>
    </FirebaseProvider>
  );
};
