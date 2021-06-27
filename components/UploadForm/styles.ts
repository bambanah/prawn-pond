import styled from "styled-components";

export const ImagePreviewContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
	flex: 0 0 10%;
	width: 200px;
	height: 100px;
	position: relative;
	margin: 0.5em;
`;

export const DropZoneContainer = styled.div`
	height: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	border: 4px solid ${(props) => props.theme.colors.fg};
	background-image: none;
	min-width: 480px;
	cursor: pointer;
	border-radius: 5px;

	&:hover {
		border-color: ${(props) => props.theme.colors.link};

		p {
			color: ${(props) => props.theme.colors.link};
		}
	}
`;

export const Categories = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	h2 {
		margin: 0.5rem 0;
	}
`;
