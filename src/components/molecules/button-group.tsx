import { ComponentProps } from "react";

const ButtonGroup = (props: ComponentProps<"div">) => (
	<div className="flex flex-row justify-center gap-6" {...props} />
);

export default ButtonGroup;
