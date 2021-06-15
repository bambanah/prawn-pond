import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	/* background-image: url("https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop");
	background-position-y: 50%;
	background-size: cover; */
	padding: 5rem 4rem;
	/* background: black; */
	width: 100%;
	height: 70vh;
	overflow: hidden;
	display: flex;
	align-items: left;
	justify-content: center;
	flex-direction: column;

	h1 {
		/* color: #e4e4e4; */
		font-family: "Poppins", sans-serif;
	}
`;

const Hero = () => (
	<HeroContainer>
		<h1>He fell as gently as a tree falls.</h1>
		<h1>There was not even any sound.</h1>
	</HeroContainer>
);

export default Hero;
