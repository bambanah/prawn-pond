import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 751px) {
    margin-top: 96vh;
  }

  @media screen and (max-width: 750px) {
    padding: inherit 0;
    /* padding-top: 5rem; */
  }
`;

export default ContentContainer;
