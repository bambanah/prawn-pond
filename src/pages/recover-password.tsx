import Button from "@components/Button";
import Form from "@components/forms/Form";
import Input from "@components/forms/Input";
import Label from "@components/forms/Label";
import { sendPasswordResetEmail } from "@utils/firebase";
import { Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import Text from "@components/text/Text";
import Link from "next/link";
import Layout from "@components/Layout";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

const EmailSentContainer = styled.div`
	text-align: center;
`;

const RecoverPassword = ({ email }: { email?: string }) => {
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (values: { email: string }) => {
		sendPasswordResetEmail(values.email).then(() => setEmailSent(true));
	};

	return (
		<Layout>
			<Container>
				<Content>
					{emailSent ? (
						<EmailSentContainer>
							<Text>Email sent - check your inbox.</Text>
							<Link href="/">Go back home</Link>
						</EmailSentContainer>
					) : (
						<Formik
							initialValues={{ email: email || "" }}
							onSubmit={handleSubmit}
						>
							<Form>
								<Label htmlFor="email">
									Email
									<Input
										id="email"
										name="email"
										placeholder="john@smith.com"
										type="email"
									/>
								</Label>

								<Button type="submit">Recover Password</Button>
							</Form>
						</Formik>
					)}
				</Content>
			</Container>
		</Layout>
	);
};

export default RecoverPassword;
