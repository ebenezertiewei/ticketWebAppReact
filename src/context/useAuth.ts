import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // ✅ same folder
import type { AuthContextType } from "./types"; // ✅ same folder

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
