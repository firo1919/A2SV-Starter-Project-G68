import Image from "next/image";

function Footer() {
	return (
		<footer className="bg-ebony-clay">
			<div className=" text-athens-gray text-sm w-9/10 max-w-7xl mx-auto px-8 py-12">
				<div className="flex flex-col md:flex-row justify-between mb-8">
					<div className="">
						<div className="mb-8">
							<Image src="/images/a2sv-logo.png" alt="A2SV logo image" width={160} height={40} />
						</div>
						<div className="text-gray-chateau mb-4 text-wrap">
							Preparing Africa&apos;s top tech talent for global opportunities.
						</div>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">SOLUTIONS</h3>
						<ul className="text-gray-chateau">
							<li className="mb-4">Student Training</li>
							<li className="mb-4">Corporate Partnership</li>
						</ul>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">SUPPORT</h3>
						<ul className="text-gray-chateau">
							<li className="mb-4">Contact Us</li>
							<li className="mb-4">FAQ</li>
						</ul>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">COMPANY</h3>
						<ul className="text-gray-chateau">
							<li className="mb-4">About</li>
							<li className="mb-4">Blog</li>
						</ul>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">LEGAL</h3>
						<ul className="text-gray-chateau">
							<li className="mb-4">Privacy</li>
							<li className="mb-4">Terms</li>
						</ul>
					</div>
				</div>
				<div className="w-full bg-gray-chateau h-[1px] mb-8"></div>
				<div className="">
					<p className="text-center">© {new Date().getFullYear()} A2SV. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
export default Footer;
