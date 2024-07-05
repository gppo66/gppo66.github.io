import styled from "@emotion/styled";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  // padding: 20px 0;
  box-sizing: border-box;
`;

export const ColumnContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  box-sizing: border-box;
`;
export const RowContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: row;
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
`;
