import Head from "next/head";
import Router from "next/router";
import React from "react";
import Button from "../shared/components/Button";
import { signIn } from "../shared/utils/firebase";

export default function Login() {
	const handleClick = () => {
		signIn().then(() => {
			Router.push("/");
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
