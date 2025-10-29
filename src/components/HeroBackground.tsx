import vectorOrange from "../assets/vector-orange.png";
import vectorBlue from "../assets/vector-blue.png";
import heroWave from "../assets/hero-wave.svg";

export default function HeroBackground() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
			<img
				src={vectorOrange}
				alt=""
				className="absolute top-[-10px] left-[-300px] w-full object-cover"
			/>
			<img
				src={vectorBlue}
				alt=""
				className="absolute top-[-50px] right-[-100px] w-full object-cover"
			/>
			<img
				src={heroWave}
				alt=""
				className="absolute bottom-0 left-0 w-full object-cover"
			/>
		</div>
	);
}
