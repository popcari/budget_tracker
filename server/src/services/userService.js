const connection = require("../config/database")

const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM Users`, (err, results) => {
			if (err) {
				return reject(err)
			}
			resolve(results)
		})
	})
}

const getUserById = (userId) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM Users WHERE id = ?`,
			[userId],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				if (results.length === 0) {
					return reject(new Error("User not found"))
				}
				resolve(results[0])
			}
		)
	})
}

const createUser = (email, name, city, dob, gender) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO Users (email, name, city,dob,gender) VALUES (?, ?, ?,?,?)`,
			[email, name, city, dob, gender],
			(err, result) => {
				if (err) {
					return reject(err)
				}
				resolve(result)
			}
		)
	})
}

const updateUser = (userId, email, name, city, dob, gender) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE Users SET email = ?, name = ?, city = ?,dob=?,gender=? WHERE id = ?`,
			[email, name, city, dob, gender, userId],
			(err, result) => {
				if (err) {
					return reject(err)
				}
				resolve(result)
			}
		)
	})
}
const deleteUser = (userId) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`DELETE FROM Users WHERE id = ?`,
			[userId],
			(err, result) => {
				if (err) {
					return reject(err)
				}
				if (result.affectedRows === 0) {
					return reject(new Error("User not found"))
				}
				resolve(result)
			}
		)
	})
}
const loginUser = (email, password) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM Users WHERE email = ? AND password = ?`,
			[email, password],
			(err, results) => {
				if (err) {
					return reject(err);
				}
				if (results.length === 0) {
					return reject(new Error("Invalid email or password"));
				}
				resolve(results[0]);
			}
		);
	});
};
const registerUser = (email, name, city, password, dob, gender) => {
	return new Promise((resolve, reject) => {
		// Check if the email already exists
		connection.query(`SELECT * FROM Users WHERE email = ?`, [email], (err, results) => {
			if (err) {
				return reject(err);
			}
			if (results.length > 0) {
				return reject(new Error("Email already exists"));
			}

			// If the email does not exist, add a new user to the database
			connection.query(
				`INSERT INTO Users (email, name, city, password,dob,gender) VALUES (?, ?, ?, ?,?,?)`,
				[email, name, city, password, dob, gender],
				(err, result) => {
					if (err) {
						return reject(err);
					}
					resolve(result);
				}
			);
		});
	});
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	registerUser
}
