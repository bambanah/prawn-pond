import UploadForm from "@/components/organisms/upload-form";
import Layout from "@/components/templates/layout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

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
			<div className="mt-24 p-4 flex flex-col items-center max-w-1/2 w-1/2">
				<UploadForm />
			</div>
		</Layout>
	);
};

export default Upload;
