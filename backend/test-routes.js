console.log('Testing route imports...\n');

try {
  const authRoutes = require('./routes/auth.routes');
  console.log('✅ auth.routes - Type:', typeof authRoutes);
  console.log('   Is function?', typeof authRoutes === 'function');
  console.log('   Has stack?', authRoutes && typeof authRoutes.stack === 'function');
} catch(e) {
  console.error('❌ auth.routes error:', e.message);
}

try {
  const postRoutes = require('./routes/post.routes');
  console.log('✅ post.routes - Type:', typeof postRoutes);
  console.log('   Is function?', typeof postRoutes === 'function');
} catch(e) {
  console.error('❌ post.routes error:', e.message);
}

try {
  const commentRoutes = require('./routes/comment.routes');
  console.log('✅ comment.routes - Type:', typeof commentRoutes);
  console.log('   Is function?', typeof commentRoutes === 'function');
} catch(e) {
  console.error('❌ comment.routes error:', e.message);
}

try {
  const adminRoutes = require('./routes/admin.routes');
  console.log('✅ admin.routes - Type:', typeof adminRoutes);
  console.log('   Is function?', typeof adminRoutes === 'function');
} catch(e) {
  console.error('❌ admin.routes error:', e.message);
}