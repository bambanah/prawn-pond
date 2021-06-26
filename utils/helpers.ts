import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSpinner,
	faArrowLeft,
	faCaretLeft,
	faChevronDown,
	faTimes,
	faArrowRight,
	faThLarge,
	faStream,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

export const importIcons = () => {
	library.add(
		faSpinner,
		faGoogle,
		faFacebookF,
		faArrowLeft,
		faArrowRight,
		faCaretLeft,
		faTimes,
		faImages,
		faChevronDown,
		faThLarge,
		faStream
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
