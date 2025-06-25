import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const InputGroup = ({ className, ...rest }: ComponentProps<"div">) => (
	<div {...rest} className={cn("flex gap-4 flex-wrap flex-1", className)} />
);

export default InputGroup;
