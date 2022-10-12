import styled from 'styled-components';

export interface IMenuHeaderProps {
  onClick: Function;
}

const Header = styled.h2`
    text-align: center;
    margin: 1.2rem 0;
    font-size: 200%;
    cursor: pointer;
    font-family: 'Edu VIC WA NT Beginner', cursive;
`

const MenuHeader = (props: IMenuHeaderProps) => {
  return (
    <Header onClick={() => props.onClick("all")}>Erniuszex</Header>
  );
}

export default MenuHeader;