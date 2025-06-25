import ErrorMessage from "@/components/atoms/error-message";
import Form from "@/components/atoms/form";
import Input from "@/components/atoms/input";
import Label from "@/components/atoms/label";
import { registerWithEmailAndPassword } from "@/lib/firebase";
import { Formik } from "formik";
import { Button } from "src/components/ui/button";
import * as yup from "yup";

interface Props {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

const RegisterFormSchema = yup.object().shape({
	email: yup.string().required("Email is required"),
	name: yup.string(),
	password: yup
		.string()
		.min(8, "Minimum 8 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), undefined], "Passwords don't match")
		.required("Field is required"),
});

const RegisterForm = () => {
	const handleSubmit = async (values: Props) => {
		if (values.password === values.confirmPassword) {
			registerWithEmailAndPassword(values.email, values.password, values.name);
		}
	};

	return (
		<Formik
			initialValues={{
				email: "",
				name: "",
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

					<Label htmlFor="name">
						<Input
							id="name"
							name="name"
							placeholder="Name"
							type="name"
							error={touched.name && errors.name}
						/>
						<ErrorMessage error={errors.name} touched={touched.name} />
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
