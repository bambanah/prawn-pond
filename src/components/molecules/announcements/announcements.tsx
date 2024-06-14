import Image from "next/image";
import React from "react";
import { ThemeConsumer } from "styled-components";
import {
	Announcement,
	AnnouncementContainer,
	CharityTiles,
	FuneralInfo,
	FuneralMessage,
} from "./announcements.styles";

interface CharityProps {
	href: string;
	imgSrc: string;
	alt: string;
	imgWidth?: string;
	imgHeight?: string;
}

const CharityLink = ({
	href,
	imgSrc,
	alt,
	imgWidth = "100px",
	imgHeight = "100px",
}: CharityProps) => (
	<a href={href}>
		<div>
			<Image
				src={imgSrc}
				width={imgWidth}
				height={imgHeight}
				alt={alt}
				layout="fixed"
			/>
		</div>
	</a>
);

const Announcements = () => (
	<ThemeConsumer>
		{(theme) => (
			<AnnouncementContainer>
				<Announcement
					backgroundColor={theme.colors.pastelBlue}
					flexDir="column"
				>
					<FuneralInfo>
						<h1>Take a Sean Wilson Hike 2024</h1>
						<FuneralMessage className="text-center">
							<div className="flex flex-col items-start max-w-[20rem] m-auto">
								<p>
									<strong>Day</strong>. Sunday 23 June
								</p>
								<p>
									<strong>Time</strong>. 8am (I&#39;ll be there from 7:30)
								</p>
								<p>
									<strong>Place</strong>. Sunday 23 June
								</p>
							</div>
							<p>
								In memory of our beloved Sean and friends we have lost along the
								way...
							</p>
							<p>❤️💙💜</p>
							<p>
								We will be doing a combination of walks along creeks, out to a
								disused quarry filled with water, and return for nibbles and
								chats.
							</p>
							<p>Total walking time 1.5 to 2 hours.</p>
							<p>
								This can be done on foot... with or without your dog/s or
								mountain bike or horse if you happen to own one!
							</p>
							<p>
								There is a shorter version of the walk if you are short on time,
								and there is a free Koala Sanctuary to visit if you&#39;re
								waiting.
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
								I&#39;ll put a pin drop on the picnic table we can meet at when
								I get there.
							</p>
							<p>Please bring lots of your friends 🧡</p>
							<p>
								The aim of this walk is to share time and stories and make
								connections. Share this information and invite others who may
								not have known Sean but know you, who knew Sean. We are shaped
								by all the things around us.
							</p>
							<p>Please come and share a wonderful morning.</p>
							<div className="flex flex-col">
								<span className="m-0 text-center">
									Lots of love, luck, and laughter,
								</span>
								<p className="signature">Nicky</p>
							</div>
						</FuneralMessage>
					</FuneralInfo>
				</Announcement>
				<Announcement backgroundColor={theme.colors.pastelPink}>
					<div>
						<h1>If you or a loved one are struggling, please reach out</h1>
						<CharityTiles>
							<CharityLink
								href="https://www.lifeline.org.au/"
								imgSrc="/logos/lifeline-logo.png"
								alt="Lifeline"
								imgWidth="171px"
								imgHeight="100px"
							/>
							<CharityLink
								href="https://www.ruok.org.au/"
								imgSrc="/logos/ruok-logo.webp"
								alt="R U Ok"
								imgWidth="187px"
								imgHeight="100px"
							/>
						</CharityTiles>
					</div>
				</Announcement>
			</AnnouncementContainer>
		)}
	</ThemeConsumer>
);

export default Announcements;
