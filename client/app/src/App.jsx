// standard library
import React, { useEffect } from "react"
// external libraries
import { Outlet, useNavigate } from "react-router-dom"
import Dashboard from "./views/Dashboard"

const App = () => {
	const navigate = useNavigate()
	//Đoạn này là kiểm tra điều kiện của người dùng, chưa đăng nhập thì auto chuyển về trang đăng kí
	// useEffect(() => {
	// 	const isLoggedIn = localStorage.getItem("isLoggedIn")
	// 	console.log(isLoggedIn)
	// 	if (!isLoggedIn) {
	// 		console.log("Not logged in, navigating to /auth")
	// 		navigate("/")
	// 	}
	// }, [navigate])
	return (
		<div>
			<main>
				{/* <Outlet /> */}
				<Dashboard />
				{/* //Các màn của anh ở trong này */}
			</main>
		</div>
	)
}

export default App
