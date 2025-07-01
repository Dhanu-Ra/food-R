import React from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import ResetForm from './components/ResetForm';

const PasswordReset = () => {
  return (
    <>
      <Helmet>
        <title>Password Reset - FoodPrep</title>
        <meta name="description" content="Reset your FoodPrep account password securely through email verification." />
        <meta name="keywords" content="password reset, account recovery, forgot password, FoodPrep" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AuthenticationLayout>
        <ResetForm />
      </AuthenticationLayout>
    </>
  );
};

export default PasswordReset;