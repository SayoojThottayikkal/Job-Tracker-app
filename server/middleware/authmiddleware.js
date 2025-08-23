import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Malformed token, authorization denied" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing in environment variables!");
      return res
        .status(500)
        .json({ msg: "Server config error: missing JWT_SECRET" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.userId }; // 👈 always use userId

    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
