import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	primary?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
	font-family: "Inter";
	font-size: 1rem;
	height: 2.5em;
	background: ${(props) =>
		props.primary ? props.theme.colors.accentGradient : "white"};
	border: 1px solid #dbdbdb;
	border-radius: 4px;
	color: ${(props) =>
		props.primary ? props.theme.colors.fg : props.theme.colors.fg};
	cursor: pointer;
	padding-bottom: calc(0.5em - 1px);
	padding-left: 1em;
	padding-right: 1em;
	padding-top: calc(0.5em - 1px);
	display: inline-block;

	transition: all 0.05s ease;

	&:hover {
		background: ${({ primary, theme }) =>
			primary ? theme.colors.transparentAccent : "#f0f0f0"};
		border-color: #cbcbcb;
	}

	${({ primary, theme }) =>
		primary &&
		`
    border-color: transparent;

    &:hover {
      background-color: ${theme.colors.transparentAccent};
    }
  `}

	${({ disabled }) =>
		disabled &&
		`
    background: grey;
		cursor: progress;
    &:hover {
      background: grey;
    }
  `}
`;

const Button: FunctionComponent<ButtonProps> = ({
	children,
	onClick,
	disabled,
	type,
	...rest
}: ButtonProps) => {
	const handleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
		if (e) e.stopPropagation();

		if (!disabled && onClick) {
			onClick();
		}
	};

	return (
		<StyledButton
			onClick={handleClick}
			disabled={!!disabled}
			type={type || "button"}
			{...rest}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
