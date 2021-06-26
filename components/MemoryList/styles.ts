import Masonry from "react-masonry-css";
import styled from "styled-components";

export const MemoryListContainer = styled.div`
	padding: 0rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	path {
		color: ${({ theme }) => theme.colors.fg};
	}

	h1 {
		font-family: "Taviraj";
		font-size: 3rem;
		text-align: center;
	}
`;

export const StyledMasonry = styled(Masonry)`
	display: flex;
	width: auto;
	max-width: 1500px;
	padding: 0;
	margin-top: 2em;
	min-height: 400px;

	.masonry-grid-column {
		background-clip: padding-box;
		margin-right: 1em;
		margin-left: 1em;
	}

	@media screen and (max-width: 750px) {
		margin-left: 0;
		padding: 0;

		.masonry-grid-column {
			padding: 0;
			margin: 0;
		}
	}
`;

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	p,
	a {
		font-size: 12px;
	}
`;

export const MemoryLink = styled.a`
	margin: 2rem 0;
`;

export const ListHeader = styled.div`
	width: 100%;
	max-width: 1500px;
	padding: 0 2em;
	display: flex;
	justify-content: space-between;
	gap: 1em;
	margin-top: 1em;

	@media screen and (max-width: 750px) {
		padding: 0 1em;
	}
`;

export const TableViewSelectContainer = styled.div`
	display: flex;
	gap: 2em;

	svg {
		cursor: pointer;

		&:hover {
			* {
				color: black;
			}
		}
	}

	@media screen and (max-width: 750px) {
		gap: 1em;
	}
`;
