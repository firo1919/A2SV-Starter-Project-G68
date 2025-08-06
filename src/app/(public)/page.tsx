import Header from "../components/Header";


function HomePage() {
	const navlinks = [
		{ href: "#", label: "The Journey" },
		{ href: "#", label: "About" },
		{ href: "#", label: "Testimonials" },
	];
	return (
		<>
			<Header>
				<div className="">
					{navlinks.map((link) => (
						<a
							className="font-medium text-oxford-blue pr-8"
							key={`${link.href + link.label}`}
							href={link.href}
						>
							{link.label}
						</a>
					))}
					<button className="bg-royal-blue text-white font-medium px-[17px] py-[9px] rounded-md">
						Apply now
					</button>
				</div>
			</Header>	
			<div>Home Page</div>		
		</>
	);
}
export default HomePage;
