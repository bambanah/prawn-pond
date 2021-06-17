import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Hero from "@Components/Hero";
import MemoryList from "@Components/MemoryList";
import Layout from "@Components/Layout";

const Content = styled.div`
	padding: 0 1em;
	margin: 5rem 0;
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
				<MemoryList />
			</Content>
		</Layout>
	);
}
