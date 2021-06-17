import styled from "styled-components";

export const Header = styled.header`
	position: fixed;
	top: 0;
	width: 100vw;
	box-sizing: border-box;
	z-index: 100;

	transition: all 0.5s ease;

	&.scrolled {
		background-color: white;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
	}
`;

export const NavContent = styled.div`
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

export const NavLogo = styled.div`
	flex: 0 0 30%;
	display: flex;
	align-items: center;

	p {
		margin-left: 1rem;
		font-family: "Poppins", "Archivo Black";
		font-size: 2rem;
	}
`;

export const NavAuth = styled.div`
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

export const AuthLink = styled.p`
	cursor: pointer;
	color: ${({ theme }) => theme.colors.link};
	transition: 0.1s color ease;

	&:hover {
		/* text-decoration: underline; */
		color: ${({ theme }) => theme.colors.fg};
	}
`;
