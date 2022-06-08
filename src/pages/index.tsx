import React from "react";
import Hero from "@molecules/hero";
import Layout from "@templates/layout";
import { NextPage } from "next";
import Announcements from "@molecules/announcements";
import MemoryList from "@organisms/memory-list";
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
