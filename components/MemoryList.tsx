import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Memory, MemoryObject } from "@Shared/types";
import { streamMemories } from "@Utils/firebase";

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
      error: () => console.error("Couldn't get invoices.")
    });
    return unsubscribe;
  }, []);

  return (
    <ul>
      {Object.keys(memories).map((memoryId) => (
        <li key={memoryId}>{memories[memoryId].description}</li>
      ))}
    </ul>
  );
};

export default MemoryList;
