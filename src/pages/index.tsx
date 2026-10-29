import React from "react";
import Hero from "@molecules/hero";
import Layout from "@templates/layout";
import { NextPage } from "next";
import Announcements from "@molecules/announcements";
import MemoryList from "@organisms/memory-list";
import { MemoryContextProvider } from "@context/memory-context";

const Home: NextPage = () => (
	<Layout>
		<Hero />
		<MemoryContextProvider>
			<div className="mt-[96vh] flex w-full flex-col items-center bg-bg pb-12 shadow-[0_0_19px_rgba(0,0,0,0.5)]">
				<Announcements />
				<MemoryList />
			</div>
		</MemoryContextProvider>
	</Layout>
);

export default Home;
