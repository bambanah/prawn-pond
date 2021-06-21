import { MemoryObject } from "@Shared/types";
import { getNextMemories } from "@Utils/firebase";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import Button from "./Button";
import MemoryCard from "./MemoryCard";

const StyledMasonry = styled(Masonry)`
	display: flex;
	margin-left: -2em;
	width: auto;

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

	useEffect(() => {
		const lastCreated =
			Object.values(memories)[Object.values(memories).length - 1].created;
		setLast(lastCreated);
	}, [memories]);

	const loadNextBatch = async (): Promise<void> => {
		if (!last) return;

		getNextMemories(last).then((nextMemories) => {
			setMemories({ ...memories, ...nextMemories });
		});
	};

	const columnBreakpoints = {
		default: 2,
		1100: 1,
	};

	if (!memories) return null;

	return (
		<StyledMasonry
			breakpointCols={columnBreakpoints}
			className="masonry-grid"
			columnClassName="masonry-grid-column"
		>
			{Object.entries(memories).map(([id, memory]) => (
				<MemoryCard memory={memory} key={id} />
			))}
			<Button onClick={() => loadNextBatch()}>Load More</Button>
		</StyledMasonry>
	);
};

export default MemoryList;
