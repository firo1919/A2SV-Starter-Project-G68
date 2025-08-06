"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

function BurgerMenu({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [open, setOpen] = useState(false);
	if (open) {
		return (
			<div className="fixed inset-0 bg-black/30 z-50">
				<div className="absolute top-0 right-0 bottom-0 p-4 bg-white w-3/4 flex flex-col gap-4">
					<div
						className="w-full flex items-center justify-center mb-4 backdrop-blur-lg"
						onClick={() => setOpen(false)}
					>
						<IoMdClose />
					</div>
					{children}
				</div>
			</div>
		);
	} else {
		return (
			<div className="" onClick={() => setOpen(true)}>
				<RxHamburgerMenu />
			</div>
		);
	}
}
export default BurgerMenu;
