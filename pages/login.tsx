import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "@Components/Button";
import { signIn } from "@Utils/firebase";

export default function Login() {
  const router = useRouter();

  const handleClick = () => {
    const { redirect } = router.query;

    signIn().then(() => {
      if (redirect && !Array.isArray(redirect)) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="section">
      <Head>
        <title>Login - Sean Wilson</title>
      </Head>
      <div className="container">
        <h1 className="title">Login</h1>
        <Button onClick={handleClick}>Login</Button>
      </div>
    </div>
  );
}
