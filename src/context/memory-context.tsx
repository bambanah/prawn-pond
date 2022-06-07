import { Memory } from "@shared/types";
import { getInitialMemories, getNextMemories } from "@utils/firebase";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextState {
	memories: [Memory[], () => Promise<boolean>, boolean];
}

const MemoryContext = createContext<AppContextState>({
	memories: [[], async () => false, true],
});

interface Props {
	children: React.ReactNode;
}

export const MemoryContextProvider: React.FC<Props> = ({ children }) => {
	const [memories, setMemories] = useState<Memory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getInitialMemories().then((memories) => {
			setMemories(memories);
			setLoading(false);
		});
	}, []);

	const fetchNext = async () => {
		const lastMemory = memories.at(-1);

		if (lastMemory && lastMemory.created !== undefined && !loading) {
			return getNextMemories(lastMemory.created)
				.then((nextMemories) => {
					setLoading(false);
					if (nextMemories.length === 0) return false;

					setMemories([...memories, ...nextMemories]);
					return true;
				})
				.catch(() => {
					setLoading(false);
					return false;
				});
		} else {
			return false;
		}
	};

	return (
		<MemoryContext.Provider
			value={{ memories: [memories, fetchNext, loading] }}
		>
			{children}
		</MemoryContext.Provider>
	);
};

export const useMemoryContext = () => {
	return useContext(MemoryContext).memories;
};
