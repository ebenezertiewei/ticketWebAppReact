import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const isAuthPage =
		location.pathname === "/auth/signup" || location.pathname === "/auth/login";

	const handleLogOut = () => {
		logout();
		navigate("/auth/login");
	};

	return (
		<div className="ticketHub">
			<header className="header w-full h-40 pt-4 px-3 flex justify-between">
				<h1>
					<Link
						to="/"
						className="text-[1.7rem] font-bold whitespace-nowrap header-logo"
					>
						<span className="text-blue-600">Ticket</span>
						<span className="text-orange-500">Hub</span>
					</Link>
				</h1>

				<nav className="flex justify-end items-center gap-x-1 text-[1.2rem] header-nav">
					{/* If on signup or login page → show Home link */}
					{isAuthPage ? (
						<Link
							to="/"
							className="border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-md font-semibold transition-colors duration-300 ease-in-out"
						>
							Home
						</Link>
					) : user ? (
						// If logged in → show Log Out
						<button
							onClick={handleLogOut}
							className="border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-1 px-3 rounded-md font-semibold transition-colors duration-300 ease-in-out"
						>
							Log Out
						</button>
					) : (
						// Otherwise → show Sign Up & Login
						<>
							<Link
								to="/auth/signup"
								className="border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-md font-semibold transition-colors duration-300 ease-in-out"
							>
								Sign Up
							</Link>
							<Link
								to="/auth/login"
								className="border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-md font-semibold transition-colors duration-300 ease-in-out"
							>
								Login
							</Link>
						</>
					)}
				</nav>
			</header>
		</div>
	);
}
