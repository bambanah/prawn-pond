import Button from "@Components/Button";
import Form from "@Components/forms/Form";
import { registerWithEmailAndPassword } from "@Utils/firebase";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import ErrorMessage from "./forms/ErrorMessage";
import Input from "./forms/Input";
import Label from "./forms/Label";

interface Props {
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterFormSchema = yup.object().shape({
	email: yup.string().required("Email is required"),
	password: yup
		.string()
		.min(8, "Minimum 8 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords don't match")
		.required("Field is required"),
});

const RegisterForm = () => {
	const handleSubmit = async (values: Props) => {
		if (values.password === values.confirmPassword) {
			registerWithEmailAndPassword(values.email, values.password);
		}
	};

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				confirmPassword: "",
			}}
			onSubmit={handleSubmit}
			validationSchema={RegisterFormSchema}
		>
			{({ errors, touched }) => (
				<Form>
					<Label htmlFor="email">
						<Input
							id="email"
							name="email"
							placeholder="Email"
							type="email"
							error={touched.email && errors.email}
						/>
						<ErrorMessage error={errors.email} touched={touched.email} />
					</Label>

					<Label htmlFor="password">
						<Input
							id="password"
							name="password"
							placeholder="Password"
							type="password"
							error={touched.password && errors.password}
						/>
						<ErrorMessage error={errors.password} touched={touched.password} />
					</Label>

					<Label htmlFor="confirmPassword">
						<Input
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Confirm Password"
							type="password"
							error={touched.confirmPassword && errors.confirmPassword}
						/>
						<ErrorMessage
							error={errors.confirmPassword}
							touched={touched.confirmPassword}
						/>
					</Label>

					<Button type="submit">Register</Button>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
