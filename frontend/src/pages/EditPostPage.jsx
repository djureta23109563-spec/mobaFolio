import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Remove useAuth since user is not needed (image upload now for all users)
import API from '../api/axios';
import styles from '../styles/EditPostPage.module.css';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [heroName, setHeroName] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [achievement, setAchievement] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const heroes = ['Lancelot', 'Gusion', 'Ling', 'Hayabusa', 'Fanny', 'Lunox', 'Kagura', 'Selena', 'Granger', 'Claude', 'Other'];
  const gameModes = ['Ranked', 'Classic', 'Brawl', 'Magic Chess', 'Tournament'];

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        const post = res.data;
        setTitle(post.title);
        setBody(post.body);
        setHeroName(post.heroName || '');
        setGameMode(post.gameMode || 'Ranked');
        setAchievement(post.achievement || '');
      })
      .catch(() => setError('Failed to load post'))
      .finally(() => setFetching(false));
  }, [id]);

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
      await API.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className={styles.editContainer}>
      <div className={styles.editCard}>
        <div className={styles.header}>
          <h2>Edit Your Achievement ✏️</h2>
          <p>Update your Mobile Legends story</p>
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label>Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <label>Achievement</label>
            <input
              type="text"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              placeholder="e.g., Maniac, Savage, 15 kills..."
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
              required
            />
          </div>

          {/* Image upload for ALL logged-in users */}
          <div className={styles.formGroup}>
            <label>Change Cover Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.fileInput}
            />
            <small className={styles.hint}>Upload a new screenshot (Max 5MB)</small>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Updating...' : 'Update Post 🔄'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;