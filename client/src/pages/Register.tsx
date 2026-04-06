import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { Sparkles, Mail, Lock, User as UserIcon, AlertCircle, X } from 'lucide-react';

const Register = observer(() => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    authStore.error = null;
    
    const success = await authStore.register(email, password, name);
    
    if (success) {
      navigate('/quiz');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !authStore.isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearError = () => {
    authStore.error = null;
  };

  return (
    <div className="page-container">
      <div className="auth-card fade-in">
        {/* Header */}
        <div className="auth-header">
          <div className="logo-circle">
            <Sparkles size={32} className="gradient-icon" />
          </div>
          <h1 className="auth-title">Создать аккаунт</h1>
          <p className="auth-subtitle">Присоединяйтесь к MotionMood</p>
        </div>

        {/* Form - div, не form! */}
        <div className="auth-form">
          {/* Name */}
          <div className="form-group">
            <label className="form-label">
              <UserIcon size={18} />
              Имя <span className="optional">(необязательно)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ваше имя"
              className="input-modern"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="your@email.com"
              className="input-modern"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">
              <Lock size={18} />
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Минимум 6 символов"
              className="input-modern"
              required
              minLength={6}
            />
          </div>

          {/* Error Message */}
          {authStore.error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{authStore.error}</span>
              <button type="button" onClick={clearError} className="error-close">
                <X size={16} />
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={authStore.isLoading}
            className="btn-gradient btn-full"
          >
            {authStore.isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <span>Уже есть аккаунт?</span>
          <Link to="/login" className="link-primary">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Register;