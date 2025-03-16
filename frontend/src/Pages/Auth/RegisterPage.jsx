import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		fullName: "",
		position: "",
		phone: "",
	});

	const handleNext = (e) => {
		e.preventDefault();
		setStep((prev) => prev + 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle registration logic
	};

	return (
		<div className="auth-container">
			<h2>Create Account 🚀</h2>
			<p className="subtitle">Step {step} of 2</p>

			<form onSubmit={step === 2 ? handleSubmit : handleNext}>
				{step === 1 && (
					<>
						<div className="input-group">
							<input
								type="email"
								placeholder="Email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								required
							/>
							<i className="fas fa-envelope icon"></i>
						</div>

						<div className="input-group">
							<input
								type="password"
								placeholder="Password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								required
							/>
							<i className="fas fa-lock icon"></i>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="input-group">
							<input
								type="text"
								placeholder="Full Name"
								value={formData.fullName}
								onChange={(e) =>
									setFormData({ ...formData, fullName: e.target.value })
								}
								required
							/>
							<i className="fas fa-user icon"></i>
						</div>

						<div className="input-group">
							<input
								type="text"
								placeholder="Position"
								value={formData.position}
								onChange={(e) =>
									setFormData({ ...formData, position: e.target.value })
								}
								required
							/>
							<i className="fas fa-briefcase icon"></i>
						</div>

						<div className="input-group">
							<input
								type="tel"
								placeholder="Phone Number"
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
								required
							/>
							<i className="fas fa-phone icon"></i>
						</div>
					</>
				)}

				<button type="submit" className="auth-btn">
					{step === 1 ? "Next Step →" : "Sign Up"}
				</button>
			</form>

			<div className="auth-footer">
				<p>
					Already have an account? <span onClick={() => navigate('/login')}>Login</span>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
