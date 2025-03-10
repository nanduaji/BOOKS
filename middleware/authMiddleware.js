const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  if (token !== 'validToken') {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }

  next();
};

module.exports = authMiddleware;
