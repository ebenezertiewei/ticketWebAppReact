import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import HeroBackground from "../components/HeroBackground";

export default function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [success, setSuccess] = useState(false);
	const [hints, setHints] = useState<Record<string, string>>({});
	const [showPassword, setShowPassword] = useState(false);

	const hintMessages: Record<string, string> = {
		email: "Please enter a valid email (e.g. you@example.com)",
		password: "Password must be at least 6 characters",
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Show hint only if user types something
		if (value.trim() !== "") {
			setHints((prev) => ({ ...prev, [name]: hintMessages[name] }));
		} else {
			setHints((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: Record<string, string> = {};
		let valid = true;

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			valid = false;
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email format";
			valid = false;
		}

		// Password validation
		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
			valid = false;
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
			valid = false;
		}

		setErrors(newErrors);
		setHints({});

		if (valid) {
			// Call the login function from AuthContext
			const result = login(formData.email, formData.password);

			if (result.success) {
				setSuccess(true);
				setFormData({ email: "", password: "" });

				// Navigate to dashboard after a brief success message
				setTimeout(() => {
					navigate("/dashboard");
				}, 500);
			} else {
				setErrors({ email: result.error || "Login failed" });
			}
		} else {
			setSuccess(false);
		}
	};

	return (
		<div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-13rem)] login-page-container">
			<HeroBackground />

			<form
				onSubmit={handleSubmit}
				className="auth-form mb-5rem bg-white/20 p-8 rounded-lg shadow-md z-10 w-[90%] max-w-md backdrop-blur-md"
			>
				<h2 className="text-[1.2rem] font-semibold border-b-2 border-orange-500 mb-10 text-center mx-auto w-fit">
					Login
				</h2>
				{/* Email */}
				<div className="form-group mb-4">
					<label htmlFor="email" className="block mb-1">
						Email <span className="text-orange-500">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
					<small className="text-orange-500">
						{errors.email || hints.email}
					</small>
				</div>
				{/* Password */}
				<div className="form-group mb-6 relative">
					<label htmlFor="password" className="block mb-1">
						Password <span className="text-orange-500">*</span>
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? "👁️" : "🙈"}
						</button>
					</div>
					<small className="text-orange-500">
						{errors.password || hints.password}
					</small>
				</div>
				<button
					type="submit"
					className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
				>
					Login
				</button>
				{/* Success message */}
				{success && (
					<p className="text-green-500 mt-4 text-center">
						Login successful! Redirecting...
					</p>
				)}
			</form>
		</div>
	);
}
