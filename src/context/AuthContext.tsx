/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, User } from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const session = localStorage.getItem("ticketapp_session");
		if (session) setUser(JSON.parse(session));
		setLoading(false);
	}, []);

	const login = (email: string, password: string) => {
		if (!email || !password) {
			return { success: false, error: "Please enter both email and password" };
		}

		const session: User = {
			token: "fake-jwt-" + Math.random().toString(36).slice(2),
			email,
		};
		localStorage.setItem("ticketapp_session", JSON.stringify(session));
		setUser(session);
		return { success: true };
	};

	const signup = (email: string, password: string, confirmPassword: string) => {
		// Validation
		if (!email || !password || !confirmPassword) {
			return { success: false, error: "All fields are required" };
		}

		if (password !== confirmPassword) {
			return { success: false, error: "Passwords do not match" };
		}

		if (password.length < 6) {
			return {
				success: false,
				error: "Password must be at least 6 characters",
			};
		}

		// Create session (same as login for now)
		const session: User = {
			token: "fake-jwt-" + Math.random().toString(36).slice(2),
			email,
		};
		localStorage.setItem("ticketapp_session", JSON.stringify(session));
		setUser(session);
		return { success: true };
	};

	const logout = () => {
		localStorage.removeItem("ticketapp_session");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
