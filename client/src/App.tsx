import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import {useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/authStore';
import Navbar from './components/layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import QuizHistoryDetail from './pages/QuizHistoryDetail';
import { Sparkles, ArrowRight, Star, RefreshCw, Check } from 'lucide-react';
import Favorites from './pages/Favorites.tsx';
import MinimalTest from './pages/MinimalTest';

// ========== Home Component ==========
const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

    <div className="home-page"></div>
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content fade-in">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Персональный подбор косметики</span>
          </div>

          <h1 className="hero-title">
            Найдите идеальную косметику
            <span className="gradient-text"> для вашей кожи</span>
          </h1>

          <p className="hero-subtitle">
            Ответьте на несколько вопросов и получите персонализированные рекомендации
            на основе вашего типа кожи, проблем и целей
          </p>

          <div className="hero-buttons">
            {authStore.isAuthenticated ? (
              <>
                <Link to="/quiz" className="btn-gradient btn-large">
                  Пройти квиз
                  <ArrowRight size={20} />
                </Link>
                <Link to="/catalog" className="btn-secondary btn-large">
                  Избранное
                </Link>
              </>
            ) : (
              <>
                <Link to="/quiz" className="btn-gradient btn-large">
                  Пройти квиз бесплатно
                  <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="btn-secondary btn-large">
                  Создать аккаунт
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Товаров в базе</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Точность подбора</div>
            </div>
          </div>
        </div>

              <div className="hero-visual">
        <div className="hero-glow"></div>
        <div className="hero-image">
          <img 
            src="/images/cosmetics-main.jpeg" 
            alt="Cosmetics"
            className="hero-image-main"
          />
          <div className="hero-image-secondary">
            <img 
              src="/images/cosmetics-secondary.jpeg" 
              alt="Skincare"
            />
          </div>
        </div>
      </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Почему My Skin?</h2>
          <p className="section-subtitle">
            Мы используем умный алгоритм для подбора косметики
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card slide-in">
            <div className="feature-icon">
              <Sparkles size={32} />
            </div>
            <h3 className="feature-title">Персонализация</h3>
            <p className="feature-desc">
              Учитываем ваш тип кожи, проблемы и цели для точного подбора
            </p>
          </div>

          <div className="feature-card slide-in">
            <div className="feature-icon">
              <Star size={32} />
            </div>
            <h3 className="feature-title">Проверенные товары</h3>
            <p className="feature-desc">
              Только качественные продукты от известных брендов
            </p>
          </div>

          <div className="feature-card slide-in">
            <div className="feature-icon">
              <RefreshCw size={32} />
            </div>
            <h3 className="feature-title">История квизов</h3>
            <p className="feature-desc">
              Сохраняем результаты для отслеживания прогресса
            </p>
          </div>

          <div className="feature-card slide-in">
            <div className="feature-icon">
              <Check size={32} />
            </div>
            <h3 className="feature-title">Бесплатно</h3>
            <p className="feature-desc">
              Полностью бесплатный сервис без скрытых платежей
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">Как это работает?</h2>
          <p className="section-subtitle">
            Всего 3 простых шага к идеальной косметике
          </p>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-number-circle">
              <span className="step-number">1</span>
            </div>
            <h3 className="step-title">Пройдите квиз</h3>
            <p className="step-desc">
              Ответьте на вопросы о типе кожи, проблемах и целях
            </p>
          </div>

          <div className="step-connector">
            <div className="connector-line"></div>
          </div>

          <div className="step-item">
            <div className="step-number-circle">
              <span className="step-number">2</span>
            </div>
            <h3 className="step-title">Получите рекомендации</h3>
            <p className="step-desc">
              Алгоритм подберёт товары с максимальным совпадением
            </p>
          </div>

          <div className="step-connector">
            <div className="connector-line"></div>
          </div>

          <div className="step-item">
            <div className="step-number-circle">
              <span className="step-number">3</span>
            </div>
            <h3 className="step-title">Добавьте в корзину</h3>
            <p className="step-desc">
              Оформите заказ и получите персональную рутину
            </p>
          </div>
        </div>
      </section> 
      {/* CTA Section */}
      {!authStore.isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content fade-in">
            <h2 className="cta-title">Готовы найти свою идеальную косметику?</h2>
            <p className="cta-subtitle">
              Пройдите квиз прямо сейчас и получите персональные рекомендации
            </p>
            <Link to="/quiz" className="btn-gradient btn-large">
              Начать сейчас
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

// ========== Protected Route Component ==========
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// ========== App Component ==========
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/minimal-test" element={<MinimalTest />} />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/history/:id"
          element={
            <ProtectedRoute>
              <QuizHistoryDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);