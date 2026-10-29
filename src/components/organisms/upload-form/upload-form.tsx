import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "@atoms/form";
import Heading from "@atoms/heading";
import Subheading from "@atoms/subheading";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonGroup from "@molecules/button-group";
import PostValidationSchema from "@schema/post-validation-schema";
import { categoryOptions, CreatedMemory } from "@shared/types";
import { createMemory, uploadFile } from "@utils/firebase";
import Image, { ImageLoaderProps } from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Do some hacky loader magic to get the next/image component to like the blob url
function imageLoader({ src }: ImageLoaderProps) {
	return src;
}

const UploadForm = () => {
	const [images, setImages] = useState<File[]>([]);

	const addImages = (acceptedFiles: File[]) => {
		setImages((_images) => [..._images, ...acceptedFiles]);
	};

	// Set up image dropzone
	const onDrop = (acceptedFiles: File[]) => {
		addImages(acceptedFiles);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: { description: "", categories: [] },
		resolver: zodResolver(PostValidationSchema),
	});

	const onSubmit = handleSubmit(async (values) => {
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
				images: fileNames,
			};

			// Create memory document
			await createMemory(newMemory);

			// Navigate to home
			Router.push("/");
		} catch (e) {
			console.error(e);
			toast.error("Failed to upload images, please try again.");
		}
	});

	return (
		<Form onSubmit={onSubmit}>
			<div
				className="flex h-[150px] min-w-[480px] cursor-pointer flex-col items-center justify-center rounded-[5px] border-4 border-fg p-8 hover:border-link hover:text-link"
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag and drop some files here, or click to select files</p>
				)}
			</div>

			<div className="flex w-full flex-wrap">
				{/* TODO: Support video preview */}
				{images &&
					images.map((image) => (
						<div
							key={image.lastModified}
							className="relative m-[0.5em] h-[100px] w-[200px] flex-[0_0_10%]"
						>
							<Image
								loader={imageLoader}
								key={image.name}
								src={URL.createObjectURL(image)}
								alt="preview"
								fill
								sizes="100vw"
								style={{
									objectFit: "contain",
								}}
							/>
						</div>
					))}
			</div>

			<Label htmlFor="description">
				<Textarea
					placeholder="Say a little something (if you want)"
					{...register("description")}
				/>
			</Label>

			<Controller
				control={control}
				name="categories"
				render={({ field }) => (
					<div className="flex flex-col gap-[0.2rem] [&_h2]:my-2">
						<Heading>Categories</Heading>
						<Subheading>Select any that apply</Subheading>
						{categoryOptions.map(
							(category) =>
								category.value !== "other" && (
									<div key={category.value} className="flex items-center gap-2">
										<Checkbox
											name="categories"
											id={category.value}
											value={category.value}
											checked={field.value.includes(category.value)}
											onCheckedChange={(checked) =>
												field.onChange(
													checked
														? [...field.value, category.value]
														: field.value.filter(
																(value) => value !== category.value
															)
												)
											}
										/>
										<Label htmlFor={category.value}>{category.label}</Label>
									</div>
								)
						)}
					</div>
				)}
			/>

			<ButtonGroup>
				<Button type="submit" variant="primary" disabled={isSubmitting}>
					{isSubmitting ? "Uploading" : "Upload"}
				</Button>
				<Button type="button" onClick={() => Router.push("/")}>
					Cancel
				</Button>
			</ButtonGroup>
		</Form>
	);
};

export default UploadForm;
