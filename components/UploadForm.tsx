import { FormikProps, withFormik } from "formik";
import React from "react";
import { Post } from "../shared/types";
import PostValidationSchema from "../schema/PostValidationSchema";
import { errorIn } from "../shared/utils/helpers";
import Button from "../shared/components/Button";
import ButtonGroup from "../shared/components/ButtonGroup";
import Form from "../shared/components/forms/Form";
import Input from "../shared/components/forms/Input";
import Label from "../shared/components/forms/Label";
import Select from "../shared/components/forms/Select";
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
				<span>Description</span>
				<Subheading>
					The official description from the{" "}
					<a href="/price-guide-3-21.pdf">Price Guide</a>.
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
			<Label htmlFor="rate_type">
				<span>Rate Type</span>
				<Subheading>This will almost always be per hour.</Subheading>
				<Select name="rate_type" error={errorIn(errors, touched, "rate_type")}>
					<option value="" disabled>
						Select...
					</option>
					<option value="hr">per hour</option>
					<option value="km">per km</option>
				</Select>
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
