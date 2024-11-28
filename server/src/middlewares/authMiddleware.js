const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "A token is required for authentication",
        });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded; // Lưu thông tin người dùng từ token
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    return next();
};

module.exports = verifyToken;
