import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categoryOptions, MemoryCategoryExtended } from "@/shared/types";

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

const CategorySelection = ({ handleChange }: CategorySelectionProps) => (
	<Select onValueChange={handleChange} defaultValue="all">
		<SelectTrigger>
			<SelectValue placeholder="Category" />
		</SelectTrigger>
		<SelectContent>
			{extendedCategoryOptions.map((category) => (
				<SelectItem key={category.value} value={category.value}>
					{category.label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

export default CategorySelection;
