import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@Shared/types";
import { getImageUrl } from "@Utils/firebase";
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
	const [loading, setLoading] = useState(true);
	const [fullDisplay, setFullDisplay] = useState(false);

	const maxMessageLength = 150;

	useEffect(() => {
		if (!imageUrl && memory.images) {
			getImageUrl(memory.images[0]).then((url) => {
				setImageUrl(url);
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
			{imageUrl && (
				<ImageContainer>
					<Image
						src={imageUrl}
						layout="fill"
						objectFit="contain"
						sizes="500px"
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
