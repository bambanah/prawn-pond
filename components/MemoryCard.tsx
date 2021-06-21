import { Memory } from "@Shared/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getImageUrl } from "@Utils/firebase";
import Image from "next/image";

interface Props {
	memory: Memory;
}

const Card = styled.div`
	width: 100%;
	display: inline-flex;
	flex-direction: column;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	margin-bottom: 2rem;
	cursor: pointer;
	border-radius: 5px;
	overflow: hidden;
`;

const ImageContainer = styled.div`
	flex: 0 0 auto;
	width: 100%;

	div {
		position: relative !important;
	}

	img {
		position: relative !important;
		height: auto !important;
		width: 100% !important;
	}
`;

const TextContainer = styled.div`
	flex: 0 0 auto;
	padding: 2rem;
`;

const MemoryCard = ({ memory }: Props) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const maxMessageLength = 200;

	useEffect(() => {
		if (!imageUrl && memory.images) {
			getImageUrl(memory.images[0]).then((url) => {
				setImageUrl(url);
			});
			setLoading(false);
		}

		return () => {
			setImageUrl(null);
			setLoading(true);
		};
	}, []);

	if (loading) {
		return null;
	}
	return (
		<Card key={memory.created?.valueOf()}>
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
