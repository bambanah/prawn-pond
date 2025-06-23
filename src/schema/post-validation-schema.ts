import { MemoryCategory } from "@shared/types";
import * as yup from "yup";

const memoryCategories = [
	"photography_and_nature",
	"playful_sean",
	"stories",
	"young_sean",
	"other",
] satisfies MemoryCategory[];

const PostValidationSchema = yup.object().shape({
	description: yup.string(),
	categories: yup.array().of(yup.string().oneOf(memoryCategories)).required(),
});

export default PostValidationSchema;
