import React from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';

const UserRegistration = () => {
  return (
    <AuthenticationLayout>
      <div className="space-y-8">
        <RegistrationForm />
        <SocialRegistration />
      </div>
    </AuthenticationLayout>
  );
};

export default UserRegistration;