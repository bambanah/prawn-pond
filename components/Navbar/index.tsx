import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@Hooks/useAuth";
import useScrollPosition from "@Hooks/useScroll";
import { signOut } from "@Utils/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AuthLink, Header, NavAuth, NavContent, NavLogo } from "./styles";

const Navbar = () => {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);

	const { authenticated } = useAuth();

	useScrollPosition(
		({
			prevPos,
			currPos,
		}: {
			prevPos: { x: number; y: number };
			currPos: { x: number; y: number };
		}) => {
			const isScrolled = currPos.y < prevPos.y;
			if (isScrolled !== scrolled) setScrolled(isScrolled);
		},
		[scrolled],
		false,
		false,
		100
	);

	return (
		<Header className={scrolled ? "scrolled" : ""}>
			<NavContent>
				<NavLogo>
					<Link href="/">
						<p>Sean Wilson</p>
					</Link>
				</NavLogo>

				<NavAuth>
					{!["/login", "/register"].includes(router.pathname) ? (
						<>
							{authenticated ? (
								<AuthLink onClick={() => signOut()}>Log Out</AuthLink>
							) : (
								<Link href="/login">
									<AuthLink>Login</AuthLink>
								</Link>
							)}
						</>
					) : (
						<Link href="/">
							<AuthLink>
								<FontAwesomeIcon icon="arrow-left" /> Home
							</AuthLink>
						</Link>
					)}
				</NavAuth>
			</NavContent>
		</Header>
	);
};

export default Navbar;
