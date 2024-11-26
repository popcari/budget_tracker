// Import standard libraries
import React, { useState, useEffect } from "react";

const Dashboard = () => {
	// State for user data, loading, and error
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Base URL for API
	const API_URL = "http://localhost:8889/api/user";

	// Fetch data when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(API_URL);

				// Kiểm tra phản hồi
				if (!response.ok) {
					throw new Error(`Server error: ${response.status} ${response.statusText}`);
				}

				const result = await response.json();

				// Gán dữ liệu từ `data` của API
				setUserData(result.data);
			} catch (err) {
				setError(err.message || "An unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	// Render loading state
	if (loading) return <div>Loading...</div>;

	// Render error state
	if (error) return <div>Error: {error}</div>;

	// Render user data
	return (
		<div>
			<h1>User Data</h1>
			{userData.length > 0 ? (
				<ul>
					{userData.map((user) => (
						<li key={user.id}>
							<p>ID: {user.id}</p>
							<p>Email: {user.email}</p>
							<p>Name: {user.name}</p>
							<p>City: {user.city}</p>
							<p>Password: {user.password}</p>
							<hr />
						</li>
					))}
				</ul>
			) : (
				<p>No users found.</p>
			)}
		</div>
	);
};

export default Dashboard;
