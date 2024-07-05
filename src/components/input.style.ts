import styled from "styled-components";

export const GInput = styled.input<{ width?: string; height?: string }>`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
`;
