import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	width: 100%;
	height: 85vh;
	overflow: hidden;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;

	background-image: linear-gradient(
			0deg,
			${({ theme }) => theme.colors.bg} 4%,
			rgba(255, 255, 255, 0) 33%,
			rgba(0, 0, 0, 0.3981793400954131) 98%
		),
		url("https://images.unsplash.com/photo-1528721071427-cab7de8e8050?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
	/* background-size: 100%; */
	background-position: 60%;
	background-size: cover;

	@media screen and (max-width: 750px) {
		display: none;
	}

	h1 {
		font-family: "Poppins", sans-serif;
		&:last-of-type {
			text-align: right;
			font-weight: 400;
			color: #555;
			font-size: 1.8rem;
		}
	}
`;

const Hero = () => <HeroContainer />;

export default Hero;
