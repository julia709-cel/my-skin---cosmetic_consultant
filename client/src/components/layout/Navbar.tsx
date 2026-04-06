import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/authStore';
import { Flower2, Heart, LogOut, User } from 'lucide-react';
import { favoriteStore } from '../../stores/favoriteStore';

const Navbar = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <Flower2 size={28} />
          <span>My Skin</span>
        </Link>

        <div className="menu">
          {authStore.isAuthenticated ? (
            <>
              <Link to="/quiz" className="link">
                Квиз
              </Link>
              <Link to="/favorites" className="link">
                <Heart size={18} />
                Избранное {favoriteStore.totalCount > 0 && `(${favoriteStore.totalCount})`}
              </Link>
              <Link to="/profile" className="link">
                <User size={18} />
                Профиль
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link">
                Войти
              </Link>
              <Link to="/register" className="btn">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;