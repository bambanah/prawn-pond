import { Memory } from "@Shared/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getImageUrl } from "@Utils/firebase";

interface Props {
	memory: Memory;
}

const Card = styled.div`
	width: 100%;
	display: inline-flex;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	margin-bottom: 1rem;
	cursor: pointer;
`;

const ImageContainer = styled.div`
	flex: 0 0 auto;
	width: 100%;

	img {
		display: block;
		height: auto;
		width: 100%;
	}
`;

const TextContainer = styled.div`
	flex: 0 0 auto;
	padding: 0.5rem;
`;

const MemoryCard = ({ memory }: Props) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const maxMessageLength = 150;

	useEffect(() => {
		if (!imageUrl && memory.images) {
			getImageUrl(memory.images[0]).then((url) => {
				setImageUrl(url);
			});
			setLoading(false);
		}
		console.log(window.scrollY);
	}, []);

	if (loading) {
		return null;
	}
	return (
		<Card key={memory.created?.valueOf()}>
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
