import { Container } from "./header.style";

interface HeaderProps {
  children: React.ReactNode;
  HeaderText: string;
}

export const Header = ({ children, HeaderText }: HeaderProps) => {
  return (
    <>
      <Container>
        <h1>{HeaderText}</h1>
        {children}
      </Container>
    </>
  );
};
