import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSpinner,
	faArrowLeft,
	faCaretLeft,
	faTimes,
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
		faCaretLeft,
		faTimes
	);
};

export const errorIn = (
	errors: FormikErrors<any>,
	touched: FormikTouched<any>,
	value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);

export const toDataUrl = (url: string): Promise<string | ArrayBuffer | null> =>
	fetch(url)
		.then((response) => response.blob())
		.then(
			(blob) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				})
		);
