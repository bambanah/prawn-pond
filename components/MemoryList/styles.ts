import Masonry from "react-masonry-css";
import styled from "styled-components";

export const MemoryListContainer = styled.div`
	padding: 0rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	h1 {
		font-family: "Taviraj";
		font-size: 3rem;
		text-align: center;
		margin-top: 5rem;
		margin-bottom: 0;
	}
`;

export const StyledMasonry = styled(Masonry)`
	display: flex;
	width: auto;
	max-width: 1500px;
	padding: 0;
	margin-top: 2em;
	margin-bottom: 5rem;
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
	flex: 0 0 11.8rem;
	padding: 0.5rem 1.5rem;
	margin-left: auto;

	border: 2px solid;
	border-radius: 2px;

	color: ${({ theme }) => theme.colors.fg};
	font-weight: bold;
	font-size: 1.2rem;

	transition-duration: 0.1s;

	box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);

	&:hover {
		color: ${({ theme }) => theme.colors.link};
		border-color: ${({ theme }) => theme.colors.link};
	}

	&:active {
		box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
	}
`;

export const ListHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: 1500px;
	padding: 0 2em;
	gap: 2rem;

	select {
		font-size: 1.1rem;
	}

	> div {
		box-sizing: border-box;
	}

	@media screen and (max-width: 750px) {
		padding: 0 1em;
	}
`;

export const TableViewSelectContainer = styled.div`
	display: flex;
	gap: 2em;
	justify-content: right;

	svg {
		cursor: pointer;

		&:hover {
			* {
				color: black;
			}
		}
	}

	@media screen and (max-width: 900px) {
		display: none;
	}
`;
