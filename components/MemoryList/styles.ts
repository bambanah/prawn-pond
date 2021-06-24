import Masonry from "react-masonry-css";
import styled from "styled-components";

export const MemoryListContainer = styled.div`
  padding: 1rem 1rem;
`;

export const StyledMasonry = styled(Masonry)`
  display: flex;
  margin-left: -2em;
  width: auto;
  max-width: 1500px;
  padding: 0 1em;

  .masonry-grid-column {
    padding-left: 2em;
    background-clip: padding-box;
  }

  @media screen and (max-width: 750px) {
    margin-left: 0;
    padding: 0;

    .masonry-grid-column {
      padding: 0;
    }
  }
`;
