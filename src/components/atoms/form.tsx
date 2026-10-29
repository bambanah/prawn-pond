import { ComponentProps } from "react";

const Form = (props: ComponentProps<"form">) => (
	<form
		className="flex flex-col flex-wrap gap-4 [&_[data-slot=button]]:mt-4"
		{...props}
	/>
);

export default Form;
