import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Form from "@atoms/form";
import { sendPasswordResetEmail } from "@utils/firebase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "@templates/layout";

const RecoverPassword = ({ email }: { email?: string }) => {
	const [emailSent, setEmailSent] = useState(false);
	const { register, handleSubmit } = useForm({
		defaultValues: { email: email || "" },
	});

	const onSubmit = handleSubmit(async (values) => {
		sendPasswordResetEmail(values.email).then(() => setEmailSent(true));
	});

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
						<Form onSubmit={onSubmit}>
							<Label htmlFor="email">
								Email
								<Input
									id="email"
									placeholder="john@smith.com"
									type="email"
									{...register("email")}
								/>
							</Label>

							<Button type="submit">Recover Password</Button>
						</Form>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default RecoverPassword;
