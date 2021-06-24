import Masonry from "react-masonry-css";
import styled from "styled-components";

export const MemoryListContainer = styled.div`
  padding: 0rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  path {
    color: ${({ theme }) => theme.colors.accent};
  }

  h1 {
    font-family: "Taviraj";
    font-size: 3rem;
    text-align: center;
  }
`;

export const StyledMasonry = styled(Masonry)`
  display: flex;
  width: auto;
  max-width: 1500px;
  padding: 0 1em;
  margin-top: 2em;

  .masonry-grid-column {
    background-clip: padding-box;
    marign-right: 1em;
    margin-left: 1em;
  }

  @media screen and (max-width: 750px) {
    margin-left: 0;
    padding: 0;

    .masonry-grid-column {
      padding: 0;
    }
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p,
  a {
    font-size: 12px;
  }
`;

export const MemoryLink = styled.a`
  margin: 2rem 0;
`;

export const CategorySelectionContainer = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
    border: none;
    background-color: white;
    width: 100%;
    height: 4rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.pastelGreen};
    }
  }

  .selected {
    background-color: ${({ theme }) => theme.colors.pastelGreen};
  }

  // TODO: Make this responsive in another way e.g. with a dropdown on smaller screens
  @media screen and (max-width: 900px) {
    flex-direction: column;

    button {
      height: 3rem;
    }
  }
`;

export const CategoryBlock = styled.div``;
