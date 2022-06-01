import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Card = styled.div`
	width: 100%;
	min-width: fit-content;
	display: flex;
	flex-direction: column;
	box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.6);
	margin-bottom: 2rem;
	cursor: pointer;
	border-radius: 2px;
	overflow: hidden;

	&:hover {
		box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.8);
	}

	@media screen and (max-width: 750px) {
		border-radius: 0;
		margin-bottom: 4rem;
	}
`;

export const ImageContainer = styled.div`
	flex: 0 0 auto;
	width: 100%;

	div {
		position: relative !important;
		top: 0px;
	}

	img,
	span {
		position: relative !important;
		height: auto !important;
		width: 100% !important;
		filter: none !important;
	}

	svg {
		position: absolute;
		right: 10px;
		bottom: 10px;

		path {
			color: ${({ theme }) => theme.colors.bg};
		}
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex: 1;
	padding: 2rem 1.2rem;
`;

export const FullscreenContainer = styled.div`
	position: fixed;
	top: 5rem;
	left: 0;
	width: 100%;
	height: calc(100% - 5rem);
	max-height: 100vh;
	z-index: 10;

	background: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const FullscreenContent = styled.div`
	position: relative;
	max-width: 800px;
`;

export const FullscreenImage = styled.div`
	flex: 1;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	position: relative;
	max-height: 80vh;
	background: #111;

	img {
		display: block;
		max-width: 100%;
		max-height: 100%;

		object-fit: contain;
	}
`;

export const FullscreenCaption = styled.div`
	display: flex;
	align-items: center;
	background-color: white;
	padding: 2rem;

	&.story {
		font-size: 1.2rem;
		padding: 8rem;
	}
`;

export const IconButton = styled.div`
	cursor: pointer;
	path {
		color: ${({ theme }) => theme.colors.bg};
	}

	&:hover {
		path {
			color: #dddddd;
		}
	}
`;

export const CloseFullscreenButton = styled(IconButton)`
	position: fixed;
	top: 5.5rem;
	right: 1rem;
`;

export const LeftArrowContainer = styled(IconButton)`
	position: absolute;
	left: 1rem;
	top: 50%;
`;

export const RightArrowContainer = styled(IconButton)`
	position: absolute;
	right: 1rem;
	top: 50%;
`;

export const AlbumIndexContainer = styled.div`
	position: absolute;
	left: 1rem;
	top: 0.5rem;
	z-index: 1;

	h2 {
		margin: 0;
		font-size: 1rem;
	}
`;

export const LoadingContainer = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	path {
		color: ${({ theme }) => theme.colors.bg};
	}
`;

export const AlbumIcon = styled(FontAwesomeIcon)`
	width: auto;
	color: ${({ theme }) => theme.colors.bg};
`;
