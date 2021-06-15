import React from "react";
import styled from "styled-components";
import UploadForm from "../components/UploadForm";
import Layout from "../shared/components/Layout";

const Content = styled.div`
	margin-top: 7rem;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Upload = () => (
	<Layout>
		<Content>
			<UploadForm />
		</Content>
	</Layout>
);

export default Upload;
