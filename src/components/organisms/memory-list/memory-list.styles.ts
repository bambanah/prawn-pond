import styled from "styled-components";

export const MemoryListContainer = styled.div`
	padding: 0rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 50rem;

	@media screen and (min-width: 900px) {
		&.grid {
			max-width: 75rem;
		}
	}

	h1 {
		font-family: ${({ theme }) => theme.fonts.display};
		font-size: 3rem;
		text-align: center;
		margin-top: 5rem;
		margin-bottom: 0;
	}
`;

export const ListContent = styled.div`
	width: 100%;
	min-height: 400px;
	max-width: 35rem;

	padding: 0;
	margin-top: 2em;
	margin-bottom: 5rem;

	display: flex;
	flex-direction: column;
	justify-content: center;

	gap: 1rem;
	column-gap: 3rem;

	@media screen and (max-width: 650px) {
		max-width: 100%;
	}

	@media screen and (min-width: 900px) {
		&.grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, 300px);

			max-width: 100%;
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
	flex: 0 0 11rem;
	padding: 0.5rem 1.5rem;
	margin-left: auto;
	text-align: center;

	border: 1px solid;
	border-radius: 2px;

	color: ${({ theme }) => theme.colors.fg};
	font-size: 1.1rem;

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
	padding: 0 2em;
	gap: 2rem;
	margin-top: 2rem;

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
