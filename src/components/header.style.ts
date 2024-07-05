import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid rgba(235, 235, 235, 1);
  box-sizing: border-box;
  z-index: 80;
  // padding: 0 2rem;
`;

export const BlockHeader = styled.div`
  width: 100%;
  height: 15vh;
  border-top: 1px solid black;
  box-sizing: border-box;
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
`;
