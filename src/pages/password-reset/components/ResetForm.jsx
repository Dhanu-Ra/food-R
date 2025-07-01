import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ResetForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your email address and we\'ll send you a link to reset your password.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      sendButton: 'Send Reset Link',
      sendingButton: 'Sending...',
      successTitle: 'Check Your Email',
      successMessage: 'We\'ve sent a password reset link to',
      successInstructions: 'Please check your email inbox and spam folder. The link will expire in 15 minutes.',
      resendText: 'Didn\'t receive the email?',
      resendButton: 'Resend Link',
      resendCooldown: 'Please wait {time} seconds before requesting another reset link.',
      backToLogin: 'Back to Sign In',
      errors: {
        invalidEmail: 'Please enter a valid email address',
        networkError: 'Network error. Please check your connection and try again.',
        serverError: 'Server error. Please try again later.',
        rateLimited: 'Too many requests. Please wait before trying again.',
        emailNotFound: 'No account found with this email address'
      }
    },
    es: {
      title: 'Restablecer Contraseña',
      subtitle: 'Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
      emailLabel: 'Dirección de Correo',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      sendButton: 'Enviar Enlace',
      sendingButton: 'Enviando...',
      successTitle: 'Revisa tu Correo',
      successMessage: 'Hemos enviado un enlace de restablecimiento a',
      successInstructions: 'Por favor revisa tu bandeja de entrada y carpeta de spam. El enlace expirará en 15 minutos.',
      resendText: '¿No recibiste el correo?',
      resendButton: 'Reenviar Enlace',
      resendCooldown: 'Por favor espera {time} segundos antes de solicitar otro enlace.',
      backToLogin: 'Volver al Inicio',
      errors: {
        invalidEmail: 'Por favor ingresa una dirección de correo válida',
        networkError: 'Error de red. Verifica tu conexión e intenta de nuevo.',
        serverError: 'Error del servidor. Intenta más tarde.',
        rateLimited: 'Demasiadas solicitudes. Espera antes de intentar de nuevo.',
        emailNotFound: 'No se encontró cuenta con este correo electrónico'
      }
    },
    fr: {
      title: 'Réinitialiser le Mot de Passe',
      subtitle: 'Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
      emailLabel: 'Adresse E-mail',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      sendButton: 'Envoyer le Lien',
      sendingButton: 'Envoi en cours...',
      successTitle: 'Vérifiez votre E-mail',
      successMessage: 'Nous avons envoyé un lien de réinitialisation à',
      successInstructions: 'Veuillez vérifier votre boîte de réception et dossier spam. Le lien expirera dans 15 minutes.',
      resendText: 'Vous n\'avez pas reçu l\'e-mail ?',
      resendButton: 'Renvoyer le Lien',
      resendCooldown: 'Veuillez attendre {time} secondes avant de demander un autre lien.',
      backToLogin: 'Retour à la Connexion',
      errors: {
        invalidEmail: 'Veuillez entrer une adresse e-mail valide',
        networkError: 'Erreur réseau. Vérifiez votre connexion et réessayez.',
        serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
        rateLimited: 'Trop de demandes. Veuillez attendre avant de réessayer.',
        emailNotFound: 'Aucun compte trouvé avec cette adresse e-mail'
      }
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    let interval;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError(t.errors.invalidEmail);
      return;
    }

    if (!validateEmail(email)) {
      setError(t.errors.invalidEmail);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock API call - simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock different scenarios based on email
      if (email === 'blocked@example.com') {
        throw new Error('RATE_LIMITED');
      } else if (email === 'notfound@example.com') {
        throw new Error('EMAIL_NOT_FOUND');
      } else if (email === 'server@error.com') {
        throw new Error('SERVER_ERROR');
      }

      setIsSuccess(true);
      setCanResend(false);
      setCooldownTime(60); // 60 second cooldown
    } catch (err) {
      switch (err.message) {
        case 'RATE_LIMITED':
          setError(t.errors.rateLimited);
          setCanResend(false);
          setCooldownTime(300); // 5 minute cooldown for rate limiting
          break;
        case 'EMAIL_NOT_FOUND':
          setError(t.errors.emailNotFound);
          break;
        case 'SERVER_ERROR':
          setError(t.errors.serverError);
          break;
        default:
          setError(t.errors.networkError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (canResend) {
      setIsSuccess(false);
      setEmail('');
    }
  };

  const handleBackToLogin = () => {
    navigate('/user-login');
  };

  const t = translations[currentLanguage];

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Mail" size={32} color="var(--color-success)" />
        </div>
        
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
          {t.successTitle}
        </h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-text-secondary font-caption">
            {t.successMessage}
          </p>
          <p className="text-text-primary font-medium break-all">
            {email}
          </p>
          <p className="text-sm text-text-secondary font-caption">
            {t.successInstructions}
          </p>
        </div>

        <div className="space-y-4">
          {canResend ? (
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-2 font-caption">
                {t.resendText}
              </p>
              <Button
                variant="outline"
                onClick={handleResend}
                className="w-full"
              >
                {t.resendButton}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-text-secondary font-caption">
              {t.resendCooldown.replace('{time}', cooldownTime)}
            </p>
          )}
          
          <Button
            variant="ghost"
            onClick={handleBackToLogin}
            className="w-full"
          >
            {t.backToLogin}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="KeyRound" size={32} color="var(--color-primary)" />
        </div>
        
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {t.title}
        </h2>
        <p className="text-text-secondary font-caption">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2 font-caption">
            {t.emailLabel}
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={t.emailPlaceholder}
            disabled={isLoading}
            required
            className="w-full"
          />
        </div>

        {error && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-sm">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="text-sm text-error font-caption">{error}</p>
            </div>
          </div>
        )}

        {!canResend && cooldownTime > 0 && !error && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} color="var(--color-warning)" />
              <p className="text-sm text-warning font-caption">
                {t.resendCooldown.replace('{time}', cooldownTime)}
              </p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !email.trim()}
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? t.sendingButton : t.sendButton}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={handleBackToLogin}
          disabled={isLoading}
          className="w-full"
        >
          {t.backToLogin}
        </Button>
      </form>
    </div>
  );
};

export default ResetForm;