import { MemoryCategoryExtended } from "@shared/types";
import { LayoutGrid, LoaderCircle, Rows3 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useMemoryContext } from "@context/memory-context";
import MemoryCard from "@molecules/memory-card";
import CategorySelection from "@molecules/category-selection";
import {
	FooterContainer,
	ListContent,
	ListHeader,
	MemoryLink,
	MemoryListContainer,
	TableViewSelectContainer,
} from "./memory-list.styles";

const MemoryList = () => {
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);
	const [category, setCategory] = useState<MemoryCategoryExtended>("all");
	const [displayGrid, enableGrid] = useState(false);

	const [memories, fetchNextMemories, memoriesLoading] = useMemoryContext();

	useEffect(() => {
		const localDisplayGrid = localStorage.getItem("displayGrid") as
			string | null;

		if (localDisplayGrid !== null && localDisplayGrid.length > 0) {
			enableGrid(localDisplayGrid === "true");
		}
	}, []);

	useEffect(() => {
		const checkScroll = () => {
			if (!loadedAllMemories) {
				const gapToBottom = 600;

				const atBottom =
					Math.abs(document.body.getBoundingClientRect().y) + gapToBottom >
					document.body.getBoundingClientRect().height - window.innerHeight;

				if (atBottom && !memoriesLoading) {
					fetchNextMemories().then((loadedMore) => {
						setLoadedAllMemories(!loadedMore);
						setTimeout(() => setLoading(false), 1000);
					});
				}
			}
		};

		window.addEventListener("scroll", checkScroll);

		if (loadedAllMemories) {
			window.removeEventListener("scroll", checkScroll);
		}

		return () => window.removeEventListener("scroll", checkScroll);
	}, [fetchNextMemories, loadedAllMemories, memoriesLoading]);

	const filteredMemories = useMemo(() => {
		if (category === "all") {
			return memories;
		} else if (category === "other") {
			return memories.filter((memory) => !memory.categories);
		}

		return memories.filter((memory) => memory.categories?.includes(category));
	}, [memories, category]);

	if (!memories) return <div>Loading memories...</div>;

	return (
		<MemoryListContainer className={displayGrid ? "grid" : "feed"}>
			<ListHeader id="memories">
				<CategorySelection
					handleChange={(category) => {
						setCategory(category);
					}}
				/>

				<MemoryLink href="/upload">Share Memory</MemoryLink>

				<TableViewSelectContainer>
					<Rows3
						className="size-[2em]"
						onClick={() => {
							enableGrid(false);
							localStorage.setItem("displayGrid", "false");
						}}
					/>
					<LayoutGrid
						className="size-[2em]"
						onClick={() => {
							enableGrid(true);
							localStorage.setItem("displayGrid", "true");
						}}
					/>
				</TableViewSelectContainer>
			</ListHeader>

			<ListContent className={displayGrid ? "grid" : "feed"}>
				{filteredMemories.map((memory) => (
					<MemoryCard
						memory={memory}
						key={memory.id}
						displayGrid={displayGrid}
					/>
				))}
			</ListContent>

			{loading && !loadedAllMemories && (
				<LoaderCircle className="spinner size-[2em]" />
			)}

			{loadedAllMemories && (
				<FooterContainer>
					<p>You&rsquo;ve reached the bottom</p>
					<Link href="#memories">Back to the top</Link>
				</FooterContainer>
			)}
		</MemoryListContainer>
	);
};

export default MemoryList;
