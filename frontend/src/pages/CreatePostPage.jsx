import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed: import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import styles from '../styles/CreatePostPage.module.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [heroName, setHeroName] = useState('');
  const [gameMode, setGameMode] = useState('Ranked');
  const [achievement, setAchievement] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const heroes = ['Lancelot', 'Gusion', 'Ling', 'Hayabusa', 'Fanny', 'Lunox', 'Kagura', 'Selena', 'Granger', 'Claude', 'Other'];
  const gameModes = ['Ranked', 'Classic', 'Brawl', 'Magic Chess', 'Tournament'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('heroName', heroName);
    formData.append('gameMode', gameMode);
    formData.append('achievement', achievement);
    if (image) formData.append('image', image);

    try {
      const { data } = await API.post('/posts', formData);
      navigate(`/posts/${data.post._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.createCard}>
        <div className={styles.header}>
          <h2>Share Your Achievement 🎮</h2>
          <p>Inspire other Mobile Legends players with your epic moments!</p>
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.createForm}>
          <div className={styles.formGroup}>
            <label>Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My First Savage with Lancelot!"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Hero Used</label>
              <select value={heroName} onChange={(e) => setHeroName(e.target.value)} className={styles.select}>
                <option value="">Select hero</option>
                {heroes.map(hero => (
                  <option key={hero} value={hero}>{hero}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Game Mode</label>
              <select value={gameMode} onChange={(e) => setGameMode(e.target.value)} className={styles.select}>
                {gameModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Achievement (Optional)</label>
            <input
              type="text"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              placeholder="e.g., Maniac, Savage, 15 kills, MVP..."
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Story / Experience</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="10"
              className={styles.textarea}
              placeholder="Share your gameplay experience, tips, or inspiration..."
              required
            />
          </div>

          {/* Image upload for ALL logged-in users */}
          <div className={styles.formGroup}>
            <label>Cover Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.fileInput}
            />
            <small className={styles.hint}>Upload a screenshot of your achievement! (Max 5MB)</small>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Publishing...' : 'Publish Achievement 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;