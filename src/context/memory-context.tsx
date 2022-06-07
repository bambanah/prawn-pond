import { Memory } from "@shared/types";
import { getInitialMemories, getNextMemories } from "@utils/firebase";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextState {
	memories: [Memory[], () => Promise<boolean>];
}

const MemoryContext = createContext<AppContextState>({
	memories: [[], async () => false],
});

interface Props {
	children: React.ReactNode;
}

export const MemoryContextProvider: React.FC<Props> = ({ children }) => {
	const [memories, setMemories] = useState<Memory[]>([]);

	useEffect(() => {
		getInitialMemories().then((memories) => {
			setMemories(memories);
		});
	}, []);

	const fetchNext = async () => {
		const lastMemory = memories.at(-1);

		if (lastMemory && lastMemory.created !== undefined) {
			const nextMemories = await getNextMemories(lastMemory.created);

			if (nextMemories.length === 0) return false;

			setMemories([...memories, ...nextMemories]);
			return true;
		}

		return false;
	};

	return (
		<MemoryContext.Provider value={{ memories: [memories, fetchNext] }}>
			{children}
		</MemoryContext.Provider>
	);
};

export const useMemoryContext = () => {
	return useContext(MemoryContext).memories;
};
