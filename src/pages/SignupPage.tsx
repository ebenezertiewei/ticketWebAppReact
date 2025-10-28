import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import HeroBackground from "../components/HeroBackground";

// ✅ 1. Define your types
type FormField =
	| "firstName"
	| "lastName"
	| "email"
	| "password"
	| "confirmPassword";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

interface FormHints {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

// ✅ 2. Component
export default function SignupPage() {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [success, setSuccess] = useState(false);
	const [hints, setHints] = useState<FormHints>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const hintMessages: Record<FormField, string> = {
		firstName: "Please enter your first name",
		lastName: "Please enter your last name",
		email: "Please enter a valid email (e.g. you@example.com)",
		password: "Password must be at least 6 characters",
		confirmPassword: "Re-enter your password to confirm",
	};

	// ✅ 3. Handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const fieldName = name as FormField;

		setFormData((prev) => ({ ...prev, [fieldName]: value }));

		if (value.trim() !== "") {
			setHints((prev) => ({ ...prev, [fieldName]: hintMessages[fieldName] }));
		} else {
			setHints((prev) => ({ ...prev, [fieldName]: "" }));
		}
	};

	// ✅ 4. Handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: FormErrors = {};
		let valid = true;

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
			valid = false;
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
			valid = false;
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			valid = false;
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email format";
			valid = false;
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
			valid = false;
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
			valid = false;
		}

		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = "Please confirm your password";
			valid = false;
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
			valid = false;
		}

		setErrors(newErrors);
		setHints({});

		if (valid) {
			const result = signup(
				formData.email,
				formData.password,
				formData.confirmPassword
			);

			if (result.success) {
				setSuccess(true);
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
				});

				setTimeout(() => {
					navigate("/dashboard");
				}, 500);
			} else {
				setErrors({ email: result.error || "Signup failed" });
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
					Create an Account
				</h2>

				{/* First Name */}
				<div className="form-group mb-4">
					<label htmlFor="firstName" className="block mb-1">
						First Name <span className="text-orange-500">*</span>
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
					<small className="text-orange-500">
						{errors.firstName || hints.firstName}
					</small>
				</div>

				{/* Last Name */}
				<div className="form-group mb-4">
					<label htmlFor="lastName" className="block mb-1">
						Last Name <span className="text-orange-500">*</span>
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
					<small className="text-orange-500">
						{errors.lastName || hints.lastName}
					</small>
				</div>

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
				<div className="form-group mb-4 relative">
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

				{/* Confirm Password */}
				<div className="form-group mb-6 relative">
					<label htmlFor="confirmPassword" className="block mb-1">
						Confirm Password <span className="text-orange-500">*</span>
					</label>
					<div className="relative">
						<input
							type={showConfirmPassword ? "text" : "password"}
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
							aria-label={
								showConfirmPassword ? "Hide password" : "Show password"
							}
						>
							{showConfirmPassword ? "👁️" : "🙈"}
						</button>
					</div>
					<small className="text-orange-500">
						{errors.confirmPassword || hints.confirmPassword}
					</small>
				</div>

				{success && (
					<p className="text-green-500 mb-4 text-center">
						Signup successful! Redirecting...
					</p>
				)}

				<button
					type="submit"
					className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
				>
					Sign Up
				</button>

				<p className="text-center mt-4 text-gray-700">
					Already have an account?{" "}
					<Link
						to="/auth/login"
						className="text-orange-500 hover:underline font-semibold"
					>
						Login here
					</Link>
				</p>
			</form>
		</div>
	);
}
