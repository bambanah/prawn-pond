import { Input as UiInput } from "@/components/ui/input";
import { Field } from "formik";
import { ComponentProps } from "react";

const Input = (props: ComponentProps<typeof UiInput> & { name: string }) => (
	<Field as={UiInput} {...props} />
);

export default Input;
