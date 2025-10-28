import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import TicketManagement from "./pages/TicketManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
