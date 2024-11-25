const express = require("express")

const {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI
} = require("../controllers/userController")
const router = express.Router()
router.get("/", getAllUsersAPI)
router.get("/:id", getUserByIdAPI)
router.post("/create", createUserAPI)
router.put("/update/:id", updateUserAPI)
router.delete("/delete/:id", deleteUserAPI)

module.exports = router
