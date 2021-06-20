import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSpinner,
	faArrowLeft,
	faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
	faGoogle,
	faFacebook,
	faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

export const importIcons = () => {
	library.add(
		faSpinner,
		faGoogle,
		faFacebook,
		faFacebookF,
		faArrowLeft,
		faCaretLeft
	);
};

export const errorIn = (
	errors: FormikErrors<any>,
	touched: FormikTouched<any>,
	value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);
