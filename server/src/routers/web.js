const express = require("express")
const {
	getHomepage,
	getABC,
	getHung,
	postCreateUser,
	getCreatePage,
	getUpdatePage,
	postUpdateUser,
	postDeleteUser,
	postHandleRemoveUser
} = require("../controllers/homeController")
const {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI
} = require("../controllers/homeController")
const router = express.Router()

// router.get('/', getHomepage);
// router.get('/abc', getABC);
// router.get('/hung', getHung);

// router.get('/create', getCreatePage);
// router.get('/edit/:id', getUpdatePage);

// router.post('/create-user', postCreateUser);
// router.post('/edit-user', postUpdateUser);
// // router.post('/delete-user/:id', postDeleteUser);
// // router.post('/delete-user', postHandleRemoveUser);
// router.delete('/delete-user/:id', postHandleRemoveUser);
router.get("/api/users", getAllUsersAPI)
router.get("/api/users/:id", getUserByIdAPI)
router.post("/api/users/create", createUserAPI)
router.put("/api/users/update/:id", updateUserAPI)
router.delete("/api/users/delete/:id", deleteUserAPI)

module.exports = router
