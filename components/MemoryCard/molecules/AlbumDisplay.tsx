import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
	FullscreenContainer,
	CloseFullscreenButton,
	FullscreenImage,
	FullscreenCaption,
	LeftArrowContainer,
	RightArrowContainer,
	AlbumIndexContainer,
	LoadingContainer,
	FullscreenContent,
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

	const swipeConfig = {
		delta: 10, // min distance(px) before a swipe starts
		preventDefaultTouchmoveEvent: true, // call e.preventDefault *See Details*
		trackTouch: true, // track touch input
		trackMouse: true, // track mouse input
		rotationAngle: 0, // set a rotation angle
	};

	const swipeHandlers = useSwipeable({
		onSwipedRight: () => handleLeftClick(),
		onSwipedLeft: () => handleRightClick(),
		...swipeConfig,
	});

	return show ? (
		<FullscreenContainer>
			<FullscreenContent>
				<CloseFullscreenButton onClick={onClose}>
					<FontAwesomeIcon icon="times" size="3x" />
				</CloseFullscreenButton>

				{loading && (
					<LoadingContainer>
						<FontAwesomeIcon icon="spinner" size="3x" className="spinner" />
					</LoadingContainer>
				)}

				<AlbumIndexContainer>
					<h2 style={{ color: "white" }}>
						{index + 1}/{imageUrls.length}
					</h2>
				</AlbumIndexContainer>

				<FullscreenImage {...swipeHandlers}>
					{index > 0 && (
						<LeftArrowContainer onClick={handleLeftClick}>
							<FontAwesomeIcon icon="arrow-circle-left" size="lg" />
						</LeftArrowContainer>
					)}
					<img
						src={imageUrls[index]}
						alt="memory"
						onLoad={handleOnLoad}
						onLoadStart={handleOnLoadStart}
						onError={handleOnLoad}
					/>
					{index < imageUrls.length - 1 && (
						<RightArrowContainer onClick={handleRightClick}>
							<FontAwesomeIcon icon="arrow-circle-right" size="lg" />
						</RightArrowContainer>
					)}
				</FullscreenImage>

				{description.length > 0 && (
					<FullscreenCaption>{description}</FullscreenCaption>
				)}
			</FullscreenContent>
		</FullscreenContainer>
	) : (
		<></>
	);
};

export default AlbumDisplay;