import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("login");
			const response = await fetch("http://localhost:3000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			const data = await response.json();

			if (response.ok) {
				// Simpan token dan redirect
				localStorage.setItem("token", data.token);
				alert("Login successful!");
				navigate("/dashboard");
			} else {
				alert(data.message || "Login failed, please try again.");
			}
		} catch (error) {
			alert("Error connecting to server. Please try again later.");
		}
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

				<button type="submit" className="auth-btn">Sign In</button>
			</form>

			<div className="auth-footer">
				<p>
					Don't have an account?{" "}
					<span onClick={() => navigate("/register")}>Sign Up</span>
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
