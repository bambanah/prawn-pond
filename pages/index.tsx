import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import Layout from "../shared/components/Layout";
import Title from "../shared/components/text/Title";

const Content = styled.div`
	padding: 0 1em;
`;

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Sean</title>
			</Head>
			<Hero />
			<Content>
				<Title>Invoices</Title>
				<p>Hey there</p>
			</Content>
		</Layout>
	);
}
