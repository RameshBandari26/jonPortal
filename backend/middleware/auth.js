// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log('\n=== [Auth Middleware] ===');
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.originalUrl);
  console.log('Incoming Headers:', req.headers);

  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);

  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log('Extracted token from Authorization header:', token);
  } else if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
    console.log('Extracted token from x-auth-token header:', token);
  } else {
    console.warn('No token found in headers.');
  }

  if (!token) {
    console.log('❌ No token provided. Access denied.\n');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };  // ✅ Attach user ID from token
    console.log('✅ Token verified. User ID:', decoded.id, '\n');
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message, '\n');
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
