import React from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import LoginForm from './components/LoginForm';

const UserLogin = () => {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default UserLogin;