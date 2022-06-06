import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@shared/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumDisplay from "./molecules/AlbumDisplay";
import { Card, ImageContainer, TextContainer } from "./styles";

interface Props {
	memory: Memory;
	displayGrid: boolean;
}

const maxMessageLength = 150;

const MemoryCard = ({ memory, displayGrid }: Props) => {
	const [loading, setLoading] = useState(
		memory.images !== undefined && memory.images.length > 0
	);
	const [fullDisplay, setFullDisplay] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [placeholderUrl, setPlaceholderUrl] = useState<string | null>(null);

	const handleFullClose = () => {
		setFullDisplay(false);
	};

	useEffect(() => {
		if (!imageUrl && memory.images?.length) {
			const firstImage = memory.images[0];

			setImageUrl(firstImage.thumbnailUrls?.large ?? firstImage.src);
			setPlaceholderUrl(firstImage.thumbnailUrls?.small ?? firstImage.src);

			setLoading(false);
		}
	}, [imageUrl, memory.images]);

	if (loading) {
		return <div>Loading</div>;
	}

	// Prevent scrolling in body if displaying fullscreen
	document.body.style.overflow = fullDisplay ? "hidden" : "visible";

	const displayImage = memory.images && imageUrl && placeholderUrl;
	const displayText =
		memory.description && (!memory.images?.length || !displayGrid);

	return (
		<>
			<AlbumDisplay
				show={fullDisplay}
				onClose={handleFullClose}
				description={memory.description}
				images={memory.images ?? []}
			/>

			<Card
				key={memory.created?.valueOf()}
				onClick={() => {
					setFullDisplay(true);
				}}
				className={displayGrid ? "grid" : "feed"}
			>
				{displayImage && (
					<ImageContainer className="media-container">
						{memory.images?.at(0)?.metadata.contentType.includes("image") && (
							<Image
								src={imageUrl}
								layout="fill"
								placeholder="blur"
								blurDataURL={placeholderUrl}
								objectFit={displayGrid ? "cover" : "cover"}
							/>
						)}

						{memory.images?.at(0)?.metadata.contentType.includes("video") && (
							<span>
								{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
								<video src={imageUrl} />
							</span>
						)}

						{memory.images && memory.images.length > 1 && (
							<FontAwesomeIcon
								icon={faImages}
								size="lg"
								style={{ width: "auto" }}
							/>
						)}
					</ImageContainer>
				)}

				{displayText && (
					<TextContainer>
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
