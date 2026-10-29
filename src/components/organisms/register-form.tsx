import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "@atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerWithEmailAndPassword } from "@utils/firebase";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "@atoms/error-message";

const RegisterFormSchema = z
	.object({
		email: z.string().min(1, "Email is required"),
		name: z.string(),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Minimum 8 characters"),
		confirmPassword: z.string().min(1, "Field is required"),
	})
	.refine((values) => values.confirmPassword === values.password, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
		// Check even while other fields are invalid
		when: () => true,
	});

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
		mode: "onTouched",
		resolver: zodResolver(RegisterFormSchema),
	});

	const onSubmit = handleSubmit(async (values) => {
		registerWithEmailAndPassword(values.email, values.password, values.name);
	});

	return (
		<Form onSubmit={onSubmit}>
			<Label htmlFor="email">
				<Input
					id="email"
					placeholder="Email"
					type="email"
					aria-invalid={!!errors.email}
					{...register("email")}
				/>
				<ErrorMessage error={errors.email?.message} />
			</Label>

			<Label htmlFor="name">
				<Input
					id="name"
					placeholder="Name"
					type="name"
					aria-invalid={!!errors.name}
					{...register("name")}
				/>
				<ErrorMessage error={errors.name?.message} />
			</Label>

			<Label htmlFor="password">
				<Input
					id="password"
					placeholder="Password"
					type="password"
					aria-invalid={!!errors.password}
					{...register("password")}
				/>
				<ErrorMessage error={errors.password?.message} />
			</Label>

			<Label htmlFor="confirmPassword">
				<Input
					id="confirmPassword"
					placeholder="Confirm Password"
					type="password"
					aria-invalid={!!errors.confirmPassword}
					{...register("confirmPassword")}
				/>
				<ErrorMessage error={errors.confirmPassword?.message} />
			</Label>

			<Button type="submit" variant="primary">
				Register
			</Button>
		</Form>
	);
};

export default RegisterForm;
