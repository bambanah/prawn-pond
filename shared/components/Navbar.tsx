import React from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../utils/firebase";
import NavLink from "../../components/NavLink";

const Header = styled.header`
	position: fixed;
	top: 0;
	width: 100vw;
	box-sizing: border-box;
	z-index: 100;
	/* background-color: white; */
	/* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); */
`;

const NavContent = styled.div`
	height: 5rem;
	width: 100%;
	padding: 0 2rem;
	min-width: 700px;
	max-width: 1100px;

	box-sizing: border-box;
	margin: auto;

	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const NavLogo = styled.div`
	flex: 0 0 30%;
	display: flex;
	align-items: center;

	p {
		margin-left: 1rem;
		font-family: "Poppins", "Archivo Black";
		font-size: 2rem;
	}
`;

const NavLinks = styled.div`
	display: flex;
	flex: 1 0 auto;
	align-items: center;
	justify-content: center;
`;

const NavAuth = styled.div`
	flex: 0 0 30%;
	text-align: right;

	span {
		margin-right: 0.3rem;
	}

	@media only screen and (max-width: 950px) {
		span {
			display: none;
		}
	}
`;

const LogoutLink = styled.p`
	cursor: pointer;

	&:hover {
		font-weight: bold;
	}
`;

const Navbar = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { user } = useAuth();

	return (
		<Header>
			<NavContent>
				<NavLogo>
					<p>Sean Wilson</p>
				</NavLogo>

				<NavLinks>
					<NavLink href="/">Gallery</NavLink>
					<NavLink href="/upload">Upload</NavLink>
				</NavLinks>

				<NavAuth>
					<LogoutLink onClick={() => signOut()}>Log Out</LogoutLink>
				</NavAuth>
			</NavContent>
		</Header>
	);
};

export default Navbar;
