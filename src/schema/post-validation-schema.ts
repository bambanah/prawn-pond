import { MemoryCategory } from "@shared/types";
import { z } from "zod";

const PostValidationSchema = z.object({
	description: z.string(),
	categories: z.array(
		z.enum([
			"photography_and_nature",
			"playful_sean",
			"stories",
			"young_sean",
			"other",
		] satisfies MemoryCategory[])
	),
});

export default PostValidationSchema;
