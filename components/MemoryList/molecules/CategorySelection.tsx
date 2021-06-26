import Select from "@Components/forms/Select";
import { categoryOptions, MemoryCategoryExtended } from "@Shared/types";
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
	<Select handleChange={handleChange}>
		{extendedCategoryOptions.map((category) => (
			<option key={category.value} value={category.value}>
				{category.label}
			</option>
		))}
	</Select>
);

export default CategorySelection;
