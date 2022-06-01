import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@Hooks/useAuth";
import useScrollPosition from "@Hooks/useScroll";
import { signOut } from "@Utils/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthLink, Header, NavAuth, NavContent, NavLogo } from "./styles";

const Navbar = () => {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);
	const [top, setTop] = useState(true);

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
			if (
				currPos.y > -700 &&
				window.innerWidth > 750 &&
				router.pathname === "/"
			) {
				setTop(true);
				setScrolled(false);
			} else if (isScrolled !== scrolled) {
				setTop(false);
				setScrolled(isScrolled);
			}
		},
		[scrolled],
		false,
		false,
		100
	);

	useEffect(() => {
		if (router.pathname !== "/") setTop(false);
	}, []);

	return (
		<Header className={`${scrolled ? "scrolled" : ""} ${top ? "top" : ""}`}>
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
								<FontAwesomeIcon icon={faArrowLeft} /> Home
							</AuthLink>
						</Link>
					)}
				</NavAuth>
			</NavContent>
		</Header>
	);
};

export default Navbar;
