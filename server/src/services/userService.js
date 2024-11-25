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

const createUser = (email, name, city) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
			[email, name, city],
			(err, result) => {
				if (err) {
					return reject(err)
				}
				resolve(result)
			}
		)
	})
}

const updateUser = (userId, email, name, city) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?`,
			[email, name, city, userId],
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
module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
}
