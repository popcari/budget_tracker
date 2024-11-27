// standard library
import { StrictMode } from "react"
// external libraries
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { store } from "./store.js"
import { Provider } from "react-redux"
// internal libraries
import "./index.css"
import Auth from "./views/Auth.jsx"
import App from "./App.jsx"
import Dashboard from "./views/Dashboard.jsx"
import Login from "./views/Login.jsx"
import Register from "./views/Register.jsx"
import ListUser from "./views/ListUser.jsx"


createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					{/* Doan nay khai bao router tạo đường dẫn đến cái file mới của a */}
					{/* <Route path="/auth" element={<Auth />} /> */}
					{/* Đoạn này đang tạo router cho phần đăng kí đó a */}
					{/* Đại loại router là kiểu đường dẫn đến trang màn của anh, router nó có 1 đường dẫn và file cần dẫn tới */}
					<Route path="/" element={<App />}>

						{/* <Route path="dashboard" element={<Dashboard />} /> */}
						{/* Phần router này có 2 phần: chỗ path là đường dẫn trên google, element là file code của anh */}
					</Route>
					<Route path="/Login" element={<Login />}></Route>
					<Route path="/Register" element={<Register />}></Route>
					<Route path="/ListUser" element={<ListUser />}></Route>
				</Routes>
			</Router>
		</Provider>
	</StrictMode>
)
