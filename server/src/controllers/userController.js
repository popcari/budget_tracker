const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser, loginUser, registerUser
} = require("../services/userService")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtConfig = require("../config/jwtConfig");

// POST /api/users/login
const loginUserAPI = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "Email and password are required",
		});
	}

	try {
		// Lấy user từ database
		const user = await loginUser(email, password);

		// So sánh mật khẩu đã mã hóa với mật khẩu nhập vào
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Tạo JWT token
		const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
			expiresIn: jwtConfig.expiresIn,
		});

		// Trả về thông tin người dùng và token
		return res.status(200).json({
			success: true,
			message: "Login successful",
			data: { user, token },
		});
	} catch (err) {
		console.error("Error logging in: ", err);
		return res.status(401).json({
			success: false,
			message: "Invalid email or password",
		});
	}
};


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
	const { email, name, city, dob, gender } = req.body

	try {
		const result = await createUser(email, name, city, dob, gender)
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
	const { email, name, city, dob, gender } = req.body

	try {
		await updateUser(userId, email, name, city, dob, gender)
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
};
// POST /api/users/register
const registerUserAPI = async (req, res) => {
	const { email, name, city, password, dob, gender } = req.body;

	if (!email || !name || !city || !password) {
		return res.status(400).json({
			success: false,
			message: "All fields are required",
		});
	}

	try {
		// Hash password
		const hashedPassword = bcrypt.hashSync(password, 10);

		const result = await registerUser(email, name, city, hashedPassword, dob, gender);

		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				id: result.insertId,
				email,
				name,
				city,
				dob,
				gender,
			},
		});
	} catch (err) {
		console.error("Error registering user: ", err);
		if (err.message === "Email already exists") {
			return res.status(409).json({
				success: false,
				message: "Email already exists",
			});
		}
		return res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

module.exports = {
	getAllUsersAPI,
	getUserByIdAPI,
	createUserAPI,
	updateUserAPI,
	deleteUserAPI,
	loginUserAPI,
	registerUserAPI
}
