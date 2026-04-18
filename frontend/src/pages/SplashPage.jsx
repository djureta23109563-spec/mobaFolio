import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/SplashPage.module.css';

const SplashPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/home');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className={styles.splashContainer}>
      <div className={styles.splashContent}>
        <div className={styles.logoWrapper}>
          <div className={styles.gameIcon}>🎮</div>
          <h1 className={styles.title}>MobaFolio</h1>
        </div>
        <p className={styles.tagline}>Share Your Mobile Legends Journey</p>
        <div className={styles.loader}>
          <div className={styles.loaderBar}></div>
        </div>
        <p className={styles.loadingText}>Loading amazing content...</p>
      </div>
    </div>
  );
};

export default SplashPage;