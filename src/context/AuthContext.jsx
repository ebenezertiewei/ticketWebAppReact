import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const session = localStorage.getItem("ticketapp_session");
		if (session) setUser(JSON.parse(session));
	}, []);

	const login = (email, password) => {
		if (email === "test@ticketapp.local" && password === "Test1234!") {
			const session = { token: "fake-jwt-token", email };
			localStorage.setItem("ticketapp_session", JSON.stringify(session));
			setUser(session);
			navigate("/dashboard");
		} else {
			alert("Invalid credentials!");
		}
	};

	const logout = () => {
		localStorage.removeItem("ticketapp_session");
		setUser(null);
		navigate("/");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
