import { Form } from 'kc_components/react/ui/Form';
import { emailRegex } from 'kc_components/common/utils/regex';
import { Layout } from 'kc_components/react/ui/Layout';

export const LoginPage = () => {
  const handleLogin = (e: MouseEvent | KeyboardEvent, inputs: any[]) => {
    console.log('inputs:::: ', inputs);
  };

  return (
    <Layout>
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
    </Layout>
  );
};
