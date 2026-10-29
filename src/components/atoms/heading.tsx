import { ComponentProps } from "react";

const Heading = (props: ComponentProps<"h2">) => (
	<h2 className="flex-[1_1_100%] text-[1.3rem] font-bold" {...props} />
);

export default Heading;
