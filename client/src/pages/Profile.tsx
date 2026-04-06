import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { quizService, type QuizHistory } from '../services/quizService';
import { User, History, Sparkles, Calendar, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Profile = observer(() => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await quizService.getHistory();
      setHistory(result.history);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSkinTypeName = (skinType: string) => {
    const names: { [key: string]: string } = {
      oily: 'Жирная',
      dry: 'Сухая',
      normal: 'Нормальная',
      combination: 'Комбинированная',
    };
    return names[skinType] || skinType;
  };

  const getGoalName = (goal: string) => {
    const names: { [key: string]: string } = {
      hydration: 'Увлажнение',
      'anti-aging': 'Омоложение',
      cleansing: 'Очищение',
      protection: 'Защита',
    };
    return names[goal] || goal;
  };

  const handleLogout = () => {
    authStore.logout();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header fade-in">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {authStore.user?.name || 'Пользователь'}
            </h1>
            <p className="profile-email">{authStore.user?.email}</p>
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid fade-in">
          <div className="stat-card">
            <div className="stat-icon">
              <History size={24} />
            </div>
            <div className="stat-value">{history.length}</div>
            <div className="stat-label">Пройдено квизов</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Sparkles size={24} />
            </div>
            <div className="stat-value">
              {history.reduce((acc, q) => acc + q.recommendations.length, 0)}
            </div>
            <div className="stat-label">Товаров подобрано</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-value">
              {history.length > 0 ? 'Активен' : 'Новичок'}
            </div>
            <div className="stat-label">Статус</div>
          </div>
        </div>

        {/* Quiz History */}
        <div className="history-section fade-in">
          <div className="section-header">
            <h2 className="section-title">
              <History size={24} />
              История квизов
            </h2>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <span>Загрузка истории...</span>
            </div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Sparkles size={64} />
              </div>
              <h3 className="empty-title">У вас пока нет пройденных квизов</h3>
              <p className="empty-subtitle">
                Пройдите квиз и получите персональные рекомендации
              </p>
              <button onClick={() => navigate('/quiz')} className="btn-gradient">
                Пройти квиз
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="history-list">
              {history.map((quiz) => (
                <div
                  key={quiz.id}
                  className="history-item"
                  onClick={() => navigate(`/quiz/history/${quiz.id}`)}
                >
                  <div className="history-content">
                    <div className="history-date">
                      <Calendar size={16} />
                      <span>{formatDate(quiz.createdAt)}</span>
                    </div>
                    <div className="history-tags">
                      <span className="tag tag-primary">
                        Тип: {getSkinTypeName(quiz.skinType)}
                      </span>
                      <span className="tag tag-secondary">
                        Цель: {getGoalName(quiz.goal)}
                      </span>
                      <span className="tag tag-tertiary">
                        {quiz.recommendations.length} товаров
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="history-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Profile;