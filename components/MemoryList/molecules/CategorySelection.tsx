import { categoryOptions, MemoryCategoryExtended } from "@Shared/types";
import React from "react";
import { CategorySelectionContainer } from "../styles";

interface CategorySelectionProps {
  selected: MemoryCategoryExtended;
  onChange: (category: MemoryCategoryExtended) => void;
}

const extendedCategoryOptions = [
  {
    label: "All",
    value: "all"
  },
  ...categoryOptions
];

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selected,
  onChange
}) => (
  <CategorySelectionContainer>
    {extendedCategoryOptions.map((category) => (
      <button
        className={selected === category.value ? "selected" : "not-selected"}
        type="button"
        onClick={() => onChange(category.value as MemoryCategoryExtended)}
      >
        <p>{category.label}</p>
      </button>
    ))}
  </CategorySelectionContainer>
);

export default CategorySelection;
