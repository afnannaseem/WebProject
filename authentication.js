const jwt = require('jsonwebtoken');
const jwtSecret = 'your-secret-key';
function authenticateUser(req, res, next) {
  const { token } = req.headers;
    //console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (decoded.role !== 'user') {
            return res.status(403).json({ error: 'Only user can perform this task' });
        }
        req.id = decoded.id;
        req.role = decoded.role;
        req.email = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = authenticateUser;
