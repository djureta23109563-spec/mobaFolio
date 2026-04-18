import { Link } from 'react-router-dom';
import { UPLOADS_URL } from '../config';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  const imageUrl = post.image ? `${UPLOADS_URL}/${post.image}` : null;
  
  console.log('PostCard image URL:', imageUrl); // Debug log

  return (
    <div className={styles.card}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className={styles.cardImage}
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load:', imageUrl);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', imageUrl);
          }}
        />
      )}
      <div className={styles.cardContent}>
        {post.gameMode && (
          <span className={styles.gameMode}>{post.gameMode}</span>
        )}
        {post.heroName && (
          <span className={styles.heroName}>⚔️ {post.heroName}</span>
        )}
        <h3 className={styles.cardTitle}>
          <Link to={`/posts/${post._id}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.author}>
          👤 {post.author?.name || 'Unknown'} 
          {post.author?.rank && ` • 🏆 ${post.author.rank}`}
        </p>
        <p className={styles.cardBody}>
          {post.body && post.body.length > 150 
            ? post.body.substring(0, 150) + '...' 
            : post.body}
        </p>
        {post.achievement && (
          <div className={styles.achievement}>
            🎯 Achievement: {post.achievement}
          </div>
        )}
        <Link to={`/posts/${post._id}`} className={styles.readMore}>
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;