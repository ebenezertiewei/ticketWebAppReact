import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();

	const isAuthPage =
		location.pathname === "/auth/signup" || location.pathname === "/auth/login";

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

				{isAuthPage ? (
					// Wrap Home in a nav so it aligns like other links
					<nav className="flex justify-end items-center gap-x-1 text-[1.2rem] header-nav">
						<Link
							to="/"
							className="border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-1 px-2 rounded-md font-semibold transition-colors duration-300 ease-in-out"
						>
							Home
						</Link>
					</nav>
				) : (
					<nav className="flex justify-end items-center gap-x-1 text-[1.2rem] header-nav">
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
					</nav>
				)}
			</header>
		</div>
	);
}
