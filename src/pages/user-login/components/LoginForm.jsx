import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your FoodPrep account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      signInButton: 'Sign In',
      signingIn: 'Signing In...',
      orContinueWith: 'Or continue with',
      googleSignIn: 'Continue with Google',
      facebookSignIn: 'Continue with Facebook',
      newUser: 'New to FoodPrep?',
      signUp: 'Create an account',
      invalidEmail: 'Please enter a valid email address',
      invalidPassword: 'Password must be at least 6 characters',
      invalidCredentials: 'Invalid email or password. Please try again.',
      networkError: 'Network error. Please check your connection and try again.'
    },
    es: {
      title: 'Bienvenido de Vuelta',
      subtitle: 'Inicia sesión en tu cuenta de FoodPrep',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'Ingresa tu correo',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signInButton: 'Iniciar Sesión',
      signingIn: 'Iniciando Sesión...',
      orContinueWith: 'O continúa con',
      googleSignIn: 'Continuar con Google',
      facebookSignIn: 'Continuar con Facebook',
      newUser: '¿Nuevo en FoodPrep?',
      signUp: 'Crear una cuenta',
      invalidEmail: 'Por favor ingresa un correo válido',
      invalidPassword: 'La contraseña debe tener al menos 6 caracteres',
      invalidCredentials: 'Correo o contraseña inválidos. Inténtalo de nuevo.',
      networkError: 'Error de red. Verifica tu conexión e inténtalo de nuevo.'
    },
    fr: {
      title: 'Bon Retour',
      subtitle: 'Connectez-vous à votre compte FoodPrep',
      emailLabel: 'Adresse Email',
      emailPlaceholder: 'Entrez votre email',
      passwordLabel: 'Mot de Passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      signInButton: 'Se Connecter',
      signingIn: 'Connexion...',
      orContinueWith: 'Ou continuez avec',
      googleSignIn: 'Continuer avec Google',
      facebookSignIn: 'Continuer avec Facebook',
      newUser: 'Nouveau sur FoodPrep?',
      signUp: 'Créer un compte',
      invalidEmail: 'Veuillez entrer une adresse email valide',
      invalidPassword: 'Le mot de passe doit contenir au moins 6 caractères',
      invalidCredentials: 'Email ou mot de passe invalide. Veuillez réessayer.',
      networkError: 'Erreur réseau. Vérifiez votre connexion et réessayez.'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations[currentLanguage];

  const mockCredentials = {
    email: 'user@foodprep.com',
    password: 'foodprep123'
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t.invalidEmail;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.invalidPassword;
    } else if (formData.password.length < 6) {
      newErrors.password = t.invalidPassword;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Store user session
        localStorage.setItem('userToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData.email);
        if (formData.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ form: t.invalidCredentials });
      }
    } catch (error) {
      setErrors({ form: t.networkError });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    console.log(`Social login with ${provider}`);
    localStorage.setItem('userToken', 'mock-social-jwt-token');
    localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
    navigate('/dashboard');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-text-secondary font-caption">
          {t.subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-text-primary">
            {t.emailLabel}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full ${errors.email ? 'border-error' : ''}`}
            required
          />
          {errors.email && (
            <p className="text-xs text-error font-caption flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-text-primary">
            {t.passwordLabel}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t.passwordPlaceholder}
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pr-10 ${errors.password ? 'border-error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center transition-smooth hover:opacity-70"
            >
              <Icon 
                name={showPassword ? 'EyeOff' : 'Eye'} 
                size={18} 
                color="var(--color-text-secondary)" 
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-error font-caption flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Input
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 mr-2"
            />
            <span className="text-sm text-text-secondary font-caption">
              {t.rememberMe}
            </span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/password-reset')}
            className="text-sm text-primary hover:text-primary/80 transition-smooth font-caption"
          >
            {t.forgotPassword}
          </button>
        </div>

        {/* Form Error */}
        {errors.form && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-sm">
            <p className="text-sm text-error font-caption flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-2" />
              {errors.form}
            </p>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          className="h-12"
        >
          {isLoading ? t.signingIn : t.signInButton}
        </Button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-text-secondary font-caption">
              {t.orContinueWith}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('Google')}
            iconName="Chrome"
            iconPosition="left"
            className="h-12"
          >
            {t.googleSignIn}
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('Facebook')}
            iconName="Facebook"
            iconPosition="left"
            className="h-12"
          >
            {t.facebookSignIn}
          </Button>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary font-caption">
          {t.newUser}{' '}
          <button
            onClick={() => navigate('/user-registration')}
            className="text-primary hover:text-primary/80 transition-smooth font-medium"
          >
            {t.signUp}
          </button>
        </p>
      </div>

      {/* Mock Credentials Info */}
      <div className="mt-6 p-3 bg-warning/10 border border-warning/20 rounded-sm">
        <p className="text-xs text-warning font-caption text-center">
          Demo: {mockCredentials.email} / {mockCredentials.password}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;