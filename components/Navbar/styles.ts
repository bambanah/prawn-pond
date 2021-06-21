import styled from "styled-components";

export const Header = styled.header`
	position: fixed;
	top: 0;
	width: 100vw;
	box-sizing: border-box;
	z-index: 2;

	background-color: white;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

	transition: background-color 0.2s ease, box-shadow 0.2s ease,
		margin-top 0.4s ease;
	transition-delay: background-color 1s, box-shadow 1s;

	@media screen and (max-width: 750px) {
		&.scrolled {
			margin-top: -5em;
		}
	}

	@media screen and (min-width: 751px) {
		&.top {
			background-color: transparent;
			box-shadow: none;
			text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

			p {
				color: ${({ theme }) => theme.colors.bg};

				&:hover {
					color: ${({ theme }) => theme.colors.accent};
				}
			}
		}
	}
`;

export const NavContent = styled.div`
	height: 5rem;
	width: 100%;
	padding: 0 3rem;
	max-width: 1000px;

	box-sizing: border-box;
	margin: auto;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const NavLogo = styled.div`
	flex: 1 0 70%;
	display: flex;
	align-items: center;

	p {
		cursor: pointer;
		margin: 0;
		font-family: "Poppins", "Archivo Black";
		font-size: 2rem;
	}
`;

export const NavAuth = styled.div`
	flex: 1 0 30%;
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
	transition: 0.05s color ease;

	&:hover {
		/* text-decoration: underline; */
		color: ${({ theme }) => theme.colors.accent};
	}
`;
