import styled from "styled-components";

export const AnnouncementContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

export const Content = styled.div`
	max-width: 1100px;
	display: flex;
	flex-wrap: wrap;

	&.reverse {
		flex-direction: row-reverse;
		h1 {
			text-align: center;
		}
	}

	&.column {
		flex-direction: column;
		color: ${({ theme }) => theme.colors.fg};
	}

	@media screen and (max-width: 940px) {
		flex-direction: column;
	}

	h1 {
		flex: 1 0 50%;
		font-size: 3rem;
		font-family: "Taviraj";
		margin: 0;

		@media screen and (max-width: 940px) {
			font-size: 2rem;
		}
	}
`;

export const Announcement = styled.div`
	display: flex;
	justify-content: center;
	padding: 10rem 0rem;
	align-items: center;
	background-color: #ffebe7;
	width: 100%;

	&.reverse {
		background-color: #ebfcf6;
	}

	&.column {
		background-color: white;
	}
`;

export const CharityTiles = styled.div`
	flex: 1 0 50%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	column-gap: 2rem;
	row-gap: 1rem;
	padding: 1rem 0;

	a > div {
		border-radius: 10px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
		padding: 1rem;

		transition: box-shadow 0.15s ease;
		background-color: white;

		&:hover {
			box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
		}
	}
`;

export const FuneralInfo = styled.div`
	display: flex;
`;
