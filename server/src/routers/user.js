const express = require("express");
const {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI,
	loginUserAPI,
	registerUserAPI,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Các API không cần token
router.post("/login", loginUserAPI);
router.post("/register", registerUserAPI);

// Các API cần token
router.get("/", verifyToken, getAllUsersAPI);
router.get("/:id", verifyToken, getUserByIdAPI);
router.post("/create", verifyToken, createUserAPI);
router.put("/update/:id", verifyToken, updateUserAPI);
router.delete("/delete/:id", verifyToken, deleteUserAPI);

module.exports = router;
