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
import Image from "next/image";

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: center;
	box-sizing: border-box;
	padding: 0 1em;
	padding-bottom: 3rem;
	width: 100%;
	background-color: white;
	box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);

	@media screen and (min-width: 751px) {
		margin-top: 95vh;
	}

	@media screen and (max-width: 750px) {
		padding: 0;
		padding-top: 6rem;
	}
`;

const Announcements = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0 2rem;
	max-width: 1400px;

	h1 {
		flex: 1 0 50%;
		font-size: 3.5rem;
		font-family: "Taviraj";

		@media screen and (max-width: 750px) {
			font-size: 2rem;
		}
	}
`;

const Charities = styled.div`
	flex: 1 0 50%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 3rem;

	a > div {
		border-radius: 10px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
		padding: 1rem;

		transition: box-shadow 0.2s ease;

		&:hover {
			box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
		}
	}
`;

const MemoryLink = styled.a`
	margin: 2rem 0;
`;

interface CharityProps {
	href: string;
	imgSrc: string;
	alt: string;
}

const CharityLink = ({ href, imgSrc, alt }: CharityProps) => (
	<a href={href}>
		<div>
			<Image
				src={imgSrc}
				width="100px"
				height="100px"
				alt={alt}
				layout="fixed"
			/>
		</div>
	</a>
);

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
			<Announcements>
				<h1>Consider donating to these charities</h1>
				<Charities>
					<CharityLink
						href="https://www.beyondblue.org.au/get-involved/make-a-donation"
						imgSrc="/beyond_blue_logo.jpg"
						alt="Beyond Blue"
					/>
					<CharityLink
						href="https://www.blackdoginstitute.org.au/sponsor"
						imgSrc="/black_dog_logo.jpg"
						alt="Black Dog Institute"
					/>
					<CharityLink
						href="https://npaq.org.au/donate/"
						imgSrc="/npaq-logo.jpg"
						alt="National Parks Association of Queensland"
					/>
				</Charities>
			</Announcements>
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
