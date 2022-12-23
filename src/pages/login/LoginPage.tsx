import { emailRegex } from 'kc_components/common/utils/regex';
import { Form } from 'kc_components/react/ui/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: MouseEvent | KeyboardEvent, inputs: any[]) => {
    try {
      await login({
        email: inputs[0].value,
        password: inputs[1].value
      });
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoginError(errorMessage);
    }
  };

  return (
    <div className='flex-centered-content' style={{ height: '100vh' }}>
      <div style={{ width: '50%', minWidth: '350px' }}>
        <Form
          inputs={[
            {
              id: 'email',
              value: '',
              type: 'email',
              name: 'email',
              placeholder: 'Enter email address',
              label: {
                text: 'Email address',
                for: 'email'
              },
              validator: (value: string) => {
                if (!value || !emailRegex.test(value)) {
                  return 'Please enter a valid email';
                }
              }
            },
            {
              id: 'password',
              value: '',
              type: 'password',
              name: 'password',
              placeholder: 'Enter password',
              label: {
                text: 'Password',
                for: 'password'
              },
              validator: (value: string) => {
                if (!value) {
                  return 'Please enter a password';
                }
              }
            }
          ]}
          submitButton={{
            text: 'Log in'
          }}
          onSubmit={handleLogin}
        />
        {loginError && <p>{loginError}</p>}
      </div>
    </div>
  );
};
