import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import styles from '../styles/PostPage.module.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/posts/${id}`),
      API.get(`/comments/${id}`)
    ]).then(([postRes, commentRes]) => {
      setPost(postRes.data);
      setComments(commentRes.data);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await API.delete(`/posts/${id}`);
      navigate('/home');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;
    const { data } = await API.post(`/comments/${id}`, { body: commentBody });
    setComments([data.comment, ...comments]);
    setCommentBody('');
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) return <div className={styles.notFound}>Post not found</div>;

  const canEdit = user && (user._id === post.author?._id || user.role === 'admin');

  return (
    <div className={styles.postContainer}>
      <div className={styles.postCard}>
        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            className={styles.postImage}
          />
        )}
        
        <div className={styles.postContent}>
          <div className={styles.postMeta}>
            {post.gameMode && <span className={styles.gameMode}>{post.gameMode}</span>}
            {post.heroName && <span className={styles.heroName}>⚔️ {post.heroName}</span>}
          </div>
          
          <h1 className={styles.postTitle}>{post.title}</h1>
          
          <div className={styles.authorInfo}>
            <img 
              src={post.author?.profilePic ? `http://localhost:5000/uploads/${post.author.profilePic}` : '/default-avatar.png'} 
              alt={post.author?.name}
              className={styles.authorAvatar}
            />
            <div>
              <p className={styles.authorName}>{post.author?.name}</p>
              <p className={styles.postDate}>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          {post.achievement && (
            <div className={styles.achievement}>
              🎯 Achievement: {post.achievement}
            </div>
          )}
          
          <div className={styles.postBody}>
            <p>{post.body}</p>
          </div>
          
          {canEdit && (
            <div className={styles.postActions}>
              <Link to={`/edit-post/${post._id}`} className={styles.editBtn}>Edit Post</Link>
              <button onClick={handleDeletePost} className={styles.deleteBtn}>Delete Post</button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.commentsSection}>
        <h3>Comments ({comments.length})</h3>
        
        {user ? (
          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Share your thoughts on this achievement..."
              rows="3"
              className={styles.commentInput}
              required
            />
            <button type="submit" className={styles.submitCommentBtn}>Post Comment 💬</button>
          </form>
        ) : (
          <p className={styles.loginPrompt}>
            <Link to="/login">Login</Link> to leave a comment
          </p>
        )}
        
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <img 
                    src={comment.author?.profilePic ? `http://localhost:5000/uploads/${comment.author.profilePic}` : '/default-avatar.png'} 
                    alt={comment.author?.name}
                    className={styles.commentAvatar}
                  />
                  <div>
                    <strong>{comment.author?.name}</strong>
                    <p className={styles.commentDate}>{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {(user?._id === comment.author?._id || user?.role === 'admin') && (
                  <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteCommentBtn}>
                    Delete
                  </button>
                )}
              </div>
              <p className={styles.commentBody}>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;