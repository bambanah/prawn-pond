import Button from "@Components/Button";
import Form from "@Components/forms/Form";
import { signInWithEmailAndPassword } from "@Utils/firebase";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";
import Input from "./forms/Input";

interface Props {
	email: string;
	password: string;
}

const LoginFormSchema = yup.object().shape({
	email: yup.string().required("Email is required"),
	password: yup
		.string()
		.min(8, "Minimum 8 characters")
		.required("Password is required"),
});

const EmailAuthForm = () => {
	const handleSubmit = async (values: Props) => {
		signInWithEmailAndPassword(values.email, values.password);
	};

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={handleSubmit}
			validationSchema={LoginFormSchema}
		>
			<Form>
				<Input id="email" name="email" placeholder="Email" type="email" />

				<Input
					id="password"
					name="password"
					placeholder="Password"
					type="password"
				/>
				<Link href="recover-password">Forgot your password?</Link>

				<Button type="submit" primary>
					Login
				</Button>
			</Form>
		</Formik>
	);
};

export default EmailAuthForm;
