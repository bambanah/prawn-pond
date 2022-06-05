import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemoryCategory, MemoryObject } from "@shared/types";
import { getNextMemories } from "@utils/firebase";
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
import {
	faSpinner,
	faStream,
	faThLarge,
} from "@fortawesome/free-solid-svg-icons";

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
	const [last, setLast] = useState<firebase.firestore.Timestamp | undefined>(
		startFrom
	);
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
		if (!last || !loading) return;

		getNextMemories(last).then((nextMemories) => {
			if (Object.keys(nextMemories).length > 0) {
				setMemories({ ...memories, ...nextMemories });
				setTimeout(() => setLoading(false), 1000);
			} else {
				setLoadedAllMemories(true);
			}
		});
	}, [last, loading, memories]);

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
			for (const key of Object.keys(memories).filter(
				(key) => !memories[key].categories?.length
			)) {
				filtered[key] = memories[key];
			}
			return filtered;
		}

		const filtered: MemoryObject = {};
		for (const key of Object.keys(memories).filter((key) =>
			memories[key].categories?.includes(category)
		)) {
			filtered[key] = memories[key];
		}
		return filtered;
	}, [memories, category]);

	if (!memories) return null;

	return (
		<MemoryListContainer>
			<ListHeader id="memories">
				<CategorySelection handleChange={setCategory} />

				<Link href="/upload">
					<MemoryLink>Share Memory</MemoryLink>
				</Link>

				<TableViewSelectContainer>
					<FontAwesomeIcon
						icon={faStream}
						size="2x"
						onClick={() => setMultiColumn(false)}
					/>
					<FontAwesomeIcon
						icon={faThLarge}
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
