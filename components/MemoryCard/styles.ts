import styled from "styled-components";

export const Card = styled.div`
	width: 100%;
	display: inline-flex;
	flex-direction: column;
	box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.6);
	margin-bottom: 2rem;
	cursor: pointer;
	border-radius: 5px;
	overflow: hidden;

	@media screen and (max-width: 750px) {
		border-radius: 0;
	}
`;

export const ImageContainer = styled.div`
	flex: 0 0 auto;
	width: 100%;

	div {
		position: relative !important;
	}

	img {
		position: relative !important;
		height: auto !important;
		width: 100% !important;
	}
`;

export const TextContainer = styled.div`
	flex: 0 0 auto;
	padding: 1rem;
`;

export const FullscreenContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;

	background: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const FullscreenImage = styled.div`
	width: 100%;
	max-height: 70%;
	padding: 4rem;
	flex: 1 0 80%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;

	img {
		display: block;
		max-width: 100%;
		max-height: 100%;

		object-fit: contain;
		background-color: white;
	}
`;

export const FullscreenCaption = styled.div`
	flex: 0 1 20%;
	background-color: white;
`;

export const CloseFullscreenButton = styled.div`
	position: fixed;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	padding: 0 0.5rem;

	path {
		color: ${({ theme }) => theme.colors.bg};
	}
	&:hover {
		path {
			color: ${({ theme }) => theme.colors.link};
		}
	}
`;
