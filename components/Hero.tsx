import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	position: fixed;
	z-index: -1;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: right;
	padding: 0 5rem;

	background-image: url("https://images.unsplash.com/photo-1528721071427-cab7de8e8050?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
	/* background-size: 100%; */
	background-position: 60%;
	background-size: cover;

	@media screen and (max-width: 750px) {
		display: none;
	}
`;

const HeroActions = styled.div`
	margin-top: auto;

	display: flex;
	flex-direction: column;
	align-items: center;

	margin-bottom: 7rem;

	p {
		font-size: 2.5rem;
		font-family: "Taviraj";
		color: ${({ theme }) => theme.colors.bg};
		text-shadow: 3px 3px 4px #1a1a1a;
	}

	a {
		padding: 0.5rem 2rem;
		text-align: center;

		font-family: "Poppins";
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.bg};
		/* border: 3px solid ${({ theme }) => theme.colors.bg}; */

		transition: padding-top 0.1s ease, margin-bottom 0.18s ease;

		/* Font awesome icon */
		path {
			color: ${({ theme }) => theme.colors.bg};
		}

		&:hover {
			color: ${({ theme }) => theme.colors.bg};

			padding-top: 0.7rem;
			margin-bottom: -0.2rem;

			path {
				/* color: ${({ theme }) => theme.colors.accent}; */
			}
		}
	}
`;

const Hero = () => (
	<HeroContainer>
		<HeroActions>
			{/* <p>Something Very Profound Here</p> */}
			<Link href="/#charities">
				<a>
					Remember Sean <br />
					<FontAwesomeIcon icon="chevron-down" size="lg" />
				</a>
			</Link>
		</HeroActions>
	</HeroContainer>
);

export default Hero;
