import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle login logic
	};

	return (
		<div className="auth-container">
			<h2>Welcome Back! 👋</h2>
			<p className="subtitle">Log in to your account</p>

			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="email"
						placeholder="Email"
						value={credentials.email}
						onChange={(e) =>
							setCredentials({ ...credentials, email: e.target.value })
						}
						required
					/>
					<i className="fas fa-envelope icon"></i>
				</div>

				<div className="input-group">
					<input
						type="password"
						placeholder="Password"
						value={credentials.password}
						onChange={(e) =>
							setCredentials({ ...credentials, password: e.target.value })
						}
						required
					/>
					<i className="fas fa-lock icon"></i>
				</div>

				<button type="submit" className="auth-btn">
					Sign In
				</button>
			</form>

			<div className="auth-footer">
				<p>
					Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span>
				</p>
				<div className="social-login">
					<button className="social-btn google">
						<i className="fab fa-google"></i>
					</button>
					<button className="social-btn github">
						<i className="fab fa-github"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
