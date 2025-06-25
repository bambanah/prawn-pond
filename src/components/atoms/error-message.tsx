interface ErrorProps {
	error: string | undefined;
	touched: boolean | undefined;
}

const ErrorMessage = ({ error, touched }: ErrorProps) => {
	if (error && touched) {
		return <p className="text-red-500 text-sm m-0">{error}</p>;
	}

	return null;
};

export default ErrorMessage;
