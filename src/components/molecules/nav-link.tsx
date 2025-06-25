import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
	href: string;
	children: React.ReactNode;
}

interface StyleProps {
	active: boolean;
}

const StyledLink = styled.a<StyleProps>`
	font-family: "Inter";
	text-decoration: none;
	margin: 0 0.7rem;
	font-weight: ${({ active }) => (active ? "bold" : "500")};
	padding: 0 0.2rem;
`;

const Link = ({ href, children }: Props) => {
	const router = useRouter();

	return (
		<NextLink href={href} legacyBehavior>
			<StyledLink active={router.pathname === href}>{children}</StyledLink>
		</NextLink>
	);
};

export default Link;
