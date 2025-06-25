import PostValidationSchema from "@/schema/post-validation-schema";
import Form from "@/components/atoms/form";
import Heading from "@/components/atoms/heading";
import Label from "@/components/atoms/label";
import Subheading from "@/components/atoms/subheading";
import TextArea from "@/components/atoms/text-area";
import { categoryOptions, CreatedMemory, MemoryCategory } from "@/shared/types";
import { createMemory, uploadFile } from "@/lib/firebase";
import { FieldArray, Formik } from "formik";
import Image, { ImageLoaderProps } from "next/image";
import Router from "next/router";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "src/components/ui/button";
import {
	Categories,
	DropZoneContainer,
	ImageContainer,
	ImagePreviewContainer,
} from "./upload-form.styles";

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

	const initialValues: CreatedMemory = {
		description: "",
		categories: [],
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values) => {
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
					Router.push("/");
				} catch (e) {
					console.error(e);
					toast.error("Failed to upload images, please try again.");
				}
			}}
			validationSchema={PostValidationSchema}
			validateOnMount={false}
			validateOnChange
			validateOnBlur
		>
			{({ errors, values, handleSubmit, isValid, isSubmitting }) => (
				<Form>
					<DropZoneContainer {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p>Drop the files here ...</p>
						) : (
							<p>Drag and drop some files here, or click to select files</p>
						)}
					</DropZoneContainer>

					<ImagePreviewContainer>
						{/* TODO: Support video preview */}
						{images &&
							images.map((image) => (
								<ImageContainer key={image.lastModified}>
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
								</ImageContainer>
							))}
					</ImagePreviewContainer>

					<Label htmlFor="description">
						<TextArea
							onChange={(e) => {
								values.description = e.target.value;
							}}
							placeholder="Say a little something (if you want)"
							error={errors.description !== undefined}
						/>
						{errors.description && (
							<Subheading>{errors.description}</Subheading>
						)}
					</Label>

					<FieldArray
						name="categories"
						render={(arrayHelpers) => (
							<Categories>
								<Heading>Categories</Heading>
								<Subheading>Select any that apply</Subheading>
								{categoryOptions.map(
									(category) =>
										category.value !== "other" && (
											<label key={category.value} htmlFor={category.value}>
												<input
													name="categories"
													type="checkbox"
													id={category.value}
													value={category.value}
													checked={values.categories.includes(category.value)}
													onChange={(e) => {
														if (e.target.checked) {
															arrayHelpers.push(category.value);
														} else {
															const idx = values.categories.indexOf(
																category.value
															);
															arrayHelpers.remove(idx);
														}
													}}
												/>
												<span>{category.label}</span>
											</label>
										)
								)}
							</Categories>
						)}
					/>

					<div className="flex items-center justify-center gap-1.5">
						<Button
							type="button"
							onClick={() => isValid && handleSubmit()}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Uploading" : "Upload"}
						</Button>
						<Button type="button" onClick={() => Router.push("/")}>
							Cancel
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UploadForm;
