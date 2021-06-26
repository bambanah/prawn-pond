import styled from "styled-components";

export const AnnouncementContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	@media screen and (max-width: 750px) {
		> div:first-of-type {
			padding-top: 12rem;
		}
	}
`;

interface AnnouncementProps {
	backgroundColor?: string;
	flexDir?: string;
}

export const Announcement = styled.div<AnnouncementProps>`
	display: flex;
	justify-content: center;
	padding: 10rem 1rem;
	align-items: center;
	background-color: ${(props) => props.backgroundColor};

	color: ${({ theme }) => theme.colors.fg};
	width: 100%;

	> div {
		max-width: 1100px;

		display: flex;
		flex-direction: ${(props) => props.flexDir};
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		@media screen and (max-width: 960px) {
			flex-direction: column;
		}

		h1 {
			flex: 1 0 50%;
			font-size: 3rem;
			font-family: "Taviraj";
			margin: 0;

			@media screen and (min-width: 961px) {
				text-align: ${({ flexDir }) =>
					flexDir === "row-reverse" || flexDir === "column"
						? "center"
						: "left"};
			}

			@media screen and (max-width: 960px) {
				font-size: 2rem;
				text-align: center;
			}
		}
	}
`;

Announcement.defaultProps = {
	backgroundColor: "white",
	flexDir: "row",
};

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
	flex-direction: column;

	p {
		margin-top: 0;
		margin-bottom: 0.5rem;

		text-align: center;
		color: #666;
	}

	h3 {
		margin-top: 1.5em;
		margin-bottom: 0.5rem;
	}
`;
