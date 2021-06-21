import { FormikErrors, FormikTouched, getIn } from "formik";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faArrowLeft,
  faCaretLeft,
  faTimes,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

export const importIcons = () => {
  library.add(
    faSpinner,
    faGoogle,
    faFacebook,
    faFacebookF,
    faArrowLeft,
    faArrowRight,
    faCaretLeft,
    faTimes,
    faImages
  );
};

export const errorIn = (
  errors: FormikErrors<any>,
  touched: FormikTouched<any>,
  value: string
) => getIn(errors, value) !== undefined && getIn(touched, value);
