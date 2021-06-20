import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Memory, MemoryObject } from "@Shared/types";
import { streamMemories } from "@Utils/firebase";
import styled from "styled-components";
import MemoryCard from "./MemoryCard";

const MemoryContainer = styled.div`
	margin-top: 2rem;
	columns: 3 200px;
	column-gap: 1rem;
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

	return (
		<MemoryContainer>
			{Object.values(memories).map((memory) => (
				<MemoryCard memory={memory} key={memory.created?.valueOf()} />
			))}
		</MemoryContainer>
	);
};

export default MemoryList;
