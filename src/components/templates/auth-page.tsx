import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithProvider } from "@utils/firebase";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "@atoms/button";
import Layout from "@templates/layout";
import LoginForm from "@organisms/login-form";
import RegisterForm from "@organisms/register-form";

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

const ProviderButtons = styled.div`
	display: flex;
	gap: 1rem;

	button {
		border-radius: 100%;
		width: 3rem;
		height: 3rem;
	}
`;

const AuthPage = ({ type }: Props) => (
	<Layout>
		<Container>
			<Head>
				<title>{type === "login" ? "Login" : "Register"} - Sean Wilson</title>
			</Head>
			<h1>{type === "login" ? "Login" : "Create Account"}</h1>

			<ProviderButtons>
				<Button onClick={() => signInWithProvider("google")}>
					<FontAwesomeIcon icon={faGoogle} />
				</Button>
				<Button onClick={() => signInWithProvider("facebook")}>
					<FontAwesomeIcon icon={faFacebook} />
				</Button>
			</ProviderButtons>

			<Separator>or use your email</Separator>

			<EmailContainer>
				{type === "login" ? <LoginForm /> : <RegisterForm />}
			</EmailContainer>

			<p>Already have an account?</p>
			<Link href={type === "login" ? "/register" : "/login"}>
				{type === "login" ? "Create an account" : "Login"}
			</Link>
		</Container>
	</Layout>
);

export default AuthPage;
