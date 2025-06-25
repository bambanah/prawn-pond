import { MemoryContextProvider } from "@/context/memory-context";
import Announcements from "@/components/molecules/announcements";
import Hero from "@/components/molecules/hero";
import MemoryList from "@/components/organisms/memory-list";
import Layout from "@/components/templates/layout";
import { NextPage } from "next";
import styled from "styled-components";

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: center;
	box-sizing: border-box;
	padding-bottom: 3rem;
	width: 100%;
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
