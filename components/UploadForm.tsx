import { FormikProps, withFormik } from "formik";
import Image, { ImageLoaderProps } from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import PostValidationSchema from "../schema/PostValidationSchema";
import Button from "../shared/components/Button";
import ButtonGroup from "../shared/components/ButtonGroup";
import Form from "../shared/components/forms/Form";
import Input from "../shared/components/forms/Input";
import Label from "../shared/components/forms/Label";
import Subheading from "../shared/components/text/Subheading";
import { Memory } from "../shared/types";
import { createMemory } from "../shared/utils/firebase";
import { errorIn } from "../shared/utils/helpers";

const ImagePreviewContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`;

const ImageContainer = styled.div`
	flex: 0 0 10%;
	width: 200px;
	height: 100px;
	position: relative;
`;

const UploadForm = () => {
	const BaseUploadForm = ({
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
	}: FormikProps<Memory>) => {
		const [images, setImages] = useState<File[]>([]);

		const addImages = (acceptedFiles: File[]) => {
			console.log(images);
			console.log(acceptedFiles);
			setImages([...images, ...acceptedFiles]);
		};

		// Set up image dropzone
		const onDrop = (acceptedFiles: File[]) => {
			addImages(acceptedFiles);
		};

		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop,
		});

		// Do some hacky loader magic to get the next/image component to like the blob url
		function imageLoader({ src }: ImageLoaderProps) {
			return src;
		}

		return (
			<Form onSubmit={handleSubmit} flexDirection="column">
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>Drag and drop some files here, or click to select files</p>
					)}
				</div>
				<ImagePreviewContainer>
					{images &&
						images.map((image) => (
							<ImageContainer>
								<Image
									loader={imageLoader}
									key={image.name}
									src={URL.createObjectURL(image)}
									alt="preview"
									layout="fill"
									objectFit="contain"
								/>
							</ImageContainer>
						))}
				</ImagePreviewContainer>
				<Label htmlFor="description">
					<Subheading>
						Say a little something about Sean (if you want)
					</Subheading>
					<Input
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.description}
						name="description"
						id="description"
						error={errorIn(errors, touched, "description")}
					/>
				</Label>

				<ButtonGroup>
					<Button type="submit" primary>
						Upload
					</Button>
					<Button type="button" onClick={() => Router.push("/")}>
						Cancel
					</Button>
				</ButtonGroup>
			</Form>
		);
	};

	const FormikForm = withFormik({
		mapPropsToValues: () => ({ description: "" }),
		handleSubmit: (values) => {
			createMemory(values).then(() => {
				Router.push("/");
			});
		},
		validationSchema: PostValidationSchema,
		validateOnChange: true,
		validateOnMount: false,
		validateOnBlur: true,
		displayName: "Activity Form",
	})(BaseUploadForm);

	return <FormikForm />;
};

export default UploadForm;
