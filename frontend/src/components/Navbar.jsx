import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.darkNavbar : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🎮 MobaFolio
        </Link>
        <div className={styles.navLinks}>
          <Link to="/home" className={styles.navLink}>
            🏠 Home
          </Link>
          <Link to="/about" className={styles.navLink}>
            📖 About
          </Link>
          <Link to="/contact" className={styles.navLink}>
            📞 Contact
          </Link>
          {user ? (
            <>
              <Link to="/create-post" className={styles.navLink}>
                ✍️ Write Post
              </Link>
              <Link to="/profile" className={styles.navLink}>
                👤 Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={`${styles.navLink} ${styles.adminLink}`}>
                  👑 Admin
                </Link>
              )}
              <button onClick={handleLogout} className={styles.logoutBtn}>
                🚪 Logout ({user.name})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                🔑 Login
              </Link>
              <Link to="/register" className={styles.navLink}>
                📝 Register
              </Link>
            </>
          )}
          
          {/* Dark/Light Mode Toggle Button */}
          <button onClick={toggleDarkMode} className={styles.themeToggle}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;