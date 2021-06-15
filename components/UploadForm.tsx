import { FormikProps, withFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { Post } from "../shared/types";
import PostValidationSchema from "../schema/PostValidationSchema";
import { errorIn } from "../shared/utils/helpers";
import Button from "../shared/components/Button";
import ButtonGroup from "../shared/components/ButtonGroup";
import Form from "../shared/components/forms/Form";
import Input from "../shared/components/forms/Input";
import Label from "../shared/components/forms/Label";
import Subheading from "../shared/components/text/Subheading";

const UploadForm = () => {
	const BaseUploadForm = ({
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
	}: FormikProps<Post>) => (
		<Form onSubmit={handleSubmit} flexDirection="column">
			<Label htmlFor="description">
				<Subheading>Say a little something about Sean (if you want)</Subheading>
				<Input
					type="textbox"
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
			</ButtonGroup>
		</Form>
	);

	const FormikForm = withFormik({
		mapPropsToValues: () => ({ description: "" }),
		handleSubmit: (values) => {
			toast.info("[Debug] Form submitted");
			console.log(values);
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
