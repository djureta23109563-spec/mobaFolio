import { useState, useEffect } from 'react';
import API from '../api/axios';
import styles from '../styles/AdminPage.module.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/admin/users'),
      API.get('/admin/posts')
    ]).then(([usersRes, postsRes]) => {
      setUsers(usersRes.data);
      setPosts(postsRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map(u => u._id === id ? data.user : u));
  };

  const removePost = async (id) => {
    if (window.confirm('Remove this post?')) {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h2>👑 Admin Dashboard</h2>
          <p>Manage MobaFolio community</p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${tab === 'users' ? styles.activeTab : ''}`}
            onClick={() => setTab('users')}
          >
            👥 Members ({users.length})
          </button>
          <button 
            className={`${styles.tab} ${tab === 'posts' ? styles.activeTab : ''}`}
            onClick={() => setTab('posts')}
          >
            📝 All Posts ({posts.length})
          </button>
        </div>

        {tab === 'users' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Rank</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className={styles.userCell}>
                        <img 
                          src={user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : '/default-avatar.png'} 
                          alt={user.name}
                          className={styles.userAvatar}
                        />
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.rank || 'Warrior'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => toggleStatus(user._id)}
                        className={user.status === 'active' ? styles.deactivateBtn : styles.activateBtn}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'posts' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Hero</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id}>
                    <td className={styles.postTitle}>{post.title}</td>
                    <td>{post.author?.name || 'Unknown'}</td>
                    <td>{post.heroName || '-'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[post.status]}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      {post.status === 'published' && (
                        <button 
                          onClick={() => removePost(post._id)}
                          className={styles.removeBtn}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;