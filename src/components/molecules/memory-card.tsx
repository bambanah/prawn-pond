import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getImageData } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Memory } from "@/shared/types";
import { Images, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
			<Card
				key={memory.created?.valueOf()}
				onClick={() => {
					setFullDisplay(true);
				}}
				className={cn(displayGrid ? "grid" : "feed")}
			>
				<CardContent>
					{displayImage && (
						<div className="w-full flex justify-center">
							{!loading && mediaType.includes("image") && (
								<Image src={imageUrl} alt="" width="500" height="500" />
							)}

							{!loading && mediaType.includes("video") && (
								<span>
									<video src={imageUrl} />
									<Play />
								</span>
							)}

							{memory.imageIds && memory.imageIds.length > 1 && (
								<Images className="w-auto" />
							)}
						</div>
					)}

					{displayText && (
						<CardFooter className={!displayImage ? "text-only" : ""}>
							{memory.description.length > maxMessageLength
								? `${memory.description.slice(
										0,
										Math.max(0, maxMessageLength - 1)
									)}...`
								: memory.description}
						</CardFooter>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default React.memo(MemoryCard);
