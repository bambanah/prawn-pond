import React from "react";

interface ErrorProps {
	error: string | undefined;
	touched: boolean | undefined;
}

const ErrorMessage = ({ error, touched }: ErrorProps) => {
	if (error && touched) {
		return <p className="m-0 text-[0.8rem] text-[#f74444]">{error}</p>;
	}

	return null;
};

export default ErrorMessage;
