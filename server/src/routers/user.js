const express = require("express")

const {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI,
	loginUserAPI,
	registerUserAPI
} = require("../controllers/userController")
const router = express.Router()
router.get("/", getAllUsersAPI)
router.get("/:id", getUserByIdAPI)
router.post("/create", createUserAPI)
router.put("/update/:id", updateUserAPI)
router.delete("/delete/:id", deleteUserAPI)
router.post("/login", loginUserAPI);
router.post("/register", registerUserAPI);

module.exports = router
