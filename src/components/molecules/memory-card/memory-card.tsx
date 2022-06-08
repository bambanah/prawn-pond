import { faImages, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@shared/types";
import { getImageData } from "@utils/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumDisplay from "../album-display";
import { Card, ImageContainer, TextContainer } from "./memory-card.styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
	memory: Memory;
	displayGrid: boolean;
}

const MemoryCard = ({ memory, displayGrid }: Props) => {
	const [loading, setLoading] = useState(
		memory.imageIds !== undefined && memory.imageIds.length > 0
	);
	const [fullDisplay, setFullDisplay] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>("");
	const [mediaType, setMediaType] = useState<string>("");

	const handleFullClose = () => {
		setFullDisplay(false);
	};

	useEffect(() => {
		if (!imageUrl && memory.imageIds?.length) {
			const firstImage = memory.imageIds[0];

			getImageData(firstImage, true, true).then((image) => {
				setImageUrl(image?.src ?? "");
				setMediaType(image?.metadata?.contentType ?? "");
				setLoading(false);
			});
		}
	}, [imageUrl, memory.imageIds]);

	// Prevent scrolling in body if displaying fullscreen
	document.body.style.overflow = fullDisplay ? "hidden" : "visible";

	const displayImage = memory.imageIds.length > 0;
	const displayText =
		memory.description && (!memory.imageIds?.length || !displayGrid);

	const maxMessageLength = displayImage ? 150 : displayGrid ? 280 : 1200;

	return (
		<>
			{fullDisplay && (
				<AlbumDisplay
					show={fullDisplay}
					onClose={handleFullClose}
					description={memory.description}
					imageIds={memory.imageIds}
				/>
			)}

			<Card
				key={memory.created?.valueOf()}
				onClick={() => {
					setFullDisplay(true);
				}}
				className={displayGrid ? "grid" : "feed"}
			>
				{displayImage && (
					<ImageContainer className="media-container">
						<Skeleton />
						{!loading && mediaType.includes("image") && (
							<Image src={imageUrl} layout="fill" objectFit={"cover"} />
						)}

						{!loading && mediaType.includes("video") && (
							<span>
								<video src={imageUrl} />
								<FontAwesomeIcon
									icon={faPlay}
									size="4x"
									className="video-icon"
								/>
							</span>
						)}

						{memory.imageIds && memory.imageIds.length > 1 && (
							<FontAwesomeIcon
								icon={faImages}
								size="lg"
								style={{ width: "auto" }}
							/>
						)}
					</ImageContainer>
				)}

				{displayText && (
					<TextContainer className={!displayImage ? "text-only" : ""}>
						{memory.description.length > maxMessageLength
							? `${memory.description.slice(
									0,
									Math.max(0, maxMessageLength - 1)
							  )}...`
							: memory.description}
					</TextContainer>
				)}
			</Card>
		</>
	);
};

export default React.memo(MemoryCard);
