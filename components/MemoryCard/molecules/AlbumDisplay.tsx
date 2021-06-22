import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
	FullscreenContainer,
	CloseFullscreenButton,
	FullscreenImage,
	FullscreenCaption,
	LeftArrowContainer,
	RightArrowContainer,
	AlbumIndexContainer,
	LoadingContainer,
} from "../styles";

interface AlbumDisplayProps {
	description: string;
	show: boolean;
	imageUrls: string[];
	onClose: () => void;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
	description,
	show,
	imageUrls,
	onClose,
}) => {
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	const handleLeftClick = () => {
		if (index > 0) {
			setLoading(true);
			setIndex((i) => i - 1);
		}
	};

	const handleRightClick = () => {
		if (index + 1 < imageUrls.length) {
			setLoading(true);
			setIndex((i) => i + 1);
		}
	};

	const handleOnLoad = () => {
		setLoading(false);
	};

	const handleOnLoadStart = () => {
		setLoading(true);
	};

	return show ? (
		<FullscreenContainer>
			{index > 0 && (
				<LeftArrowContainer onClick={handleLeftClick}>
					<FontAwesomeIcon icon="arrow-left" size="3x" />
				</LeftArrowContainer>
			)}

			{index < imageUrls.length - 1 && (
				<RightArrowContainer onClick={handleRightClick}>
					<FontAwesomeIcon icon="arrow-right" size="3x" />
				</RightArrowContainer>
			)}

			<CloseFullscreenButton onClick={onClose}>
				<FontAwesomeIcon icon="times" size="3x" />
			</CloseFullscreenButton>

			{loading && (
				<LoadingContainer>
					<FontAwesomeIcon
						icon="spinner"
						size="3x"
						className="spinner"
						fill="white"
					/>
				</LoadingContainer>
			)}

			<AlbumIndexContainer>
				<h2 style={{ color: "white" }}>
					{index + 1}/{imageUrls.length}
				</h2>
			</AlbumIndexContainer>

			<FullscreenImage>
				<img
					src={imageUrls[index]}
					alt="memory"
					onLoad={handleOnLoad}
					onLoadStart={handleOnLoadStart}
					onError={handleOnLoad}
				/>
			</FullscreenImage>

			{description.length > 0 && (
				<FullscreenCaption>{description}</FullscreenCaption>
			)}
		</FullscreenContainer>
	) : (
		<></>
	);
};

export default AlbumDisplay;
