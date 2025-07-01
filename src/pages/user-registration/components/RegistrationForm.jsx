import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      createAccount: 'Create Account',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      creating: 'Creating Account...',
      termsText: 'By creating an account, you agree to our',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
      and: 'and',
      errors: {
        fullNameRequired: 'Full name is required',
        fullNameMin: 'Full name must be at least 2 characters',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 8 characters',
        passwordMismatch: 'Passwords do not match',
        confirmPasswordRequired: 'Please confirm your password'
      }
    },
    es: {
      createAccount: 'Crear Cuenta',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Ingresa tu nombre completo',
      email: 'Correo Electrónico',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      password: 'Contraseña',
      passwordPlaceholder: 'Crea una contraseña',
      confirmPassword: 'Confirmar Contraseña',
      confirmPasswordPlaceholder: 'Confirma tu contraseña',
      passwordStrength: 'Fuerza de Contraseña',
      weak: 'Débil',
      fair: 'Regular',
      good: 'Buena',
      strong: 'Fuerte',
      creating: 'Creando Cuenta...',
      termsText: 'Al crear una cuenta, aceptas nuestros',
      termsLink: 'Términos de Servicio',
      privacyLink: 'Política de Privacidad',
      and: 'y',
      errors: {
        fullNameRequired: 'El nombre completo es requerido',
        fullNameMin: 'El nombre debe tener al menos 2 caracteres',
        emailRequired: 'El correo electrónico es requerido',
        emailInvalid: 'Por favor ingresa un correo válido',
        passwordRequired: 'La contraseña es requerida',
        passwordMin: 'La contraseña debe tener al menos 8 caracteres',
        passwordMismatch: 'Las contraseñas no coinciden',
        confirmPasswordRequired: 'Por favor confirma tu contraseña'
      }
    },
    fr: {
      createAccount: 'Créer un Compte',
      fullName: 'Nom Complet',
      fullNamePlaceholder: 'Entrez votre nom complet',
      email: 'Adresse Email',
      emailPlaceholder: 'Entrez votre adresse email',
      password: 'Mot de Passe',
      passwordPlaceholder: 'Créez un mot de passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      passwordStrength: 'Force du Mot de Passe',
      weak: 'Faible',
      fair: 'Correct',
      good: 'Bon',
      strong: 'Fort',
      creating: 'Création du Compte...',
      termsText: 'En créant un compte, vous acceptez nos',
      termsLink: 'Conditions de Service',
      privacyLink: 'Politique de Confidentialité',
      and: 'et',
      errors: {
        fullNameRequired: 'Le nom complet est requis',
        fullNameMin: 'Le nom doit contenir au moins 2 caractères',
        emailRequired: 'L\'adresse email est requise',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        passwordRequired: 'Le mot de passe est requis',
        passwordMin: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        confirmPasswordRequired: 'Veuillez confirmer votre mot de passe'
      }
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    const t = translations[currentLanguage];
    switch (strength) {
      case 0:
      case 1:
        return t.weak;
      case 2:
        return t.fair;
      case 3:
        return t.good;
      case 4:
      case 5:
        return t.strong;
      default:
        return t.weak;
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-error';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-secondary';
      case 4:
      case 5:
        return 'bg-success';
      default:
        return 'bg-error';
    }
  };

  const validateField = (name, value) => {
    const t = translations[currentLanguage];
    switch (name) {
      case 'fullName':
        if (!value.trim()) return t.errors.fullNameRequired;
        if (value.trim().length < 2) return t.errors.fullNameMin;
        return '';
      case 'email':
        if (!value.trim()) return t.errors.emailRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.errors.emailInvalid;
        return '';
      case 'password':
        if (!value) return t.errors.passwordRequired;
        if (value.length < 8) return t.errors.passwordMin;
        return '';
      case 'confirmPassword':
        if (!value) return t.errors.confirmPasswordRequired;
        if (value !== formData.password) return t.errors.passwordMismatch;
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Validate confirm password if password changes
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Mock API call - simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date().toISOString()
      }));
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const t = translations[currentLanguage];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {t.createAccount}
        </h1>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary">
          {t.fullName}
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder={t.fullNamePlaceholder}
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`w-full ${errors.fullName ? 'border-error' : ''}`}
          required
        />
        {errors.fullName && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          {t.email}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`w-full ${errors.email ? 'border-error' : ''}`}
          required
        />
        {errors.email && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          {t.password}
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t.passwordPlaceholder}
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pr-12 ${errors.password ? 'border-error' : ''}`}
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
        {formData.password && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">{t.passwordStrength}</span>
              <span className="text-xs text-text-secondary">
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-smooth ${getPasswordStrengthColor(passwordStrength)}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
          {t.confirmPassword}
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t.confirmPasswordPlaceholder}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-smooth hover:opacity-70"
          >
            <Icon 
              name={showConfirmPassword ? 'EyeOff' : 'Eye'} 
              size={18} 
              color="var(--color-text-secondary)" 
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* Terms and Privacy */}
      <div className="text-center">
        <p className="text-xs text-text-secondary font-caption leading-relaxed">
          {t.termsText}{' '}
          <button type="button" className="text-primary hover:underline transition-smooth">
            {t.termsLink}
          </button>{' '}
          {t.and}{' '}
          <button type="button" className="text-primary hover:underline transition-smooth">
            {t.privacyLink}
          </button>
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="text-center">
          <p className="text-sm text-error flex items-center justify-center space-x-1">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span>{errors.submit}</span>
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-8"
      >
        {isLoading ? t.creating : t.createAccount}
      </Button>
    </form>
  );
};

export default RegistrationForm;