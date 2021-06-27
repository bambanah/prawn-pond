import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { ThemeConsumer } from "styled-components";
import {
	Announcement,
	AnnouncementContainer,
	CharityTiles,
	FuneralInfo,
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
					backgroundColor={theme.colors.pastelPink}
					flexDir="column"
				>
					<FuneralInfo>
						<h1>Funeral Information</h1>
						<p>
							<FontAwesomeIcon icon="clock" /> Friday 2 July, 1pm
						</p>
						<p>
							<FontAwesomeIcon icon="map-marker-alt" /> St Peter&#39;s Lutheran
							College Chapel
							<br />
							Indooroopilly
						</p>
						<a href="https://goo.gl/maps/dBr655d4JfDdgjpMA">
							Show in Google Maps
						</a>

						<h3>Livestream</h3>
						<a>Link goes here</a>
					</FuneralInfo>
				</Announcement>
				<Announcement flexDir="row-reverse">
					<div>
						<h1 id="charities">Consider donating to these charities</h1>
						<CharityTiles>
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
							<CharityLink
								href="https://npaq.org.au/donate/"
								imgSrc="/logos/npaq-logo.jpg"
								alt="National Parks Association of Queensland"
							/>
						</CharityTiles>
					</div>
				</Announcement>
				<Announcement backgroundColor={theme.colors.pastelGreen}>
					<div>
						<h1>If you&#39;re struggling, please reach out</h1>
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
