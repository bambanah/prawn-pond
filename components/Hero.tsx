import React from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
	background-image: url("https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop");
	background-position-y: 50%;
	background-size: cover;
	width: 100%;
	height: 70vh;
	overflow: hidden;
`;

const Hero = () => <HeroContainer />;

export default Hero;
