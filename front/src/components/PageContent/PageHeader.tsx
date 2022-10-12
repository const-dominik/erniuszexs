import { PossibleDisplays } from "../../types";
import styled from "styled-components";
import { SplitH } from "./Splits";

export interface IHeaderProps {
    worldName: PossibleDisplays;
}

const Bar = styled.div`
    width: 100%;
    height: 14vh;
    background-image: url("https://forum.margonem.pl/img/logo/default0.jpg");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WorldName = styled.h1`
    background: rgba(0, 0, 0, 0.6);
    padding: 0.1rem 0.5rem;
    border-radius: 0.5rem;
    color: white;
    text-align: center;
    font-size: 400%;
    user-select: none;
`;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Header = (props: IHeaderProps) => {
  return (
    <>
      <Bar>
          <WorldName>{capitalize(props.worldName)}</WorldName>
      </Bar>
      <SplitH/>
    </>
  );
}

export default Header;