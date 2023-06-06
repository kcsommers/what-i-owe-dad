import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();
  console.log('isloggedin:::: ', isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Component {...rest} />;
};
