import CategorySelection from "@/components/molecules/category-selection";
import MemoryCard from "@/components/molecules/memory-card";
import { Button } from "@/components/ui/button";
import { useMemoryContext } from "@/context/memory-context";
import { MemoryCategoryExtended } from "@/shared/types";
import {
	faSpinner,
	faStream,
	faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const MemoryList = () => {
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);
	const [category, setCategory] = useState<MemoryCategoryExtended>("all");
	const [displayGrid, enableGrid] = useState(false);

	const [memories, fetchNextMemories, memoriesLoading] = useMemoryContext();

	useEffect(() => {
		const localDisplayGrid = localStorage.getItem("displayGrid") as
			| string
			| null;

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
		<div className="w-full max-w-3xl ">
			<div className="my-8 flex gap-2 w-full justify-between">
				<CategorySelection handleChange={setCategory} />

				<div className="flex gap-8">
					<Link href="/upload">
						<Button>Share Memory</Button>
					</Link>

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
				</div>
			</div>

			<div className="w-full flex flex-col gap-4">
				{filteredMemories.map((memory) => (
					<MemoryCard
						memory={memory}
						key={memory.id}
						displayGrid={displayGrid}
					/>
				))}
			</div>

			{loading && !loadedAllMemories && (
				<FontAwesomeIcon icon={faSpinner} size="2x" className="spinner" />
			)}

			{loadedAllMemories && (
				<div className="flex flex-col justify-center items-center text-sm">
					<p>You&#39;ve reached the bottom</p>
					<Link href="#memories" className="font-bold">
						Back to the top
					</Link>
				</div>
			)}
		</div>
	);
};

export default MemoryList;
