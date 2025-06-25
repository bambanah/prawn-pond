import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createMemory, uploadFile } from "@/lib/firebase";
import { categoryOptions, CreatedMemory, MemoryCategory } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "src/components/ui/button";
import { z } from "zod";

// Do some hacky loader magic to get the next/image component to like the blob url
function imageLoader({ src }: ImageLoaderProps) {
	return src;
}

const formSchema = z.object({
	description: z.string().min(1),
	categories: z.array(z.string()).min(1),
});
type FormSchema = z.infer<typeof formSchema>;

const UploadForm = () => {
	const router = useRouter();
	const [images, setImages] = useState<File[]>([]);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
			categories: [],
		},
	});

	const onSubmit = async (values: FormSchema) => {
		if (!values.description && !images.length) {
			toast.error("Please add some details");
			return;
		}

		try {
			// Upload all images to firebase
			const fileNames = await Promise.all(
				images.map(async (image) => uploadFile(image))
			);

			// Attach filenames to Memory object
			const newMemory: CreatedMemory = {
				...values,
				categories: values.categories as MemoryCategory[],
				images: fileNames,
			};

			// Create memory document
			await createMemory(newMemory);

			// Navigate to home
			router.push("/");
		} catch (e) {
			console.error(e);
			toast.error("Failed to upload images, please try again.");
		}
	};

	// Set up image dropzone
	const onDrop = (acceptedFiles: File[]) => {
		setImages([...images, ...acceptedFiles]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/png": [],
			"image/jpeg": [],
			"image/webp": [],
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div
					className="flex flex-col items-center justify-center p-8 cursor-pointer border-2 border-blue-500 text-blue-500 rounded-md border-dashed"
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>Drag and drop some files here, or click to select files</p>
					)}
				</div>

				<div className="flex flex-wrap w-full">
					{images &&
						images.map((image) => (
							<div
								className="w-[200px] h-[100px] m-2 relative flex-1/12"
								key={image.lastModified}
							>
								<Image
									loader={imageLoader}
									key={image.name}
									src={URL.createObjectURL(image)}
									alt="preview"
									fill
									className="w-[200px] h-[100px]"
									sizes="200px"
									style={{
										objectFit: "contain",
									}}
								/>
							</div>
						))}
				</div>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categories"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">Categories</FormLabel>
								<FormDescription>
									Select the items you want to display in the sidebar.
								</FormDescription>
							</div>
							{categoryOptions.map((category) => (
								<FormField
									key={category.value}
									control={form.control}
									name="categories"
									render={({ field }) => {
										return (
											<FormItem
												key={category.value}
												className="flex flex-row items-center gap-2"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(category.value)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([
																		...field.value,
																		category.value,
																	])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== category.value
																		)
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="text-sm font-normal">
													{category.label}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-center gap-1.5">
					<Button type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? "Uploading" : "Upload"}
					</Button>

					<Button type="button" onClick={() => router.push("/")}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UploadForm;
