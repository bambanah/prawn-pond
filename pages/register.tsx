import AuthPage from "@Components/AuthPage";
import Layout from "@Components/Layout";
import React from "react";

export default function Register() {
	return (
		<Layout>
			<AuthPage type="register" />
		</Layout>
	);
}
