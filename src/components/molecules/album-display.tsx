import {
	faArrowCircleLeft,
	faArrowCircleRight,
	faSpinner,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "@shared/types";
import { getImageData } from "@utils/firebase";
import React, { useEffect, useState } from "react";
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
} from "./memory-card/memory-card.styles";

interface AlbumDisplayProps {
	description: string;
	show: boolean;
	imageIds: string[];
	onClose: () => void;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
	description,
	show,
	imageIds,
	onClose,
}) => {
	const hasImages = imageIds?.length > 0;

	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(hasImages);

	const [images, setImages] = useState<Image[]>([]);

	useEffect(() => {
		if (!hasImages) {
			setLoading(false);
			return;
		}

		const promises: Promise<Image | null>[] = [];

		imageIds.map((id) => {
			promises.push(getImageData(id, false, true));
		});

		Promise.all(promises).then((fetchedImages) => {
			setImages(fetchedImages.filter((i) => i !== null) as Image[]);
			setLoading(false);
		});
	}, [hasImages, imageIds]);

	const handleLeftClick = () => {
		if (index > 0) {
			setIndex((i) => i - 1);
		}
	};

	const handleRightClick = () => {
		if (index + 1 < images.length) {
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
					<FontAwesomeIcon icon={faTimes} size="3x" />
				</CloseFullscreenButton>

				{loading && (
					<LoadingContainer>
						<FontAwesomeIcon icon={faSpinner} size="3x" className="spinner" />
					</LoadingContainer>
				)}

				{hasImages && !loading && (
					<FullscreenImage {...swipeHandlers}>
						{images.length > 1 && (
							<AlbumIndexContainer>
								<h2 style={{ color: "white" }}>
									{index + 1}/{images.length}
								</h2>
							</AlbumIndexContainer>
						)}
						{index > 0 && (
							<LeftArrowContainer onClick={handleLeftClick}>
								<FontAwesomeIcon icon={faArrowCircleLeft} size="lg" />
							</LeftArrowContainer>
						)}
						{images[index].metadata?.contentType.includes("image") && (
							<img
								src={images[index].src}
								alt="memory"
								onLoad={handleOnLoad}
								onLoadStart={handleOnLoadStart}
								onError={handleOnLoad}
							/>
						)}
						{images[index].metadata?.contentType.includes("video") && (
							<video src={images[index].src} controls />
						)}
						{index < images.length - 1 && (
							<RightArrowContainer onClick={handleRightClick}>
								<FontAwesomeIcon icon={faArrowCircleRight} size="lg" />
							</RightArrowContainer>
						)}
					</FullscreenImage>
				)}

				{description.length > 0 && (
					<FullscreenCaption className={!hasImages ? "story" : "caption"}>
						{description}
					</FullscreenCaption>
				)}
			</FullscreenContent>
		</FullscreenContainer>
	) : (
		<></>
	);
};

export default AlbumDisplay;
