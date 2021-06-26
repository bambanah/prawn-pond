import { Formik } from "formik";
import Image, { ImageLoaderProps } from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@Components/Button";
import ButtonGroup from "@Components/ButtonGroup";
import Subheading from "@Components/text/Subheading";
import { createMemory, uploadFile } from "@Utils/firebase";
import PostValidationSchema from "@Schema/PostValidationSchema";
import Form from "@Components/forms/Form";
import Input from "@Components/forms/Input";
import Label from "@Components/forms/Label";
import { categoryOptions, Memory, MemoryCategory } from "@Shared/types";
import { toast } from "react-toastify";
import RadioButtonGroup from "@Components/RadioButtonGroup";
import {
  DropZoneContainer,
  ImageContainer,
  ImagePreviewContainer
} from "./styles";

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
    onDrop
  });

  return (
    <Formik
      initialValues={{
        description: "",
        category: "photography_and_nature"
      }}
      onSubmit={async (values) => {
        try {
          // Upload all images to firebase
          const fileNames = await Promise.all(
            images.map(async (image) => uploadFile(image))
          );

          // Attach filenames to Memory object
          const newMemory: Memory = {
            ...values,
            category: values.category as MemoryCategory,
            images: fileNames
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
      {({ handleSubmit, errors, isValid, isSubmitting }) => (
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
            {images &&
              images.map((image) => (
                <ImageContainer key={image.lastModified}>
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
            <Input
              type="text"
              name="description"
              id="description"
              error={errors.description}
              placeholder="Say a little something (if you want)"
            />
            {errors.description && (
              <Subheading>{errors.description}</Subheading>
            )}
          </Label>

          <RadioButtonGroup label="Category" options={categoryOptions} />

          <ButtonGroup>
            <Button
              type="button"
              primary
              onClick={() => isValid && handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading" : "Upload"}
            </Button>
            <Button type="button" onClick={() => Router.push("/")}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
