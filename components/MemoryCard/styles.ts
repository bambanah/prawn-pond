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

	img {
		position: relative !important;
		height: auto !important;
		width: 100% !important;
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
	z-index: 10;

	background: rgba(0, 0, 0, 0.3);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const FullscreenImage = styled.div`
	width: 70%;
	height: 80%;
	padding: 2rem 4rem;
	flex: 1;
	box-sizing: border-box;
	display: flex;
	justify-content: center;

	img {
		display: block;
		max-width: 100%;
		max-height: 100%;

		object-fit: contain;
	}
`;

export const FullscreenCaption = styled.div`
	margin-bottom: 1em;
	background-color: white;
	width: 80%;
	padding: 0.5em;
	height: 20%;
	overflow-y: auto;
	border: 10px solid;
	border-image: ${(props) => props.theme.colors.accentGradient} 1;
`;

export const IconButton = styled.div`
	cursor: pointer;
	path {
		color: ${({ theme }) => theme.colors.bg};
	}
	&:hover {
		path {
			color: ${({ theme }) => theme.colors.link};
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
`;

export const RightArrowContainer = styled(IconButton)`
	position: absolute;
	right: 1rem;
`;

export const AlbumIndexContainer = styled.div`
	position: absolute;
	left: 1rem;
	top: 0.5rem;
`;

export const AlbumIndexText = styled.h2`
	color: white;
	margin: 0px;
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
