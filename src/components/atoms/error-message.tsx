import React from "react";

const ErrorMessage = ({ error }: { error: string | undefined }) => {
	if (error) {
		return <p className="m-0 text-[0.8rem] text-[#f74444]">{error}</p>;
	}

	return null;
};

export default ErrorMessage;
