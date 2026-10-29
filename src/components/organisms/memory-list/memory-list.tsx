import { MemoryCategoryExtended } from "@shared/types";
import { LayoutGrid, LoaderCircle, Rows3 } from "lucide-react";
import Link from "next/link";
import React, {
	useEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import { useMemoryContext } from "@context/memory-context";
import MemoryCard from "@molecules/memory-card";
import CategorySelection from "@molecules/category-selection";

const subscribeToStorage = (onChange: () => void) => {
	window.addEventListener("storage", onChange);
	return () => window.removeEventListener("storage", onChange);
};

const setDisplayGrid = (displayGrid: boolean) => {
	localStorage.setItem("displayGrid", String(displayGrid));
	// The storage event only fires in other tabs, so notify this one too
	window.dispatchEvent(new StorageEvent("storage", { key: "displayGrid" }));
};

const MemoryList = () => {
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);
	const [category, setCategory] = useState<MemoryCategoryExtended>("all");
	const displayGrid = useSyncExternalStore(
		subscribeToStorage,
		() => localStorage.getItem("displayGrid") === "true",
		() => false
	);

	const [memories, fetchNextMemories, memoriesLoading] = useMemoryContext();

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
		<div
			className={`flex w-full max-w-[50rem] flex-col items-center justify-center p-0 ${
				displayGrid ? "min-[900px]:max-w-[75rem]" : ""
			}`}
		>
			<div
				id="memories"
				className="mt-8 flex w-full items-center justify-between gap-8 px-[2em] max-[750px]:px-[1em] [&_select]:text-[1.1rem]"
			>
				<CategorySelection
					handleChange={(category) => {
						setCategory(category);
					}}
				/>

				<Link
					href="/upload"
					className="ml-auto flex-[0_0_11rem] rounded-[2px] border border-current px-6 py-2 text-center text-[1.1rem] text-fg shadow-[2px_2px_6px_2px_rgba(0,0,0,0.2)] duration-100 hover:text-link active:shadow-[1px_1px_3px_1px_rgba(0,0,0,0.2)]"
				>
					Share Memory
				</Link>

				<div className="flex justify-end gap-[2em] max-[900px]:hidden">
					<Rows3
						className="size-[2em] cursor-pointer hover:text-black"
						onClick={() => setDisplayGrid(false)}
					/>
					<LayoutGrid
						className="size-[2em] cursor-pointer hover:text-black"
						onClick={() => setDisplayGrid(true)}
					/>
				</div>
			</div>

			<div
				className={`mt-[2em] mb-20 flex min-h-[400px] w-full max-w-[35rem] flex-col justify-center gap-4 gap-x-12 p-0 max-[650px]:max-w-full ${
					displayGrid
						? "min-[900px]:grid min-[900px]:max-w-full min-[900px]:grid-cols-[repeat(auto-fill,300px)]"
						: ""
				}`}
			>
				{filteredMemories.map((memory) => (
					<MemoryCard
						memory={memory}
						key={memory.id}
						displayGrid={displayGrid}
					/>
				))}
			</div>

			{loading && !loadedAllMemories && (
				<LoaderCircle className="flex size-[2em] animate-[spin_0.8s_ease-in_infinite] self-center" />
			)}

			{loadedAllMemories && (
				<div className="flex flex-col items-center justify-center text-xs">
					<p>You&rsquo;ve reached the bottom</p>
					<Link href="#memories">Back to the top</Link>
				</div>
			)}
		</div>
	);
};

export default MemoryList;
