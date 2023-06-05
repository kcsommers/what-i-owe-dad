import classNames from 'classnames';
import { LoadingSpinner } from 'kc_components/react/ui/LoadingSpinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formValid = (): boolean => {
    let isValid = true;
    if (!emailInput) {
      setEmailError('required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!passwordInput) {
      setPasswordError('required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const handleLogin = async () => {
    setFormError('');
    if (!formValid()) {
      return;
    }
    setIsLoading(true);
    try {
      await login({
        email: emailInput,
        password: passwordInput
      });
      navigate('/');
    } catch (error: any) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setFormError('Login attempt failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className='bg-primary-2 min-h-screen flex items-center justify-center py-20 font-primary'
      style={{
        background:
          'linear-gradient(145deg, rgb(var(--color-primary)) 0%, rgb(var(--color-secondary-2)) 100%)'
      }}
    >
      <div
        className='w-[450px] max-w-[85%] min-h-[500px] bg-white pb-20 pt-10 px-12 rounded-sm'
        style={{
          height: 'calc(100vh - 10rem)'
        }}
      >
        <h1 className='text-3xl text-center mb-10'>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={classNames('mb-4 relative', styles.input_wrap)}>
            <label
              htmlFor='email'
              className={classNames('text-xs', {
                'text-primary-2': !emailError,
                'text-red-700': !!emailError
              })}
            >
              Email address
              {!!emailError && <span> {emailError}</span>}
            </label>
            <input
              type='email'
              id='email'
              className='block rounded-sm w-full py-1 text-lg'
              placeholder='Enter email address'
              onChange={(e: React.ChangeEvent) => {
                setEmailInput(e.target['value']);
              }}
              style={{
                borderBottom: '2px solid rgb(var(--color-foreground) / 0.35)'
              }}
            />
            <span
              className={classNames(
                'w-full h-[2px] bg-secondary absolute bottom-0',
                styles.border_cover
              )}
            ></span>
          </div>
          <div className={classNames('mb-4 relative', styles.input_wrap)}>
            <label
              htmlFor='password'
              className={classNames('text-xs', {
                'text-primary-2': !passwordError,
                'text-red-700': !!passwordError
              })}
            >
              Password
              {!!passwordError && <span> {passwordError}</span>}
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              className='px-1 blockrounded-sm w-full py-1 text-lg'
              onChange={(e: React.ChangeEvent) => {
                setPasswordInput(e.target['value']);
              }}
              style={{
                borderBottom: '2px solid rgb(var(--color-foreground) / 0.35)'
              }}
            />
            <span
              className={classNames(
                'w-full h-[2px] bg-secondary absolute bottom-0',
                styles.border_cover
              )}
            ></span>
          </div>
          <button className='cursor-pointer h-12 bg-primary-2 text-white w-full mt-4 rounded-sm flex items-center justify-center'>
            {isLoading ? <LoadingSpinner size='sm' /> : 'Login'}
          </button>
          {formError && (
            <div className='text-xs text-center mt-2 text-red-700'>
              {formError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
