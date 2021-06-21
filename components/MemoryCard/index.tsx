import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Memory } from "@Shared/types";
import { getImageUrl } from "@Utils/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumDisplay from "./molecules/AlbumDisplay";
import { Card, ImageContainer, TextContainer } from "./styles";

interface Props {
  memory: Memory;
}

const maxMessageLength = 150;

const MemoryCard = ({ memory }: Props) => {
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullDisplay, setFullDisplay] = useState(false);

  useEffect(() => {
    if (memory.images) {
      Promise.all(memory.images.map(async (img) => getImageUrl(img))).then(
        setImageUrls
      );
    }
    setLoading(false);
  }, []);

  const handleFullClose = () => {
    setFullDisplay(false);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <AlbumDisplay
        show={fullDisplay}
        onClose={handleFullClose}
        description={memory.description}
        imageUrls={imageUrls}
      />

      <Card
        key={memory.created?.valueOf()}
        onClick={() => {
          setFullDisplay(true);
        }}
      >
        {imageUrls[0] && (
          <ImageContainer>
            <Image
              src={imageUrls[0]}
              layout="fill"
              objectFit="contain"
              sizes="500px"
            />
            {memory.images && memory.images.length > 1 && (
              <div>
                <FontAwesomeIcon
                  icon={["far", "images"]}
                  size="3x"
                  style={{ width: "auto" }}
                />
              </div>
            )}
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
