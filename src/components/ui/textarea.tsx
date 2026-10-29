import * as React from "react";
import { cn } from "cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"w-full rounded-[3px] border border-transparent px-[0.8rem] py-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] outline-none placeholder:text-muted-foreground aria-invalid:border-destructive",
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
