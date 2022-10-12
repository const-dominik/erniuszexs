import styled from 'styled-components';
import { World } from "../../types";
import MenuItem from "./MenuItem";
import MenuHeader from "./MenuHeader";
import { SplitV } from "../PageContent/Splits";

export interface IMenuProps {
    items: readonly World[];
    onClick: Function;
}

const Ul = styled.ul`
  list-style: none;
  background: #d9aa64;
  color: #0b2e32;
  width: 15vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 1.2rem;

  & > Li:last-child {
    border: none;
  }
`;

const Menu = (props: IMenuProps) => {
  return (
    <>
      <Ul>
        <MenuHeader onClick={props.onClick}/>
        {props.items.map(world => (
            <MenuItem key={world} world={world} onClick={props.onClick} />
          ))}
      </Ul>
      <SplitV />
    </>
  );
}


export default Menu;