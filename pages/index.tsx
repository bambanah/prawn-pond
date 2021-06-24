import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Hero from "@Components/Hero";
import Layout from "@Components/Layout";
import { NextPage } from "next";
import { getInitialMemories } from "@Utils/firebase";
import { MemoryObject } from "@Shared/types";
import firebase from "firebase";
import Announcements from "@Components/Announcements";
import MemoryList from "@Components/MemoryList";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 751px) {
    margin-top: 96vh;
  }

  @media screen and (max-width: 750px) {
    padding: inherit 0;
    /* padding-top: 5rem; */
  }
`;

const MemoryLink = styled.a`
  margin: 2rem 0;
`;

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
    <Content>
      <Announcements />
      <Link href="/upload">
        <MemoryLink>Add a memory</MemoryLink>
      </Link>
      {initialMemories && lastCreated && (
        <MemoryList initialMemories={initialMemories} startFrom={lastCreated} />
      )}
    </Content>
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
