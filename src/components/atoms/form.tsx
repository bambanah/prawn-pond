import { Form as FormikForm } from "formik";
import { ComponentProps } from "react";

const Form = (props: ComponentProps<typeof FormikForm>) => (
	<FormikForm
		className="flex flex-col flex-wrap gap-4 [&_[data-slot=button]]:mt-4"
		{...props}
	/>
);

export default Form;
