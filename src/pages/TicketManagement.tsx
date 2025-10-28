import { Link } from "react-router-dom";

export default function TicketManagement() {
	return (
		<div className="ticket-management">
			<h2>Ticket Management</h2>
			<p>This is where you will manage all the support tickets.</p>
			<br />
			<Link to="/dashboard" className="btn">
				Back to Dashboard
			</Link>
		</div>
	);
}
