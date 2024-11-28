require("dotenv").config()

module.exports = {
    secret: process.env.SECRET, // Thay bằng một chuỗi bí mật của bạn
    expiresIn: process.env.EXPIRENIN, // Token hết hạn sau 1 giờ
};
