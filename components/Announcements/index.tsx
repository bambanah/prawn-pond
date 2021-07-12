import Image from "next/image";
import React from "react";
import { ThemeConsumer } from "styled-components";
import {
	Announcement,
	AnnouncementContainer,
	CharityTiles,
	FuneralInfo,
	FuneralMessage,
} from "./styles";

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
						<h1>A Celebration of Sean&#39;s Life</h1>
						{/* <YoutubeEmbed embedId="JMccs9zm93g" /> */}
						<FuneralMessage>
							<p>
								On Saturday 3 July, we said farewell, for now, to our son, our
								brother, our friend. Due to new COVID restrictions, attendance
								at Sean&#39;s funeral was sadly limited to 20 people, however we
								were joined by so many family and friends across the world via
								livestream.
							</p>
							<p>
								The livestream can be viewed again via{" "}
								<a href="https://livestream.com/stp/funeralofseanwilson">
									this link
								</a>
								.
							</p>
							<p>
								You can also view a video snapshot of his life{" "}
								<a href="https://www.youtube.com/watch?v=JMccs9zm93g">here</a>.
							</p>
							<p>
								When restrictions lift, we will arrange a larger gathering to
								come together and celebrate Sean&#39;s life.
							</p>
							<p>Looking forward to seeing you then.</p>

							<p>Nicky, Anthony, Georgia and Ollie</p>
						</FuneralMessage>
					</FuneralInfo>
				</Announcement>
				<Announcement flexDir="row-reverse">
					<div>
						<h1 id="charities">
							Consider donating to these charities in lieu of flowers
						</h1>
						<CharityTiles>
							<CharityLink
								href="https://npaq.org.au/donate/"
								imgSrc="/logos/npaq-logo.jpg"
								alt="National Parks Association of Queensland"
							/>
							<CharityLink
								href="https://www.beyondblue.org.au/get-involved/make-a-donation"
								imgSrc="/logos/beyond-blue-logo.jpg"
								alt="Beyond Blue"
							/>
							<CharityLink
								href="https://www.blackdoginstitute.org.au/sponsor"
								imgSrc="/logos/black-dog-logo.jpg"
								alt="Black Dog Institute"
							/>
						</CharityTiles>
					</div>
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
