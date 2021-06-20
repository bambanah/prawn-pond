import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@Hooks/useAuth";
import { signOut } from "@Utils/firebase";
import { AuthLink, Header, NavAuth, NavContent, NavLogo } from "./styles";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	const { authenticated } = useAuth();

	useEffect(() => {
		const listener: any = document.addEventListener("scroll", () => {
			const scrolledAmount = document.scrollingElement?.scrollTop;

			if (scrolledAmount && scrolledAmount >= 250) {
				if (!scrolled) setScrolled(true);
			} else if (scrolled) {
				setScrolled(false);
			}
		});

		return () => {
			document.removeEventListener("scroll", listener);
		};
	}, []);

	return (
		<Header className={scrolled ? "scrolled" : ""}>
			<NavContent>
				<NavLogo>
					<p>Sean Wilson</p>
				</NavLogo>

				<NavAuth>
					{authenticated ? (
						<AuthLink onClick={() => signOut()}>Log Out</AuthLink>
					) : (
						<Link href="/login">
							<AuthLink>Login</AuthLink>
						</Link>
					)}
				</NavAuth>
			</NavContent>
		</Header>
	);
};

export default Navbar;
