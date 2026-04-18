import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import styles from '../styles/RegisterPage.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const { data } = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <div className={styles.gameIcon}>🎮</div>
          <h2>Join MobaFolio!</h2>
          <p>Start sharing your Mobile Legends achievements</p>
        </div>
        
        {error && <div className={styles.errorMsg}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="🔒 Password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="🔒 Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          
          <button type="submit" disabled={loading} className={styles.registerBtn}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <div className={styles.loginLink}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;