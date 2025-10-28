import { Navigate } from "react-router-dom";

// This is a placeholder for your authentication logic.
// In a real app, you'd get this from your AuthContext.
const useAuth = () => {
	return { isAuthenticated: false };
};

export default function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" />;
	}

	return children;
}
