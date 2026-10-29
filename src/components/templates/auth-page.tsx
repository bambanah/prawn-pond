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

// Lucide has no brand icons; paths from Simple Icons
const GoogleIcon = () => (
	<svg viewBox="0 0 24 24" className="size-[1em] fill-current">
		<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
	</svg>
);

const FacebookIcon = () => (
	<svg viewBox="0 0 24 24" className="size-[1em] fill-current">
		<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
	</svg>
);

const AuthPage = ({ type }: Props) => (
	<Layout>
		<Container>
			<Head>
				<title>{type === "login" ? "Login" : "Register"} - Sean Wilson</title>
			</Head>
			<h1>{type === "login" ? "Login" : "Create Account"}</h1>

			<ProviderButtons>
				<Button onClick={() => signInWithProvider("google")}>
					<GoogleIcon />
				</Button>
				<Button onClick={() => signInWithProvider("facebook")}>
					<FacebookIcon />
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
