import { signInWithProvider } from "@Utils/firebase";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Text from "./text/Text";

interface Props {
	type: "login" | "register";
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const EmailContainer = styled.div`
	margin-bottom: 1rem;
`;

const Separator = styled.span`
	padding: 2rem 0;
`;

const AuthPage = ({ type }: Props) => {
	let title;
	let formComponent: JSX.Element;
	let link;

	if (type === "login") {
		title = "Login - Sean Wilson";
		formComponent = <LoginForm />;
		link = "register";
	} else {
		title = "Register - Sean Wilson";
		formComponent = <RegisterForm />;
		link = "login";
	}

	return (
		<Layout>
			<Container>
				<Head>
					<title>{title}</title>
				</Head>
				<h1>{type === "login" ? "Login" : "Create Account"}</h1>

				<Button onClick={() => signInWithProvider("google")}>
					Login with Google
				</Button>

				<Separator>or use your email</Separator>

				<EmailContainer>{formComponent}</EmailContainer>

				<Text>Already have an account?</Text>
				<Link href={link}>
					{type === "login" ? "Create an account" : "Login"}
				</Link>
			</Container>
		</Layout>
	);
};

export default AuthPage;
