import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    console.log("Token not found in cookies");
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      console.log("Token verification failed", err);
      return res.status(403).json({ message: "Token is not Valid!" });
    }

    req.userId = payload.id;
    next();
  });
};

