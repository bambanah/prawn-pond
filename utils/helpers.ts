import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faCheck,
	faCopy,
	faEdit,
	faFileDownload,
	faTimes,
	faTrash,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export const importIcons = () => {
	library.add(
		faEdit,
		faTimes,
		faCheck,
		faTrash,
		faCopy,
		faFileDownload,
		faSpinner
	);
};

export const errorIn = (
	errors: FormikErrors<any>,
	touched: FormikTouched<any>,
	value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);
