import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@shared/types";
import { getImageUrl, getPlaceholderUrl } from "@utils/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumDisplay from "./molecules/AlbumDisplay";
import { Card, ImageContainer, TextContainer } from "./styles";

interface Props {
	memory: Memory;
}

const maxMessageLength = 150;

const MemoryCard = ({ memory }: Props) => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [fullDisplay, setFullDisplay] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [placeholderUrl, setPlaceholderUrl] = useState<string | null>(null);

	const handleFullClose = () => {
		setFullDisplay(false);
	};

	useEffect(() => {
		if (memory.images) {
			Promise.all(memory.images.map(async (img) => getImageUrl(img))).then(
				(urls) => {
					urls.filter((url) => url !== null);
					setImageUrls(urls as string[]);
				}
			);
		}
		setLoading(false);
	}, [memory.images]);

	useEffect(() => {
		if (!imageUrl && memory.images?.length) {
			getPlaceholderUrl(memory.images[0], "800").then((url) => {
				if (typeof url !== "string") {
					setImageUrl("");
					return;
				}
				setImageUrl(url);
			});
			getPlaceholderUrl(memory.images[0], "32").then((dataUrl) => {
				if (typeof dataUrl !== "string") {
					setPlaceholderUrl("");
					return;
				}
				setPlaceholderUrl(dataUrl);
			});
			setLoading(false);
		}
	}, [imageUrl, memory.images]);

	if (loading) {
		return <div>Loading</div>;
	}

	// Prevent scrolling in body if displaying fullscreen
	document.body.style.overflow = fullDisplay ? "hidden" : "visible";

	return (
		<>
			<AlbumDisplay
				show={fullDisplay}
				onClose={handleFullClose}
				description={memory.description}
				imageUrls={imageUrls}
			/>

			<Card
				key={memory.created?.valueOf()}
				onClick={() => {
					setFullDisplay(true);
				}}
			>
				<ImageContainer>
					{imageUrl && placeholderUrl && (
						<>
							<Image src={imageUrl} layout="fill" objectFit="contain" />
							{memory.images && memory.images.length > 1 && (
								<div>
									<FontAwesomeIcon
										icon={faImages}
										size="lg"
										style={{ width: "auto" }}
									/>
								</div>
							)}
						</>
					)}
				</ImageContainer>

				{memory.description && (
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

export default MemoryCard;
