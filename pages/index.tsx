import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Hero from "@Components/Hero";
import MemoryList from "@Components/MemoryList";
import Layout from "@Components/Layout";
import { NextPage } from "next";
import { getInitialMemories } from "@Utils/firebase";
import { MemoryObject } from "@Shared/types";
import firebase from "firebase";

const Content = styled.div`
	padding: 0 1em;
	margin: 5rem 0;
	width: 95vw;
	max-width: 1500px;
	display: flex;
	flex-direction: column;
	justify-content: left;

	@media screen and (max-width: 750px) {
		padding: 0;
	}
`;

const MemoryLink = styled.a`
	margin: 2rem 0;
`;

interface Props {
	initialMemories?: MemoryObject;
	lastCreated?: firebase.firestore.Timestamp;
}

const Home: NextPage<Props> = ({ initialMemories, lastCreated }) => (
	<Layout>
		<Head>
			<title>Gallery - Sean Wilson</title>
		</Head>
		<Hero />
		<Content>
			<Link href="/upload">
				<MemoryLink>Add a memory</MemoryLink>
			</Link>
			{initialMemories && lastCreated && (
				<MemoryList initialMemories={initialMemories} startFrom={lastCreated} />
			)}
		</Content>
	</Layout>
);

Home.getInitialProps = async () => {
	const initialMemories = await getInitialMemories();

	let lastCreated: firebase.firestore.Timestamp | undefined;
	if (Object.keys(initialMemories).length > 0) {
		lastCreated =
			Object.values(initialMemories)[Object.values(initialMemories).length - 1]
				.created;
	}

	return { initialMemories, lastCreated };
};

export default Home;
