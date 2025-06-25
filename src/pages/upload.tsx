import { useAuth } from "@/hooks/useAuth";
import UploadForm from "@/components/organisms/upload-form";
import Layout from "@/components/templates/layout";
import { useRouter } from "next/router";
import styled from "styled-components";

const Content = styled.div`
	margin-top: 7rem;
	padding: 1em;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 50%;
	width: 50%;
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
