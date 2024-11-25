const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
} = require("../services/CRUDService")

// GET /api/users
const getAllUsersAPI = async (req, res) => {
	try {
		const users = await getAllUsers()
		return res.status(200).json({ success: true, data: users })
	} catch (err) {
		console.error("Error fetching users: ", err)
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" })
	}
}

// GET /api/users/:id
const getUserByIdAPI = async (req, res) => {
	const userId = req.params.id

	try {
		const user = await getUserById(userId)
		return res.status(200).json({ success: true, data: user })
	} catch (err) {
		console.error("Error fetching user by ID: ", err)
		if (err.message === "User not found") {
			return res.status(404).json({ success: false, message: "User not found" })
		}
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" })
	}
}

// POST /api/users
const createUserAPI = async (req, res) => {
	const { email, name, city } = req.body

	try {
		const result = await createUser(email, name, city)
		return res
			.status(201)
			.json({
				success: true,
				message: "User created successfully",
				data: result
			})
	} catch (err) {
		console.error("Error creating user: ", err)
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" })
	}
}

// PUT /api/users/:id
const updateUserAPI = async (req, res) => {
	const userId = req.params.id
	const { email, name, city } = req.body

	try {
		await updateUser(userId, email, name, city)
		return res
			.status(200)
			.json({ success: true, message: "User updated successfully" })
	} catch (err) {
		console.error("Error updating user: ", err)
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" })
	}
}

// DELETE /api/users/:id
const deleteUserAPI = async (req, res) => {
	const userId = req.params.id

	try {
		await deleteUser(userId)
		return res
			.status(200)
			.json({ success: true, message: "User deleted successfully" })
	} catch (err) {
		console.error("Error deleting user: ", err)
		if (err.message === "User not found") {
			return res.status(404).json({ success: false, message: "User not found" })
		}
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" })
	}
}

module.exports = {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI
}
