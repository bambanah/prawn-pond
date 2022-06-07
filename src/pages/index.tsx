import React from "react";
import Hero from "@components/Hero";
import Layout from "@components/Layout";
import { NextPage } from "next";
import Announcements from "@components/Announcements";
import MemoryList from "@components/MemoryList";
import styled from "styled-components";
import { MemoryContextProvider } from "@context/memory-context";

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: center;
	box-sizing: border-box;
	padding-bottom: 3rem;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.bg};
	box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);

	margin-top: 96vh;

	@media screen and (max-width: 750px) {
		padding: inherit 0;

		margin-top: 90vh;
	}
`;

const Home: NextPage = () => (
	<Layout>
		<Hero />
		<MemoryContextProvider>
			<ContentContainer>
				<Announcements />
				<MemoryList />
			</ContentContainer>
		</MemoryContextProvider>
	</Layout>
);

export default Home;
