import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Memory, MemoryObject } from "@Shared/types";
import { streamMemories } from "@Utils/firebase";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import MemoryCard from "./MemoryCard";

const StyledMasonry = styled(Masonry)`
	display: flex;
	margin-left: -30px; /* gutter size offset */
	width: auto;

	.masonry-grid-column {
		padding-left: 30px; /* gutter size */
		background-clip: padding-box;
	}

	@media screen and (max-width: 750px) {
		margin-left: 0;

		.masonry-grid-column {
			padding: 0;
		}
	}
`;

const MemoryList = () => {
	const [memories, setMemories] = useState<MemoryObject>({});

	useEffect(() => {
		const unsubscribe = streamMemories({
			next: (querySnapshot: firebase.firestore.QuerySnapshot) => {
				const updatedMemories: MemoryObject = {};

				querySnapshot.forEach((document: firebase.firestore.DocumentData) => {
					const invoice: Memory = document.data();
					updatedMemories[document.id] = invoice;
				});

				setMemories(updatedMemories);
			},
			error: () => console.error("Couldn't get memories."),
		});
		return unsubscribe;
	}, []);

	const columnBreakpoints = {
		default: 3,
		1100: 2,
		750: 1,
	};

	return (
		<StyledMasonry
			breakpointCols={columnBreakpoints}
			className="masonry-grid"
			columnClassName="masonry-grid-column"
		>
			{Object.values(memories).map((memory) => (
				<MemoryCard memory={memory} key={memory.created?.valueOf()} />
			))}
		</StyledMasonry>
	);
};

export default MemoryList;
