import styled from "styled-components";

export const Card = styled.div`
	width: 100%;
	display: inline-flex;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	margin-bottom: 1rem;
	cursor: pointer;
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

	svg {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 50;
		background: white;
    padding: 10px;
    border-radius: 100px;
		opacity: 0.75;

		* {
			color: #53b4cc;
		}
	}
	
	:hover {
		svg {
			opacity: 1;
		}
	}
`;

export const TextContainer = styled.div`
	flex: 0 0 auto;
	padding: 0.5rem;
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

export const AlbumIconContainer = styled.div`

`;
