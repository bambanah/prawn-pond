import React from "react";
import styled from "styled-components";

interface ErrorProps {
	error: string | undefined;
	touched: boolean | undefined;
}

const Message = styled.p`
	color: #f74444;
	font-size: 0.8rem;
	margin: 0;
`;

const ErrorMessage = ({ error, touched }: ErrorProps) => {
	if (error && touched) {
		return <Message>{error}</Message>;
	}

	return null;
};

export default ErrorMessage;
