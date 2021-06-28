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

	background-image: url("./hero.jpg");
	background-position: center 50%;
	background-size: cover;

	/* @media screen and (max-width: 750px) {
		display: none;
	} */
`;

const Hero = () => <HeroContainer />;

export default Hero;
