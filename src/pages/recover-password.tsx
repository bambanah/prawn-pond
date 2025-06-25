import Layout from "@/components/templates/layout";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Form,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendPasswordResetEmail } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email(),
});
type FormSchema = z.infer<typeof formSchema>;

const RecoverPassword = ({ email }: { email?: string }) => {
	const [emailSent, setEmailSent] = useState(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: email || "",
		},
	});

	const onSubmit = async (values: FormSchema) => {
		await sendPasswordResetEmail(values.email);
		setEmailSent(true);
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
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit">Recover Password</Button>
							</form>
						</Form>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default RecoverPassword;
