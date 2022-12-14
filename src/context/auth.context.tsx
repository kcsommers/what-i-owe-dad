import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { useFirebase } from '../firebase/firebase.context';

const USER_STORAGE_KEY = '__kc__user';

interface IAuthContext {
  user: User;
  isLoggedIn: boolean;
  login: (creds: { email: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
  register: (creds: { email: string; password: string }) => Promise<User>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const getUserFromStorage = () =>
  JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY));

const setUserInStorage = (user: User) => {
  if (!user) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(getUserFromStorage());
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const { auth } = useFirebase();

  const updateUser = (user: User) => {
    setIsLoggedIn(!!user);
    setUser(user);
    setUserInStorage(user);
  };

  const login = async (creds: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      // sign in with firebase sdk
      const userCreds: UserCredential = await signInWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
      );
      updateUser(userCreds.user);
      return userCreds.user;
    } catch (error) {
      console.error('AuthProvider.login', error);
      updateUser(null);
      return Promise.reject(error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // sign out with firebase sdk
      await signOut(auth);
      updateUser(null);
      return;
    } catch (error) {
      console.error('AuthProvider.logout', error);
      updateUser(null);
      return Promise.reject(error);
    }
  };

  const register = async (creds: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      // register with firebase sdk
      const userCreds: UserCredential = await createUserWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
      );
      updateUser(userCreds.user);
      return userCreds.user;
    } catch (error) {
      console.error('AuthProvider.register', error);
      updateUser(null);
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
