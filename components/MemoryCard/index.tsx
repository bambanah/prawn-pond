import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@Shared/types";
import { getPlaceholderUrl } from "@Utils/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
	Card,
	CloseFullscreenButton,
	FullscreenCaption,
	FullscreenContainer,
	FullscreenImage,
	ImageContainer,
	TextContainer,
} from "./styles";

interface Props {
	memory: Memory;
}

const MemoryCard = ({ memory }: Props) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [placeholderUrl, setPlaceholderUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [fullDisplay, setFullDisplay] = useState(false);

	const maxMessageLength = 150;

	useEffect(() => {
		if (!imageUrl && memory.images) {
			getPlaceholderUrl(memory.images[0], "512").then((url) => {
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
	}, []);

	if (loading) {
		return null;
	}

	if (fullDisplay) {
		document.body.style.overflow = "hidden";
		return (
			<FullscreenContainer>
				<CloseFullscreenButton onClick={() => setFullDisplay(false)}>
					<FontAwesomeIcon icon="times" size="3x" />
				</CloseFullscreenButton>
				{imageUrl && (
					<FullscreenImage>
						<img src={imageUrl} alt="memory" />
					</FullscreenImage>
				)}

				{memory.description && (
					<FullscreenCaption>
						{memory.description.length > maxMessageLength
							? `${memory.description.substr(0, maxMessageLength - 1)}...`
							: memory.description}
					</FullscreenCaption>
				)}
			</FullscreenContainer>
		);
	}

	document.body.style.overflow = "inherit";
	return (
		<Card
			key={memory.created?.valueOf()}
			onClick={() => {
				setFullDisplay(true);
			}}
		>
			{imageUrl && placeholderUrl && (
				<ImageContainer>
					<Image
						src={imageUrl}
						layout="fill"
						objectFit="contain"
						placeholder="blur"
						blurDataURL={placeholderUrl}
					/>
				</ImageContainer>
			)}

			{memory.description && (
				<TextContainer>
					{memory.description.length > maxMessageLength
						? `${memory.description.substr(0, maxMessageLength - 1)}...`
						: memory.description}
				</TextContainer>
			)}
		</Card>
	);
};

export default MemoryCard;
