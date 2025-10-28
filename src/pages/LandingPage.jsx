import vectorOrange from "../assets/vector-orange.png";
import vectorBlue from "../assets/Vector-blue.png";
import heroWave from "../assets/hero-wave.svg";

export default function LandingPage() {
	return (
		<div className="ticketHub">
			<section className="w-full landing-page">
				<div className="relative overflow-hidden mb-10 hero-section-container ">
					{/* HERO SECTION */}
					<div className="relative z-20 w-full p-3 mt-10 mb-20 hero">
						<h2 className="text-[1.5rem] font-semibold text-center text-[#1C1C1C] mt-7 mb-14 slagan">
							Your one-stop destination for discovering, buying, and managing
							event tickets with ease.
						</h2>
						<p className="text-[2.4rem] font-bold text-center text-[#1C1C1C] mb-5 tagline">
							“Seamless <span className="text-blue-600">Tickets</span> at your
							fingertips.”
						</p>
						<div className="flex justify-center gap-x-4 cta">
							<a
								href="/auth/signup"
								className="bg-orange-500 text-white text-[1.2rem] font-semibold hover:text-black py-2 px-3 rounded-md transition-colors duration-300 ease-in-out get-started-btn"
							>
								Get Started
							</a>
						</div>
					</div>

					{/* BACKGROUND VECTORS */}
					<img
						src={vectorOrange}
						alt="vectorOrange"
						className="absolute top-[-10px] left-[-300px] w-full z-0 object-cover"
					/>
					<img
						src={vectorBlue}
						alt="vectorBlue"
						className="absolute top-[-50px] right-[-100px] w-full z-0 object-cover"
					/>
					<img
						src={heroWave}
						alt="heroWave"
						className="absolute bottom-0 left-0 w-full z-0 object-cover"
					/>
				</div>

				{/* Feature Sections */}
				<div className="w-full flex justify-center mb-10 feature-section">
					<div className="container">
						<div className="text-center">
							<h2 className="inline-block border-b-2 border-orange-500 text-[1.2rem] font-semibold text-gray-900 mb-8">
								Key Features
							</h2>
						</div>
						<div className="feature-grid">
							<div className="feature-card">
								<h3>Easy Ticket Creation</h3>
								<p>
									Quickly log new issues with intuitive forms and smart
									categorization.
								</p>
							</div>
							<div className="feature-card">
								<h3>Real-time Updates</h3>
								<p>
									Stay informed with instant notifications on ticket status
									changes.
								</p>
							</div>
							<div className="feature-card">
								<h3>Team Collaboration</h3>
								<p>
									Assign, track, and resolve tickets collaboratively with your
									team.
								</p>
							</div>
							<div className="feature-card">
								<h3>Customizable Workflows</h3>
								<p>
									Adapt the system to your unique support processes and
									requirements.
								</p>
							</div>
							<div className="feature-card">
								<h3>Performance Analytics</h3>
								<p>
									Gain insights into your team's efficiency and identify areas
									for improvement.
								</p>
							</div>
							<div className="feature-card">
								<h3>Secure & Reliable</h3>
								<p>
									Your data is protected with industry-standard security
									measures.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
