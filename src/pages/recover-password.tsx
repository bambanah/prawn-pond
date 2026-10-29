import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Form from "@atoms/form";
import Input from "@atoms/input";
import { sendPasswordResetEmail } from "@utils/firebase";
import { Formik } from "formik";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "@templates/layout";

const RecoverPassword = ({ email }: { email?: string }) => {
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (values: { email: string }) => {
		sendPasswordResetEmail(values.email).then(() => setEmailSent(true));
	};

	return (
		<Layout>
			<div className="flex h-screen flex-col items-center justify-center">
				<div className="flex flex-col">
					{emailSent ? (
						<div className="text-center">
							<p>Email sent - check your inbox.</p>
							<Link href="/">Go back home</Link>
						</div>
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
				</div>
			</div>
		</Layout>
	);
};

export default RecoverPassword;
