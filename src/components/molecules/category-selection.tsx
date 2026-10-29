import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select";
import { categoryOptions, MemoryCategoryExtended } from "@shared/types";
import React from "react";

interface CategorySelectionProps {
	handleChange: (category: MemoryCategoryExtended) => void;
}

const extendedCategoryOptions = [
	{
		label: "All Categories",
		value: "all",
	},
	...categoryOptions,
];

const CategorySelection: React.FC<CategorySelectionProps> = ({
	handleChange,
}) => (
	<NativeSelect
		onChange={(e) => handleChange(e.target.value as MemoryCategoryExtended)}
	>
		{extendedCategoryOptions.map((category) => (
			<NativeSelectOption key={category.value} value={category.value}>
				{category.label}
			</NativeSelectOption>
		))}
	</NativeSelect>
);

export default CategorySelection;
