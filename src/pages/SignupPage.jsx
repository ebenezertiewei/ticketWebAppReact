// import HeroBackground from "../components/HeroBackground";
import HeroBackground from "../components/heroBackground";

export default function SignupPage() {
	return (
		<div className="relative flex justify-center items-center signup-page-container">
			{/* background behind everything */}
			<HeroBackground />

			{/* Signup Form */}
			<form className="auth-form mb-5rem bg-white/20 p-8 rounded-lg shadow-md z-10 w-[90%] max-w-md backdrop-blur-md">
				<h2 className="text-[1.2rem] font-semibold border-b-2 border-orange-500 mb-10 text-center mx-auto w-fit">
					Create an Account
				</h2>
				{/* first name*/}
				<div className="form-group mb-4">
					<label htmlFor="firstName" className="block mb-1">
						First Name <span className="text-orange-500">*</span>
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				{/* last name */}
				<div className="form-group mb-4">
					<label htmlFor="lastName" className="block mb-1">
						Last Name <span className="text-orange-500">*</span>
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				{/* email */}
				<div className="form-group mb-4">
					<label htmlFor="email" className="block mb-1">
						Email <span className="text-orange-500">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				{/* password */}
				<div className="form-group mb-6">
					<label htmlFor="password" className="block mb-1">
						Password <span className="text-orange-500">*</span>
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
