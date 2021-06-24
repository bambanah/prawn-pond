import Masonry from "react-masonry-css";
import styled from "styled-components";

export const MemoryListContainer = styled.div`
  padding: 0rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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
