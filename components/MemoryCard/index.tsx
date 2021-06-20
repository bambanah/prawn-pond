import { Memory } from "@Shared/types";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "@Utils/firebase";
import {
	FullscreenContainer,
	ImageContainer,
	Card,
	TextContainer,
	FullscreenImage,
	FullscreenCaption,
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
		console.log("Full?");
		return (
			<FullscreenContainer>
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

	return (
		<Card
			key={memory.created?.valueOf()}
			onClick={() => {
				setFullDisplay(true);
				console.log("full");
			}}
		>
			{imageUrl && (
				<ImageContainer>
					<img src={imageUrl} alt="memory" />
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
