import React from "react";
import Image from "next/image";
import {
	AnnouncementContainer,
	Announcement,
	CharityTiles,
	FuneralInfo,
	Content,
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
	<AnnouncementContainer>
		<Announcement>
			<Content>
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
			</Content>
		</Announcement>
		<Announcement className="column">
			<Content className="column">
				<h1>Funeral Information</h1>
				<FuneralInfo>
					<div>
						<ul>
							<li>Address: 123 Name Street, Suburb, 4321</li>
							<li>
								<a href="https://google.com/maps">Show in Google Maps</a>
							</li>
						</ul>
					</div>
					<div>
						<ul>
							<li>More info can go here</li>
							<li>Maybe the funeral link here?</li>
						</ul>
					</div>
				</FuneralInfo>
			</Content>
		</Announcement>
		<Announcement className="reverse">
			<Content className="reverse">
				<h1>Consider donating to these charities</h1>
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
			</Content>
		</Announcement>
	</AnnouncementContainer>
);

export default Announcements;
