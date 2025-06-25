import { ComponentProps } from "react";

interface LabelProps extends ComponentProps<"label"> {
	required?: boolean;
}

const Label = ({ required, children, ...rest }: LabelProps) => (
	<label className="flex flex-col shrink-0 gap-2" {...rest}>
		{children}
		{required && <span className="text-red-500">*</span>}
	</label>
);

export default Label;
