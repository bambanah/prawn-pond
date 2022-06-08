import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Card = styled.div`
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&.grid {
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;

		> div {
			position: absolute;
			top: 0;
			bottom: 0;
		}
	}

	&.feed {
		display: flex;
		align-content: stretch;
		align-items: stretch;
		flex-direction: column;
		justify-content: center;

		.media-container {
			position: relative;
			overflow: hidden;
			display: block;

			height: 0;
			padding-bottom: 120%;
		}
	}

	cursor: pointer;
	border-radius: 2px;

	transition: all 0.2s;
	box-shadow: var(--shadow-low);

	&:hover {
		.video-icon {
			transform: scale(1.05);
		}
	}

	@media screen and (min-width: 750px) {
		&:hover {
			box-shadow: var(--shadow-high);
		}
	}

	@media screen and (max-width: 750px) {
		width: 100%;
	}
`;

export const ImageContainer = styled.div`
	flex: 1 0 auto;

	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	span {
		z-index: 1;
		position: absolute;
		width: 0;
		height: 0;
		min-width: 100%;
		max-width: 100%;
		min-height: 100%;
		max-height: 100%;
		display: block;
		box-sizing: border-box;
		object-fit: cover;
		inset: 0;
	}

	img,
	video {
		z-index: 10;
		object-fit: cover;
		width: 0;
		height: 0;
		min-width: 100%;
		max-width: 100%;
		min-height: 100%;
		max-height: 100%;
	}

	svg {
		position: absolute;
		z-index: 10;
		right: 10px;
		bottom: 10px;

		&.video-icon {
			position: absolute;
			margin: auto;
			inset: 0;

			filter: drop-shadow(5px 5px 6px rgb(0 0 0 / 0.5));
			transition: all 0.1s;
		}

		path {
			color: ${({ theme }) => theme.colors.bg};
		}
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex: 1;

	justify-content: center;
	align-items: center;

	padding: 2rem 1.2rem;
	width: 100%;
	z-index: 10;
	background-color: ${(props) => props.theme.colors.bg};

	white-space: pre-line;
	line-height: 1.3rem;

	&.text-only {
		min-height: 200px;
		max-height: 100%;
	}
`;

export const FullscreenContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	max-height: 100vh;
	max-width: 100vw;
	z-index: 100;

	background: rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const FullscreenContent = styled.div`
	position: relative;
	max-width: 800px;
	max-height: 100vh;
	overflow-y: auto;
`;

export const FullscreenImage = styled.div`
	flex: 1;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	position: relative;
	min-width: 10rem;
	max-height: 85vh;
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
	background-color: ${({ theme }) => theme.colors.bg};
	padding: 2rem;
	padding-bottom: 5rem;

	white-space: pre-line;
	line-height: 1.4rem;

	&.story {
		font-size: 1.1rem;
		padding: 4rem;
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
	z-index: 1000;
	top: 0.5rem;
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
