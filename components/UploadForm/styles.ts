import styled from "styled-components";

export const ImagePreviewContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  flex: 0 0 10%;
  width: 200px;
  height: 100px;
  position: relative;
`;

export const DropZoneContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 10px solid;
  border-image: ${(props) => props.theme.colors.accent} 1;
  background-image: none;
  min-width: 480px;

  :hover {
    border-image: ${(props) => props.theme.colors.transparentAccent} 1;
  }
`;
