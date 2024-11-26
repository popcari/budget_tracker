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

const createUser = (email, name, city, password) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO Users (email, name, city,password) VALUES (?, ?, ?,?)`,
			[email, name, city, password],
			(err, result) => {
				if (err) {
					return reject(err)
				}
				resolve(result)
			}
		)
	})
}

const updateUser = (userId, email, name, city, password) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE Users SET email = ?, name = ?, city = ?,password=? WHERE id = ?`,
			[email, name, city, password, userId],
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
module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	loginUser
}
