import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import HeroBackground from "../components/HeroBackground";

type TicketStatus = "open" | "in_progress" | "closed";

interface Ticket {
	id: string;
	title: string;
	description: string;
	status: TicketStatus;
	createdAt: string;
}

export default function TicketManagement() {
	const { user } = useAuth();
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [newTicket, setNewTicket] = useState({
		title: "",
		description: "",
		status: "open" as TicketStatus,
	});
	const [editingId, setEditingId] = useState<string | null>(null);
	const [errors, setErrors] = useState<{ title?: string; status?: string }>({});
	const [toast, setToast] = useState<{
		message: string;
		type: "success" | "error" | "";
	}>({ message: "", type: "" });

	const storageKey = `tickets_${user?.email}`;

	// Load from localStorage (per user)
	useEffect(() => {
		if (user) {
			const stored = localStorage.getItem(storageKey);
			if (stored) setTickets(JSON.parse(stored));
		}
	}, [user, storageKey]);

	// Save to localStorage (per user)
	useEffect(() => {
		if (user) {
			localStorage.setItem(storageKey, JSON.stringify(tickets));
		}
	}, [tickets, user, storageKey]);

	const showToast = (message: string, type: "success" | "error") => {
		setToast({ message, type });
		setTimeout(() => setToast({ message: "", type: "" }), 2000);
	};

	const validate = (title: string, status: string): boolean => {
		const newErrors: typeof errors = {};
		if (!title.trim()) newErrors.title = "Title is required.";
		if (title.trim().length < 3)
			newErrors.title = "Title must be at least 3 characters.";
		if (!status) newErrors.status = "Status is required.";
		else if (!["open", "in_progress", "closed"].includes(status))
			newErrors.status = "Invalid status.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate(newTicket.title, newTicket.status)) return;

		if (editingId) {
			setTickets((prev) =>
				prev.map((t) => (t.id === editingId ? { ...t, ...newTicket } : t))
			);
			showToast("Ticket updated successfully!", "success");
			setEditingId(null);
		} else {
			const newEntry: Ticket = {
				id: Date.now().toString(),
				...newTicket,
				createdAt: new Date().toISOString(),
			};
			setTickets((prev) => [...prev, newEntry]);
			showToast("Ticket created successfully!", "success");
		}

		setNewTicket({ title: "", description: "", status: "open" });
		setErrors({});
	};

	const handleEdit = (ticket: Ticket) => {
		setEditingId(ticket.id);
		setNewTicket({
			title: ticket.title,
			description: ticket.description,
			status: ticket.status,
		});
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this ticket?")) {
			setTickets((prev) => prev.filter((t) => t.id !== id));
			showToast("Ticket deleted successfully!", "success");
		}
	};

	return (
		<div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-13rem)] ticket-management">
			<HeroBackground />

			<div className="bg-white/20 p-8 rounded-lg shadow-md z-10 w-[90%] max-w-lg backdrop-blur-md text-center">
				<h2 className="text-[1.2rem] font-semibold border-b-2 border-orange-500 mb-6 mx-auto w-fit">
					Ticket Management
				</h2>

				{/* Toast Feedback */}
				{toast.message && (
					<div
						className={`mb-4 px-3 py-2 rounded ${
							toast.type === "success"
								? "bg-green-500 text-white"
								: "bg-red-500 text-white"
						}`}
					>
						{toast.message}
					</div>
				)}

				{/* Create / Update Form */}
				<form onSubmit={handleSubmit} className="mb-6 text-left">
					<div className="mb-3">
						<label className="block font-semibold mb-1">Title</label>
						<input
							type="text"
							value={newTicket.title}
							onChange={(e) =>
								setNewTicket({ ...newTicket, title: e.target.value })
							}
							className="w-full border rounded px-3 py-2"
							placeholder="Enter ticket title"
						/>
						{errors.title && (
							<small className="text-orange-500">{errors.title}</small>
						)}
					</div>

					<div className="mb-3">
						<label className="block font-semibold mb-1">Description</label>
						<textarea
							value={newTicket.description}
							onChange={(e) =>
								setNewTicket({ ...newTicket, description: e.target.value })
							}
							className="w-full border rounded px-3 py-2 resize-none"
							placeholder="Enter ticket description (optional)"
							rows={3}
						/>
					</div>

					<div className="mb-4">
						<label className="block font-semibold mb-1">Status</label>
						<select
							value={newTicket.status}
							onChange={(e) =>
								setNewTicket({
									...newTicket,
									status: e.target.value as TicketStatus,
								})
							}
							className="w-full border rounded px-3 py-2"
						>
							<option value="open">Open</option>
							<option value="in_progress">In Progress</option>
							<option value="closed">Closed</option>
						</select>
						{errors.status && (
							<small className="text-orange-500">{errors.status}</small>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 hover:text-black cursor-pointer transition"
					>
						{editingId ? "Update Ticket" : "Create Ticket"}
					</button>
				</form>

				{/* Ticket List */}
				<div className="space-y-3">
					{tickets.length === 0 ? (
						<p className="text-gray-600">No tickets yet. Create one above!</p>
					) : (
						tickets.map((ticket) => (
							<div
								key={ticket.id}
								className="bg-white/40 rounded-md p-4 shadow-md text-left"
							>
								<div className="flex justify-between items-start mb-2">
									<div className="flex-1">
										<p className="font-semibold">{ticket.title}</p>
										{ticket.description && (
											<p className="text-sm text-gray-600 mt-1">
												{ticket.description}
											</p>
										)}
										<p className="text-xs text-gray-500 mt-1">
											{new Date(ticket.createdAt).toLocaleDateString()}
										</p>
									</div>
									<span
										className={`text-xs font-bold uppercase px-2 py-1 rounded ml-2 ${
											ticket.status === "open"
												? "bg-blue-500 text-white"
												: ticket.status === "in_progress"
												? "bg-yellow-500 text-white"
												: "bg-green-500 text-white"
										}`}
									>
										{ticket.status.replace("_", " ")}
									</span>
								</div>

								<div className="flex gap-2 mt-2">
									<button
										onClick={() => handleEdit(ticket)}
										className="text-blue-600 font-semibold hover:underline cursor-pointer"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(ticket.id)}
										className="text-red-600 font-semibold hover:underline cursor-pointer"
									>
										Delete
									</button>
								</div>
							</div>
						))
					)}
				</div>

				<Link
					to="/dashboard"
					className="block mt-8 border-t-2 border-b-2 border-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md font-semibold transition-colors duration-300 ease-in-out"
				>
					← Back to Dashboard
				</Link>
			</div>
		</div>
	);
}
