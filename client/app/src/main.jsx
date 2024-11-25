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

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/auth" element={<Auth />} />
					<Route path="/" element={<App />}>
						<Route path="dashboard" element={<Dashboard />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	</StrictMode>
)
