import { Image } from "@shared/types";
import { getImageData } from "@utils/firebase";
import {
	CircleArrowLeft,
	CircleArrowRight,
	LoaderCircle,
	X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const iconButtonClass = "cursor-pointer text-bg hover:text-[#dddddd]";

interface AlbumDisplayProps {
	description: string;
	show: boolean;
	imageIds: string[];
	onClose: () => void;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
	description,
	show,
	imageIds,
	onClose,
}) => {
	const hasImages = imageIds?.length > 0;

	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(hasImages);

	const [images, setImages] = useState<Image[]>([]);

	useEffect(() => {
		if (!hasImages) return;

		const promises: Promise<Image | null>[] = [];

		imageIds.map((id) => {
			promises.push(getImageData(id, false, true));
		});

		Promise.all(promises).then((fetchedImages) => {
			setImages(fetchedImages.filter((i) => i !== null) as Image[]);
			setLoading(false);
		});
	}, [hasImages, imageIds]);

	const handleLeftClick = () => {
		if (index > 0) {
			setIndex((i) => i - 1);
		}
	};

	const handleRightClick = () => {
		if (index + 1 < images.length) {
			setIndex((i) => i + 1);
		}
	};

	const handleOnLoad = () => {
		setLoading(false);
	};

	const handleOnLoadStart = () => {
		setLoading(true);
	};

	const swipeConfig = {
		delta: 10, // min distance(px) before a swipe starts
		preventDefaultTouchmoveEvent: true, // call e.preventDefault *See Details*
		trackTouch: true, // track touch input
		trackMouse: true, // track mouse input
		rotationAngle: 0, // set a rotation angle
	};

	const swipeHandlers = useSwipeable({
		onSwipedRight: () => handleLeftClick(),
		onSwipedLeft: () => handleRightClick(),
		...swipeConfig,
	});

	return show ? (
		<div className="fixed top-0 left-0 z-100 flex h-screen max-h-screen w-full max-w-screen flex-col items-center justify-center bg-black/70">
			<div className="relative max-h-screen max-w-[800px] overflow-y-auto">
				<div
					className={`${iconButtonClass} fixed top-2 right-4 z-1000`}
					onClick={onClose}
				>
					<X className="size-[3em]" />
				</div>

				{loading && (
					<div className="absolute flex size-full items-center justify-center text-bg">
						<LoaderCircle className="flex size-[3em] animate-[spin_0.8s_ease-in_infinite] self-center" />
					</div>
				)}

				{hasImages && !loading && (
					<div
						className="relative flex max-h-[85vh] min-w-40 flex-1 justify-center bg-[#111]"
						{...swipeHandlers}
					>
						{images.length > 1 && (
							<div className="absolute top-2 left-4 z-1">
								<h2 className="m-0 text-base text-white">
									{index + 1}/{images.length}
								</h2>
							</div>
						)}
						{index > 0 && (
							<div
								className={`${iconButtonClass} absolute top-1/2 left-4`}
								onClick={handleLeftClick}
							>
								<CircleArrowLeft className="size-[1.25em]" />
							</div>
						)}
						{images[index].metadata?.contentType?.includes("image") && (
							// eslint-disable-next-line @next/next/no-img-element -- unknown dimensions, sized by max-h/max-w
							<img
								className="block max-h-full max-w-full object-contain"
								src={images[index].src}
								alt="memory"
								onLoad={handleOnLoad}
								onLoadStart={handleOnLoadStart}
								onError={handleOnLoad}
							/>
						)}
						{images[index].metadata?.contentType?.includes("video") && (
							<video src={images[index].src} controls />
						)}
						{index < images.length - 1 && (
							<div
								className={`${iconButtonClass} absolute top-1/2 right-4`}
								onClick={handleRightClick}
							>
								<CircleArrowRight className="size-[1.25em]" />
							</div>
						)}
					</div>
				)}

				{description.length > 0 && (
					<div
						className={`flex items-center bg-bg leading-[1.4rem] whitespace-pre-line ${
							hasImages ? "p-8 pb-20" : "p-16 text-[1.1rem]"
						}`}
					>
						{description}
					</div>
				)}
			</div>
		</div>
	) : (
		<></>
	);
};

export default AlbumDisplay;
