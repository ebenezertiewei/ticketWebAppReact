import { Link } from "react-router-dom";

export default function Dashboard() {
	const stats = [
		{ label: "Total Tickets", value: 12 },
		{ label: "Open", value: 5, color: "green" },
		{ label: "Resolved", value: 7, color: "gray" },
	];

	return (
		<div className="dashboard">
			<h2>Dashboard</h2>
			<div className="stats">
				{stats.map((s) => (
					<div
						key={s.label}
						className="card"
						style={{ borderLeftColor: s.color }}
					>
						<p>{s.label}</p>
						<h3>{s.value}</h3>
					</div>
				))}
			</div>
			<Link to="/tickets" className="btn">
				Manage Tickets
			</Link>
		</div>
	);
}
