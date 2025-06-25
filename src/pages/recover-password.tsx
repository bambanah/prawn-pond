import Form from "@/components/atoms/form";
import Input from "@/components/atoms/input";
import Label from "@/components/atoms/label";
import Layout from "@/components/templates/layout";
import { sendPasswordResetEmail } from "@/lib/firebase";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { Button } from "src/components/ui/button";

const RecoverPassword = ({ email }: { email?: string }) => {
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (values: { email: string }) => {
		sendPasswordResetEmail(values.email).then(() => setEmailSent(true));
	};

	return (
		<Layout>
			<div className="flex flex-col justify-center items-center h-screen">
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
