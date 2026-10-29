import Image from "next/image";
import React from "react";

const sectionClass =
	"flex w-full items-center justify-center px-4 py-28 max-[900px]:p-0 max-[900px]:pt-12";
const contentClass =
	"flex max-w-[1100px] flex-wrap items-center justify-center max-[960px]:flex-col";
const headingClass =
	"m-0 flex-[1_0_50%] text-center font-display text-[2.2rem] font-bold max-[960px]:text-[2rem]";

interface CharityProps {
	href: string;
	imgSrc: string;
	alt: string;
	imgWidth?: number;
	imgHeight?: number;
}

const CharityLink = ({
	href,
	imgSrc,
	alt,
	imgWidth = 100,
	imgHeight = 100,
}: CharityProps) => (
	<a href={href}>
		<div className="rounded-[10px] bg-white p-4 shadow-low transition-shadow duration-150 hover:shadow-[2px_2px_12px_rgba(0,0,0,0.25)]">
			<Image src={imgSrc} width={imgWidth} height={imgHeight} alt={alt} />
		</div>
	</a>
);

const Announcements = () => (
	<div className="flex w-full flex-col items-center">
		<div className={`${sectionClass} bg-pastel-pink`}>
			<div className={contentClass}>
				<h1 className={`${headingClass} min-[961px]:text-left`}>
					If you or a loved one are struggling, please reach out
				</h1>
				<div className="flex flex-[1_0_50%] flex-wrap items-center justify-center gap-8 py-4">
					<CharityLink
						href="https://www.lifeline.org.au/"
						imgSrc="/logos/lifeline-logo.png"
						alt="Lifeline"
						imgWidth={171}
						imgHeight={100}
					/>
					<CharityLink
						href="https://www.ruok.org.au/"
						imgSrc="/logos/ruok-logo.webp"
						alt="R U Ok"
						imgWidth={187}
						imgHeight={100}
					/>
				</div>
			</div>
		</div>
	</div>
);

export default Announcements;
