import { MemoryObject } from "@Shared/types";
import { getNextMemories } from "@Utils/firebase";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import MemoryCard from "./MemoryCard";

const StyledMasonry = styled(Masonry)`
	display: flex;
	margin-left: -2em;
	width: auto;
	max-width: 1500px;

	.masonry-grid-column {
		padding-left: 2em;
		background-clip: padding-box;
	}

	@media screen and (max-width: 750px) {
		margin-left: 0;

		.masonry-grid-column {
			padding: 0;
		}
	}
`;

interface Props {
	initialMemories: MemoryObject;
	startFrom: firebase.firestore.Timestamp;
}

const MemoryList = ({ initialMemories, startFrom }: Props) => {
	const [last, setLast] =
		useState<firebase.firestore.Timestamp | undefined>(startFrom);
	const [memories, setMemories] = useState(initialMemories);
	const [loading, setLoading] = useState(false);
	const [loadedAllMemories, setLoadedAllMemories] = useState(false);

	useEffect(() => {
		const lastCreated =
			Object.values(memories)[Object.values(memories).length - 1].created;
		setLast(lastCreated);
	}, [memories]);

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
		if (loading) loadNextBatch();
	}, [loading]);

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
		window.addEventListener("scroll", checkScroll);

		return () => window.removeEventListener("scroll", checkScroll);
	}, []);

	const columnBreakpoints = {
		default: 3,
		1270: 2,
		900: 1,
	};

	if (!memories) return null;

	return (
		<>
			<StyledMasonry
				breakpointCols={columnBreakpoints}
				className="masonry-grid"
				columnClassName="masonry-grid-column"
			>
				{Object.entries(memories).map(([id, memory]) => (
					<MemoryCard memory={memory} key={id} />
				))}
			</StyledMasonry>
			{loadedAllMemories && (
				<>
					<p>You&rsquo;ve reached the bottom</p>
					<a
						onClick={() =>
							window.scroll({ top: 0, left: 0, behavior: "smooth" })
						}
						aria-hidden="true"
					>
						Back to the top
					</a>
				</>
			)}
			{loading && !loadedAllMemories && <p>Loading...</p>}
		</>
	);
};

export default MemoryList;
