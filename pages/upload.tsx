import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import UploadForm from "@Components/UploadForm";
import Layout from "@Components/Layout";
import { useAuth } from "@Hooks/useAuth";

const Content = styled.div`
	margin-top: 7rem;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Upload = () => {
	const router = useRouter();

	const { authenticated, loadingAuthState } = useAuth();

	if (!authenticated && !loadingAuthState) {
		router.push({
			pathname: "/login",
			query: { redirect: router.pathname },
		});
		return <div>Redirecting...</div>;
	}
	return (
		<Layout>
			<Content>
				<UploadForm />
			</Content>
		</Layout>
	);
};

export default Upload;
