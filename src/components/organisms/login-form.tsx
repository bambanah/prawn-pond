import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@atoms/error-message";
import Form from "@atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "@utils/firebase";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
	email: z.string().min(1, "Email is required"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Minimum 8 characters"),
});

const EmailAuthForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "", password: "" },
		mode: "onTouched",
		resolver: zodResolver(LoginFormSchema),
	});

	const onSubmit = handleSubmit(async (values) => {
		signInWithEmailAndPassword(values.email, values.password);
	});

	return (
		<Form onSubmit={onSubmit}>
			<Label>
				<Input
					id="email"
					placeholder="Email"
					type="email"
					aria-invalid={!!errors.email}
					{...register("email")}
				/>
				<ErrorMessage error={errors.email?.message} />
			</Label>

			<Label>
				<Input
					id="password"
					placeholder="Password"
					type="password"
					aria-invalid={!!errors.password}
					{...register("password")}
				/>
				<ErrorMessage error={errors.password?.message} />
			</Label>

			<Link href="/recover-password" className="text-center">
				Forgot your password?
			</Link>

			<Button type="submit" variant="primary">
				Login
			</Button>
		</Form>
	);
};

export default EmailAuthForm;
