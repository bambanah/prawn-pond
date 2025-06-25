import AuthPage from "@/components/templates/auth-page";
import Layout from "@/components/templates/layout";
import React from "react";

export default function Register() {
	return (
		<Layout>
			<AuthPage type="register" />
		</Layout>
	);
}
