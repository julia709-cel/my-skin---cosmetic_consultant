import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { Sparkles, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = observer(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Максимальная блокировка события кнопки
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔵 handleLogin called');
    
    setError(null);
    authStore.error = null;
    setIsLoading(true);
    
    try {
      const result = await authStore.login(email, password);
      console.log('🔵 Result:', result);
      console.log('🔵 Error:', authStore.error);
      
      if (result) {
        console.log('✅ Success!');
        navigate('/quiz', { replace: true });
      } else {
        console.log('❌ Failed! Setting error...');
        setError(authStore.error || 'Ошибка входа');
      }
    } catch (err) {
      console.error('💥 Exception:', err);
      setError('Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
    
    // Возвращаем false чтобы предотвратить любые действия
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      // Находим кнопку и кликаем программно
      const button = document.querySelector('button[type="button"]') as HTMLButtonElement;
      if (button && !isLoading) {
        button.click();
      }
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="logo-circle">
            <Sparkles size={32} className="gradient-icon" />
          </div>
          <h1 className="auth-title">С возвращением!</h1>
          <p className="auth-subtitle">Войдите в свой аккаунт MotionMood</p>
        </div>

        {/* ВАЖНО: onReset тоже блокируем! */}
        <div 
          className="auth-form"
          onReset={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {/* Email - type="text" чтобы браузер не распознал как форму входа */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={18} />
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="your@email.com"
              className="input-modern"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              name="email-field"
              id="email-field"
            />
          </div>

          {/* Password - autoComplete="new-password" отключает менеджер паролей */}
          <div className="form-group">
            <label className="form-label">
              <Lock size={18} />
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="••••••••"
              className="input-modern"
              autoComplete="new-password"
              name="password-field"
              id="password-field"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="error-message"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '2px solid #ef4444',
                color: '#fca5a5',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '1rem',
                animation: 'shake 0.5s ease-in-out'
              }}
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button - type="button" и ВСЕ обработчики! */}
          <button
            type="button"
            onClick={handleLogin}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleLogin(e as any);
              }
            }}
            disabled={isLoading}
            className="btn-gradient btn-full"
            style={{
              width: '100%',
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'wait' : 'pointer',
              pointerEvents: isLoading ? 'none' : 'auto',
              userSelect: 'none'
            }}
          >
            {isLoading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Вход...
              </span>
            ) : (
              'Войти'
            )}
          </button>
        </div>

        <div className="auth-footer">
          <span>Нет аккаунта?</span>
          <Link to="/register" className="link-primary">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;