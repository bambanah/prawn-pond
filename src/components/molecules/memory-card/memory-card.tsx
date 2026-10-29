import { Memory } from "@shared/types";
import { getImageData } from "@utils/firebase";
import { Images, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumDisplay from "../album-display";
import Skeleton from "react-loading-skeleton";

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
	useEffect(() => {
		document.body.style.overflow = fullDisplay ? "hidden" : "visible";
	}, [fullDisplay]);

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

			<div
				key={memory.created?.valueOf()}
				onClick={() => {
					setFullDisplay(true);
				}}
				className={`group relative flex cursor-pointer flex-col justify-center rounded-[2px] shadow-low transition-all duration-200 max-[750px]:w-full min-[750px]:hover:shadow-high ${
					displayGrid
						? "h-0 items-center overflow-hidden pb-[100%] *:absolute *:top-0 *:bottom-0"
						: "content-stretch items-stretch"
				}`}
			>
				{displayImage && (
					<div
						className={`w-full flex-[1_0_auto] items-center justify-center ${
							displayGrid
								? "flex"
								: "relative block h-0 overflow-hidden pb-[120%]"
						}`}
					>
						<Skeleton
							containerClassName="absolute inset-0 z-1 block"
							className="absolute inset-0 block"
						/>
						{!loading && mediaType.includes("image") && (
							<Image
								src={imageUrl}
								alt=""
								fill
								sizes="100vw"
								className="z-10"
								style={{ objectFit: "cover" }}
							/>
						)}

						{!loading && mediaType.includes("video") && (
							<span className="absolute inset-0 z-1 block">
								<video src={imageUrl} className="z-10 size-full object-cover" />
								<Play className="absolute inset-0 z-10 m-auto size-[4em] fill-current text-bg drop-shadow-[5px_5px_6px_rgb(0_0_0/0.5)] transition-all duration-100 group-hover:scale-105" />
							</span>
						)}

						{memory.imageIds && memory.imageIds.length > 1 && (
							<Images className="absolute right-[10px] bottom-[10px] z-10 size-[1.25em] text-bg" />
						)}
					</div>
				)}

				{displayText && (
					<div
						className={`z-10 flex w-full flex-1 items-center justify-center bg-bg px-[1.2rem] py-8 leading-[1.3rem] whitespace-pre-line ${
							!displayImage ? "max-h-full min-h-[200px]" : ""
						}`}
					>
						{memory.description.length > maxMessageLength
							? `${memory.description.slice(
									0,
									Math.max(0, maxMessageLength - 1)
								)}...`
							: memory.description}
					</div>
				)}
			</div>
		</>
	);
};

export default React.memo(MemoryCard);
