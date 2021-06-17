import { Formik } from "formik";
import Image, { ImageLoaderProps } from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@Components/Button";
import ButtonGroup from "@Components/ButtonGroup";
import Subheading from "@Components/text/Subheading";
import { createMemory } from "@Utils/firebase";
import PostValidationSchema from "@Schema/PostValidationSchema";
import Form from "@Components/forms/Form";
import Input from "@Components/forms/Input";
import Label from "@Components/forms/Label";
import {
  DropZoneContainer,
  ImageContainer,
  ImagePreviewContainer
} from "./UploadForm.styles";

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
        description: ""
      }}
      onSubmit={async (values) => {
        await createMemory(values).then(() => {
          Router.push("/");
        });
      }}
      validationSchema={PostValidationSchema}
      validateOnMount={false}
      validateOnChange
      validateOnBlur
    >
      {({ handleSubmit, errors, isValid }) => (
        <Form flexDirection="column">
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
              name="description"
              id="description"
              error={errors.description}
            />
            {errors.description && (
              <Subheading>{errors.description}</Subheading>
            )}
          </Label>

          <ButtonGroup>
            <Button
              type="button"
              primary
              onClick={() => isValid && handleSubmit()}
            >
              Upload
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
