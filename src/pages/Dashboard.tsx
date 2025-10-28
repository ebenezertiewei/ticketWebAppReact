import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import HeroBackground from "../components/HeroBackground";

interface Ticket {
	id: string;
	title: string;
	status: "open" | "in_progress" | "closed";
}

export default function Dashboard() {
	const { user } = useAuth();
	const [tickets, setTickets] = useState<Ticket[]>([]);

	const storageKey = `tickets_${user?.email}`;

	useEffect(() => {
		if (user) {
			const stored = localStorage.getItem(storageKey);
			if (stored) setTickets(JSON.parse(stored));
		}
	}, [user, storageKey]);

	const total = tickets.length;
	const open = tickets.filter((t) => t.status === "open").length;
	const resolved = tickets.filter((t) => t.status === "closed").length;

	return (
		<div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-13rem)] dashboard-container">
			<HeroBackground />

			<div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md z-10 w-[90%] max-w-md text-center">
				<h2 className="text-[1.2rem] font-semibold border-b-2 border-orange-500 mb-8 mx-auto w-fit">
					Dashboard
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
					<div className="flex flex-col items-center justify-center border-l-4 p-4 rounded bg-white/30 shadow-sm border-orange-500">
						<p className="text-sm text-gray-700">Total Tickets</p>
						<h3 className="text-2xl font-bold text-gray-800">{total}</h3>
					</div>
					<div className="flex flex-col items-center justify-center border-l-4 p-4 rounded bg-white/30 shadow-sm border-green-500">
						<p className="text-sm text-gray-700">Open</p>
						<h3 className="text-2xl font-bold text-gray-800">{open}</h3>
					</div>
					<div className="flex flex-col items-center justify-center border-l-4 p-4 rounded bg-white/30 shadow-sm border-gray-500">
						<p className="text-sm text-gray-700">Resolved</p>
						<h3 className="text-2xl font-bold text-gray-800">{resolved}</h3>
					</div>
				</div>

				<Link
					to="/tickets"
					className="inline-block bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 hover:text-black transition"
				>
					Manage Tickets
				</Link>
			</div>
		</div>
	);
}
