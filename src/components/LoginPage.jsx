import AuthBackground from "../components/AuthBackground";

export default function LoginPage() {
	return (
		<div className="relative auth-page">
			<AuthBackground />
			<form className="auth-form">
				<h2 className="text-3xl">Login to your Account</h2>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" required />
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
}
