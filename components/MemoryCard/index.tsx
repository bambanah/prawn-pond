import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@Shared/types";
import { getImageUrl } from "@Utils/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
	AlbumIconContainer,
  Card,
  CloseFullscreenButton,
  FullscreenCaption,
  FullscreenContainer,
  FullscreenImage,
  ImageContainer,
  TextContainer
} from "./styles";

interface Props {
  memory: Memory;
}

const MemoryCard = ({ memory }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullDisplay, setFullDisplay] = useState(false);
	const theme = useTheme();

  const maxMessageLength = 150;

  useEffect(() => {
    if (!imageUrl && memory.images) {
      getImageUrl(memory.images[0]).then((url) => {
        setImageUrl(url);
      });
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      {fullDisplay && (
        <FullscreenContainer>
          <CloseFullscreenButton onClick={() => setFullDisplay(false)}>
            <FontAwesomeIcon icon="times" size="3x" />
          </CloseFullscreenButton>

          {imageUrl && (
            <FullscreenImage>
              <img src={imageUrl} alt="memory" />
            </FullscreenImage>
          )}

          {memory.description && (
            <FullscreenCaption>
              {memory.description.length > maxMessageLength
                ? `${memory.description.substr(0, maxMessageLength - 1)}...`
                : memory.description}
            </FullscreenCaption>
          )}
        </FullscreenContainer>
      )}

      <Card
        key={memory.created?.valueOf()}
        onClick={() => {
          setFullDisplay(true);
        }}
      >
								
        {imageUrl && (
          <ImageContainer>
            <Image
              src={imageUrl}
              layout="fill"
              objectFit="contain"
              sizes="500px"
            />
						{memory.images?.length > 1 && 
							<div>
								<FontAwesomeIcon icon={["far", "images"]} size="3x" style={{ width: "auto" }}/>
							</div>
						}
          </ImageContainer>
        )}

        {memory.description && (
          <TextContainer>
            {memory.description.length > maxMessageLength
              ? `${memory.description.substr(0, maxMessageLength - 1)}...`
              : memory.description}
          </TextContainer>
        )}
      </Card>
    </>
  );
};

export default MemoryCard;
