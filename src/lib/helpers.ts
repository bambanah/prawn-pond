import { FormikErrors, FormikTouched, getIn } from "formik";

export const errorIn = (
	errors: FormikErrors<any>,
	touched: FormikTouched<any>,
	value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);

export const toDataUrl = async (url: string): Promise<string | null> => {
	const response = await fetch(url);
	const blob = await response.blob();
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
