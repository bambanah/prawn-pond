import {
	faSpinner,
	faStream,
	faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemoryCategoryExtended } from "@shared/types";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useMemoryContext } from "src/context/memory-context";
import MemoryCard from "../MemoryCard";
import CategorySelection from "./molecules/CategorySelection";
import {
	FooterContainer,
	ListContent,
	ListHeader,
	MemoryLink,
	MemoryListContainer,
	TableViewSelectContainer,
} from "./styles";

const MemoryList = () => {
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);
	const [category, setCategory] = useState<MemoryCategoryExtended>("all");
	const [displayGrid, enableGrid] = useState(true);

	const [memories, fetchNextMemories, memoriesLoading] = useMemoryContext();

	useEffect(() => {
		const localCategory = localStorage.getItem("category");
		const localDisplayGrid = localStorage.getItem("displayGrid") as
			| string
			| null;

		if (localCategory !== null && localCategory.length > 0) {
			// TODO: Display category on first load
			setCategory(localCategory as MemoryCategoryExtended);
		}
		if (localDisplayGrid !== null && localDisplayGrid.length > 0) {
			enableGrid(localDisplayGrid === "true");
		}
	}, []);

	useEffect(() => {
		const checkScroll = () => {
			if (!loadedAllMemories) {
				const gapToBottom = 400;

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
		<MemoryListContainer>
			<ListHeader id="memories">
				<CategorySelection
					handleChange={(category) => {
						localStorage.setItem("category", category);
						setCategory(category);
					}}
				/>

				<Link href="/upload">
					<MemoryLink>Share Memory</MemoryLink>
				</Link>

				<TableViewSelectContainer>
					<FontAwesomeIcon
						icon={faStream}
						size="2x"
						onClick={() => {
							enableGrid(false);
							localStorage.setItem("displayGrid", "false");
						}}
					/>
					<FontAwesomeIcon
						icon={faThLarge}
						size="2x"
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
				<FontAwesomeIcon icon={faSpinner} size="2x" className="spinner" />
			)}

			{loadedAllMemories && (
				<FooterContainer>
					<p>You&rsquo;ve reached the bottom</p>
					<Link href="#memories">
						<a>Back to the top</a>
					</Link>
				</FooterContainer>
			)}
		</MemoryListContainer>
	);
};

export default MemoryList;
