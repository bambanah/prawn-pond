import { Form as FormikForm } from "formik";
import styled from "styled-components";

const Form = styled(FormikForm)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	gap: 1rem;

	button {
		margin-top: 1rem;
	}
`;

export default Form;
