import AuthPage from "@components/AuthPage";
import Layout from "@components/Layout";
import React from "react";

export default function Register() {
	return (
		<Layout>
			<AuthPage type="register" />
		</Layout>
	);
}
