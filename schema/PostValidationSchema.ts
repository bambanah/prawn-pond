import { MemoryCategory } from "@Shared/types";
import * as yup from "yup";

const memoryCategories: MemoryCategory[] = [
	"photography_and_nature",
	"playful_sean",
	"stories",
	"young_sean",
	"other",
];

const PostValidationSchema = yup.object().shape({
	description: yup.string(),
	category: yup.string().oneOf(memoryCategories).required(),
});

export default PostValidationSchema;
