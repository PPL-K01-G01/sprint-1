import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import NotFoundPage from "./Pages/NotFound/NotFound";
import RegisterPage from "./Pages/Auth/RegisterPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
