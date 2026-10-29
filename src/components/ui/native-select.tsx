import * as React from "react";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
	return (
		<div
			className={cn(
				"group/native-select relative w-full min-w-20 max-w-62 rounded-[0.25em] shadow-[0_0_10px_rgba(0,0,0,0.15)]",
				className
			)}
			data-slot="native-select-wrapper"
		>
			<select
				data-slot="native-select"
				className="w-full min-w-0 cursor-pointer appearance-none bg-transparent px-[0.8rem] py-2 leading-[1.1] outline-none"
				{...props}
			/>
			<ChevronDownIcon
				className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-[#777] select-none"
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	);
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
	return <option data-slot="native-select-option" {...props} />;
}

export { NativeSelect, NativeSelectOption };
