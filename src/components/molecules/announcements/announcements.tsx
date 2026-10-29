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
		<div className={`${sectionClass} bg-pastel-blue`}>
			<div className={`${contentClass} flex-col [&_p]:mb-2`}>
				<h1 className={headingClass}>Take a Sean Wilson Hike 2024</h1>
				<div className="mt-8 flex max-w-[800px] flex-col gap-4 rounded-[5px] bg-bg px-20 py-8 text-center text-[1.1rem] max-[750px]:p-4">
					<div className="flex flex-col items-start max-w-[20rem] m-auto">
						<p>
							<strong>Day</strong>. Sunday 23 June
						</p>
						<p>
							<strong>Time</strong>. 8am (I&#39;ll be there from 7:30)
						</p>
						<p>
							<strong>Place</strong>.{" "}
							<a href="https://maps.app.goo.gl/Wk6JXXkY7yEdLjiQ9">
								Daisy Hill Conservation Park
							</a>
						</p>
					</div>
					<p>
						In memory of our beloved Sean and friends we have lost along the
						way...
					</p>
					<p>❤️💙💜</p>
					<p>
						We will be doing a combination of walks along creeks, out to a
						disused quarry filled with water, and return for nibbles and chats.
					</p>
					<p>Total walking time 1.5 to 2 hours.</p>
					<p>
						This can be done on foot... with or without your dog/s or mountain
						bike or horse if you happen to own one!
					</p>
					<p>
						There is a shorter version of the walk if you are short on time, and
						there is a free Koala Sanctuary to visit if you&#39;re waiting.
					</p>
					<div className="flex flex-col items-center">
						<h3 className="font-semibold mb-2">Bring</h3>
						<ul className="m-auto list-disc pl-4 text-left">
							<li>Legs for hiking... walking sticks are not necessary</li>
							<li>Dog for companionship</li>
							<li>Conversation</li>
							<li>Mountain bike and helmet, please</li>
							<li>Horse if you&#39;re lucky!</li>
							<li>Nibbles and stories or poems or haiky... to share</li>
						</ul>
					</div>
					<p>
						I&#39;ll put a pin drop on the picnic table we can meet at when I
						get there.
					</p>
					<p>Please bring lots of your friends 🧡</p>
					<p>
						The aim of this walk is to share time and stories and make
						connections. Share this information and invite others who may not
						have known Sean but know you, who knew Sean. We are shaped by all
						the things around us.
					</p>
					<p>Please come and share a wonderful morning.</p>
					<div className="flex flex-col">
						<span className="m-0 text-center">
							Lots of love, luck, and laughter,
						</span>
						<p className="font-cursive text-[1.3rem]">Nicky</p>
					</div>
				</div>
			</div>
		</div>
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
