import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Memory, MemoryImages, MemoryObject } from "@Shared/types";
import { streamMemories } from "@Utils/firebase";
import { getMemoriesImages } from "@Utils/helpers";

const MemoryList = () => {
  const [memories, setMemories] = useState<MemoryObject>({});
  const [memoryImages, setMemoryImages] = useState<MemoryImages>({});

  useEffect(() => {
    // Retrieve all the image URLs for the memories available
    if (Object.keys(memories).length) {
      getMemoriesImages(memories).then(setMemoryImages);
    }
  }, [memories]);

  useEffect(() => {
    const unsubscribe = streamMemories({
      next: (querySnapshot: firebase.firestore.QuerySnapshot) => {
        const updatedMemories: MemoryObject = {};

        querySnapshot.forEach((document: firebase.firestore.DocumentData) => {
          const memory: Memory = document.data();
          updatedMemories[document.id] = memory;
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
        <>
          <li key={memoryId}>{memories[memoryId].description}</li>
          {memoryImages[memoryId] &&
            memoryImages[memoryId].map((imageUrl) => (
              <img
                src={imageUrl}
                alt={memories[memoryId].description}
                key={imageUrl}
                style={{ maxWidth: 200 }}
              />
            ))}
        </>
      ))}
    </ul>
  );
};

export default MemoryList;
