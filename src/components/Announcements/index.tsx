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
								In memory of a loving son, brother and friend, the Wilson/Hughes
								families will be hosting a memorial at the{" "}
								<b>West End Croquet Club</b> on the <b>18th of June</b> from
								1:30pm.
							</p>
							<p>
								We come together to reminisce on all the good times we got to
								spend with such a loveable young man. There will likely be some
								speeches so if you feel like you want to say anything on the day
								feel free.
							</p>
							<p>Looking forward to seeing you then.</p>
							<p className="signature">Ollie, Nicky, Anthony and Georgia</p>
							<br />
							<p>
								You can also view a{" "}
								<a href="https://www.youtube.com/watch?v=JMccs9zm93g">
									video snapshot of his life
								</a>
								, or rewatch the{" "}
								<a href="https://livestream.com/stp/funeralofseanwilson">
									livestream of his funeral
								</a>
								.
							</p>
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
