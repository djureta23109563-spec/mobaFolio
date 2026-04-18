import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import API from '../api/axios';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    API.get('/posts')
      .then((res) => {
        console.log('Posts loaded:', res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('Error loading posts:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.gameMode === filter;
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading achievements...</p>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Mobile Legends Achievements</h1>
        <p className={styles.heroSubtitle}>Share your epic moments and inspire the community!</p>
        <div className={styles.filterBar}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'Ranked' ? styles.active : ''}`}
            onClick={() => setFilter('Ranked')}
          >
            Ranked
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'Classic' ? styles.active : ''}`}
            onClick={() => setFilter('Classic')}
          >
            Classic
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'Brawl' ? styles.active : ''}`}
            onClick={() => setFilter('Brawl')}
          >
            Brawl
          </button>
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>No posts yet. Be the first to share your achievement!</p>
        </div>
      ) : (
        <div className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;