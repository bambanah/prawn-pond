import Button from "@atoms/button";
import ErrorMessage from "@atoms/error-message";
import Form from "@atoms/form";
import Input from "@atoms/input";
import Label from "@atoms/label";
import { signInWithEmailAndPassword } from "@utils/firebase";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import * as yup from "yup";

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

const ForgotPasswordText = styled.a`
	text-align: center;
`;

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
			{({ errors, touched }) => (
				<Form>
					<Label>
						<Input
							id="email"
							name="email"
							placeholder="Email"
							type="email"
							error={touched.email && errors.email}
						/>
						<ErrorMessage error={errors.email} touched={touched.email} />
					</Label>

					<Label>
						<Input
							id="password"
							name="password"
							placeholder="Password"
							type="password"
							error={touched.password && errors.password}
						/>
						<ErrorMessage error={errors.password} touched={touched.password} />
					</Label>

					<Link href="/recover-password">
						<ForgotPasswordText>Forgot your password?</ForgotPasswordText>
					</Link>

					<Button type="submit" primary>
						Login
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default EmailAuthForm;
