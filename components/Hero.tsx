import Link from "next/link";
import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	position: fixed;
	z-index: 0;
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

	margin-bottom: 6rem;

	p {
		font-size: 2.5rem;
		font-family: "Taviraj";
		color: ${({ theme }) => theme.colors.bg};
		text-shadow: 3px 3px 4px #1a1a1a;
	}

	a {
		padding: 0.5rem 2rem;

		font-family: "Poppins";
		font-size: 1rem;
		font-weight: bold;
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.bg};
		border: 3px solid ${({ theme }) => theme.colors.bg};

		transition: all 0.05s ease;

		&:hover {
			color: ${({ theme }) => theme.colors.accent};
			border-color: ${({ theme }) => theme.colors.accent};
		}
	}
`;

const Hero = () => (
	<HeroContainer>
		<HeroActions>
			<p>Something Very Profound Here</p>
			<Link href="/upload">
				<a>Share a Memory</a>
			</Link>
		</HeroActions>
	</HeroContainer>
);

export default Hero;
