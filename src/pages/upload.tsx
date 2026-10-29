import { useRouter } from "next/router";
import React from "react";
import UploadForm from "@organisms/upload-form";
import Layout from "@templates/layout";
import { useAuth } from "@hooks/useAuth";

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
			<div className="mt-28 flex w-1/2 max-w-1/2 flex-col items-center p-[1em]">
				<UploadForm />
			</div>
		</Layout>
	);
};

export default Upload;
