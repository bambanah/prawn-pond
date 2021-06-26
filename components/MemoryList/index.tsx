import Link from "@Components/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemoryCategory, MemoryObject } from "@Shared/types";
import { getNextMemories } from "@Utils/firebase";
import firebase from "firebase";
import React, { useEffect, useState, useMemo } from "react";

import MemoryCard from "../MemoryCard";
import CategorySelection from "./molecules/CategorySelection";
import {
	FooterContainer,
	MemoryLink,
	MemoryListContainer,
	StyledMasonry,
	TableViewSelectContainer,
	ListHeader,
} from "./styles";

interface Props {
	initialMemories: MemoryObject;
	startFrom: firebase.firestore.Timestamp | undefined;
}

const multiColumnBreakpoints = {
	default: 3,
	1270: 2,
	900: 1,
};

const singleColumnBreakpoints = {
	default: 1,
};

const MemoryList = ({ initialMemories, startFrom }: Props) => {
	const [last, setLast] =
		useState<firebase.firestore.Timestamp | undefined>(startFrom);
	const [memories, setMemories] = useState(initialMemories);
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);
	const [category, setCategory] = useState<MemoryCategory | "all">("all");
	const [multiColumn, setMultiColumn] = useState(true);

	const checkScroll = () => {
		if (!loadedAllMemories) {
			const gapToBottom = 400;

			const atBottom =
				Math.abs(document.body.getBoundingClientRect().y) + gapToBottom >
				document.body.getBoundingClientRect().height - window.innerHeight;

			if (atBottom) setLoading(true);
		}
	};

	const loadNextBatch = async (): Promise<void> => {
		if (!last) return;

		getNextMemories(last).then((nextMemories) => {
			if (Object.keys(nextMemories).length !== 0) {
				setMemories({ ...memories, ...nextMemories });
				setTimeout(() => setLoading(false), 1000);
			} else {
				setLoadedAllMemories(true);
			}
		});
	};

	useEffect(() => {
		if (Object.values(memories).length > 1) {
			const lastCreated =
				Object.values(memories)[Object.values(memories).length - 1].created;
			setLast(lastCreated);
		} else {
			setLoading(false);
			setLoadedAllMemories(true);
		}
	}, [memories]);

	useEffect(() => {
		if (loading) loadNextBatch();
	}, [loading]);

	useEffect(() => {
		window.addEventListener("scroll", checkScroll);

		return () => window.removeEventListener("scroll", checkScroll);
	}, []);

	const filteredMemories = useMemo(() => {
		if (category === "all") {
			return memories;
		}
		if (category === "other") {
			const filtered: MemoryObject = {};
			Object.keys(memories)
				.filter((key) => !memories[key].categories.length)
				.forEach((key) => {
					filtered[key] = memories[key];
				});
			return filtered;
		}

		const filtered: MemoryObject = {};
		Object.keys(memories)
			.filter((key) => memories[key].categories?.includes(category))
			.forEach((key) => {
				filtered[key] = memories[key];
			});
		return filtered;
	}, [memories, category]);

	if (!memories) return null;

	return (
		<MemoryListContainer>
			<h1>Memories</h1>

			<Link href="/upload">
				<MemoryLink>Add a memory</MemoryLink>
			</Link>

			<ListHeader>
				<CategorySelection handleChange={setCategory} />

				<TableViewSelectContainer>
					<FontAwesomeIcon
						icon="stream"
						size="2x"
						onClick={() => setMultiColumn(false)}
					/>
					<FontAwesomeIcon
						icon="th-large"
						size="2x"
						onClick={() => setMultiColumn(true)}
					/>
				</TableViewSelectContainer>
			</ListHeader>

			<StyledMasonry
				breakpointCols={
					multiColumn ? multiColumnBreakpoints : singleColumnBreakpoints
				}
				className="masonry-grid"
				columnClassName="masonry-grid-column"
			>
				{Object.entries(filteredMemories).map(([id, memory]) => (
					<MemoryCard memory={memory} key={id} />
				))}
			</StyledMasonry>

			{loading && !loadedAllMemories && (
				<FontAwesomeIcon icon="spinner" size="2x" className="spinner" />
			)}

			<FooterContainer>
				<p>You&rsquo;ve reached the bottom</p>
				<a
					onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
					aria-hidden="true"
				>
					Back to the top
				</a>
			</FooterContainer>
		</MemoryListContainer>
	);
};

export default MemoryList;
