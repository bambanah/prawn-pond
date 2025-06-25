import Form from "@/components/atoms/form";
import Label from "@/components/atoms/label";
import { Textarea } from "@/components/ui/textarea";
import { createMemory, uploadFile } from "@/lib/firebase";
import PostValidationSchema from "@/schema/post-validation-schema";
import { categoryOptions, CreatedMemory, MemoryCategory } from "@/shared/types";
import { FieldArray, Formik } from "formik";
import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "src/components/ui/button";

// Do some hacky loader magic to get the next/image component to like the blob url
function imageLoader({ src }: ImageLoaderProps) {
	return src;
}

const UploadForm = () => {
	const router = useRouter();
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
					router.push("/");
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

					<Label htmlFor="description">
						<Textarea
							onChange={(e) => {
								values.description = e.target.value;
							}}
							placeholder="Say a little something (if you want)"
						/>
						{errors.description && (
							<p className="text-muted-foreground">{errors.description}</p>
						)}
					</Label>

					<FieldArray
						name="categories"
						render={(arrayHelpers) => (
							<div className="flex flex-col gap-1">
								<h2 className="text-lg font-bold my-2">Categories</h2>
								<p className="text-muted-foreground">Select any that apply</p>

								{categoryOptions.map(
									(category) =>
										category.value !== "other" && (
											<label
												key={category.value}
												htmlFor={category.value}
												className="flex gap-1"
											>
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
							</div>
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

						<Button type="button" onClick={() => router.push("/")}>
							Cancel
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UploadForm;
