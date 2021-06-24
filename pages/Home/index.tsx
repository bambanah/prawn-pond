import Head from "next/head";
import React from "react";
import Hero from "@Components/Hero";
import Layout from "@Components/Layout";
import { NextPage } from "next";
import { getInitialMemories } from "@Utils/firebase";
import { MemoryObject } from "@Shared/types";
import firebase from "firebase";
import Announcements from "@Components/Announcements";
import MemoryList from "@Components/MemoryList";
import ContentContainer from "./styles";

interface Props {
  initialMemories?: MemoryObject;
  lastCreated?: firebase.firestore.Timestamp;
}

const Home: NextPage<Props> = ({ initialMemories, lastCreated }) => (
  <Layout>
    <Head>
      <title>Gallery - Sean Wilson</title>
    </Head>
    <Hero />
    <ContentContainer>
      <Announcements />
      {initialMemories && (
        <MemoryList initialMemories={initialMemories} startFrom={lastCreated} />
      )}
    </ContentContainer>
  </Layout>
);

Home.getInitialProps = async () => {
  const initialMemories = await getInitialMemories();

  let lastCreated: firebase.firestore.Timestamp | undefined;
  if (Object.keys(initialMemories).length > 0) {
    lastCreated =
      Object.values(initialMemories)[Object.values(initialMemories).length - 1]
        .created;
  }

  return { initialMemories, lastCreated };
};

export default Home;
