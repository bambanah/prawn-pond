import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import Layout from "../shared/components/Layout";
import Title from "../shared/components/text/Title";

const Content = styled.div`
	padding: 0 1em;
	margin-top: 5rem;
	width: 95vw;
	max-width: 1500px;
`;

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Gallery - Sean Wilson</title>
			</Head>
			<Hero />
			<Content>
				<Title>Memories</Title>
				<i>Mason style grid of images/videos/text here</i>
			</Content>
		</Layout>
	);
}
