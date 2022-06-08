import AuthPage from "@templates/auth-page";
import Layout from "@templates/layout";
import React from "react";

export default function Register() {
	return (
		<Layout>
			<AuthPage type="register" />
		</Layout>
	);
}
