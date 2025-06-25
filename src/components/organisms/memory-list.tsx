import CategorySelection from "@/components/molecules/category-selection";
import MemoryCard from "@/components/molecules/memory-card";
import { Button } from "@/components/ui/button";
import { useMemoryContext } from "@/context/memory-context";
import { MemoryCategoryExtended } from "@/shared/types";
import { Grid2X2, Loader, Rows2 } from "lucide-react";
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

				<div className="flex gap-4">
					<Link href="/upload">
						<Button>Share Memory</Button>
					</Link>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							enableGrid(false);
							localStorage.setItem("displayGrid", "false");
						}}
					>
						<Rows2 />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							enableGrid(true);
							localStorage.setItem("displayGrid", "true");
						}}
					>
						<Grid2X2 />
					</Button>
				</div>
			</div>

			<div className="w-full flex flex-col gap-4" id="memories">
				{filteredMemories.map((memory) => (
					<MemoryCard
						memory={memory}
						key={memory.id}
						displayGrid={displayGrid}
					/>
				))}
			</div>

			{loading && !loadedAllMemories && (
				<Loader className="animate-spin duration-1000 mx-auto my-8" />
			)}

			{loadedAllMemories && (
				<div className="flex flex-col justify-center items-center text-sm mt-16">
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
