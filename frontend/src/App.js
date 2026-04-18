import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';
import styles from './styles/App.module.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <SplashPage />;
  }

  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes - Requires Login */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/create-post" element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        } />
        <Route path="/edit-post/:id" element={
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        } />

        {/* Admin Only Route */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;