export interface User {
	token: string;
	email: string;
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (
		email: string,
		password: string
	) => { success: boolean; error?: string };
	signup: (
		email: string,
		password: string,
		confirmPassword: string
	) => { success: boolean; error?: string };
	logout: () => void;
}
