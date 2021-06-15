import * as yup from "yup";

const PostValidationSchema = yup.object().shape({
	description: yup.string().min(5, "Too short"),
});

export default PostValidationSchema;
