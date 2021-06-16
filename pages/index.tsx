import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import MemoryList from "../components/MemoryList";
import Layout from "../shared/components/Layout";

const Content = styled.div`
	padding: 0 1em;
	margin-top: 5rem;
	width: 95vw;
	max-width: 1500px;
	display: flex;
	flex-direction: column;
	justify-content: left;
`;

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Gallery - Sean Wilson</title>
			</Head>
			<Hero />
			<Content>
				<Link href="/upload">
					<a>Add a memory</a>
				</Link>
				<i>Mason style grid of images/videos/text here</i>
				<MemoryList />
			</Content>
		</Layout>
	);
}
