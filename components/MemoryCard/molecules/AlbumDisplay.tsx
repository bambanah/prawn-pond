import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  FullscreenContainer,
  CloseFullscreenButton,
  FullscreenImage,
  FullscreenCaption,
  LeftArrowContainer,
  RightArrowContainer
} from "../styles";

interface AlbumDisplayProps {
  description: string;
  show: boolean;
  imageUrls: (string | null)[];
  onClose: () => void;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
  description,
  show,
  imageUrls,
  onClose
}) => {
  const [index, setIndex] = useState(0);

  const handleLeftClick = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  const handleRightClick = () => {
    if (index + 1 < imageUrls.length) {
      setIndex((i) => i + 1);
    }
  };

  return show ? (
    <FullscreenContainer>
      <CloseFullscreenButton onClick={onClose}>
        <FontAwesomeIcon icon="times" size="3x" />
      </CloseFullscreenButton>

      {index > 0 && (
        <LeftArrowContainer onClick={handleLeftClick}>
          <FontAwesomeIcon icon="arrow-left" size="3x" fill="white" />
        </LeftArrowContainer>
      )}

      {index < imageUrls.length - 1 && (
        <RightArrowContainer onClick={handleRightClick}>
          <FontAwesomeIcon icon="arrow-right" size="3x" fill="white" />
        </RightArrowContainer>
      )}

      {imageUrls[index] && (
        <FullscreenImage>
          <img src={imageUrls[index]} alt="memory" />
        </FullscreenImage>
      )}

      {description.length && (
        <FullscreenCaption>{description}</FullscreenCaption>
      )}
    </FullscreenContainer>
  ) : (
    <></>
  );
};

export default AlbumDisplay;
