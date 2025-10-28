import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import Dashboard from "./pages/Dashboard.js";
import TicketManagement from "./pages/TicketManagement.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

export default function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/auth/login" element={<LoginPage />} />
					<Route path="/auth/signup" element={<SignupPage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/tickets"
						element={
							<ProtectedRoute>
								<TicketManagement />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	);
}
