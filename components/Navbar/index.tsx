import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@Hooks/useAuth";
import { signOut } from "@Utils/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthLink, Header, NavAuth, NavContent, NavLogo } from "./styles";

const Navbar = () => {
	const router = useRouter();
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
