import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	padding: 0 4rem;
	padding-top: 5rem;
	width: 100%;
	max-width: 1200px;
	height: 50vh;
	overflow: hidden;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;

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

const Hero = () => (
	<HeroContainer>
		<h1>He fell as gently as a tree falls</h1>
		<h1>there was not even any sound</h1>
	</HeroContainer>
);

export default Hero;
