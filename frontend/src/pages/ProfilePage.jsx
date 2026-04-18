import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { UPLOADS_URL } from '../config';
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [favoriteHero, setFavoriteHero] = useState(user?.favoriteHero || '');
  const [rank, setRank] = useState(user?.rank || 'Warrior');
  const [profilePic, setProfilePic] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const ranks = ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory'];
  const heroes = ['Lancelot', 'Gusion', 'Ling', 'Hayabusa', 'Fanny', 'Lunox', 'Kagura', 'Selena', 'Granger', 'Claude'];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('favoriteHero', favoriteHero);
    formData.append('rank', rank);
    if (profilePic) formData.append('profilePic', profilePic);
    
    try {
      const { data } = await API.put('/auth/profile', formData);
      setUser(data.user);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    
    try {
      await API.put('/auth/change-password', { currentPassword, newPassword });
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
  };

  const profilePicUrl = user?.profilePic
    ? `${UPLOADS_URL}/${user.profilePic}`
    : '/default-avatar.png';

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <img 
            src={profilePicUrl} 
            alt={user?.name} 
            className={styles.profilePic}
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
          <h2>{user?.name}</h2>
          <p className={styles.userRole}>{user?.role === 'admin' ? '👑 Admin' : '🎮 Member'}</p>
          <p className={styles.userRank}>🏆 {user?.rank || 'Warrior'}</p>
        </div>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'password' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>
        
        {message && <div className={styles.successMsg}>{message}</div>}
        {error && <div className={styles.errorMsg}>{error}</div>}
        
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label>Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                className={styles.textarea}
                placeholder="Tell us about your MLBB journey..."
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Favorite Hero</label>
              <select value={favoriteHero} onChange={(e) => setFavoriteHero(e.target.value)} className={styles.select}>
                <option value="">Select your main hero</option>
                {heroes.map(hero => (
                  <option key={hero} value={hero}>{hero}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Current Rank</label>
              <select value={rank} onChange={(e) => setRank(e.target.value)} className={styles.select}>
                {ranks.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className={styles.fileInput}
              />
            </div>
            
            <button type="submit" className={styles.saveBtn}>Save Profile</button>
          </form>
        )}
        
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
            <div className={styles.formGroup}>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>New Password (min 6 characters)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            
            <button type="submit" className={styles.saveBtn}>Change Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;