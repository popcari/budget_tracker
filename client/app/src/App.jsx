// standard library
import React, { useEffect } from "react"
// external libraries
import { Outlet, useNavigate } from "react-router-dom"

const App = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn")
		console.log(isLoggedIn)
		if (!isLoggedIn) {
			console.log("Not logged in, navigating to /auth")
			navigate("/auth")
		}
	}, [navigate])
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default App
