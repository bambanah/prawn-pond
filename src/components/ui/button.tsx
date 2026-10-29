import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center rounded-[4px] border text-base whitespace-nowrap text-fg transition-all duration-50 outline-none select-none disabled:cursor-progress disabled:bg-[grey] disabled:hover:bg-[grey] [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border-[#dbdbdb] bg-white hover:border-[#cbcbcb] hover:bg-[#f0f0f0]",
				primary:
					"border-transparent bg-accent-gradient hover:bg-accent-gradient-transparent",
			},
			size: {
				default: "h-10 px-4 py-[calc(0.5em-1px)]",
				icon: "size-12 rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
