import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
	margin-top: 2rem;
	width: 100%;
	border: 0px;
`;

interface Props {
	children: React.ReactNode;
}

const Table: React.FC<Props> = ({ children }) => (
	<StyledTable>{children}</StyledTable>
);

export default Table;
