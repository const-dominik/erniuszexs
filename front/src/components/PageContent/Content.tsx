import styled from 'styled-components';
import Bot from './BotDisplay/Bot';
import { PlayerData } from "../../types";

export interface IContentProps {
  data: PlayerData[]
}

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  max-height: 85vh;
  background: url("https://www.margonem.pl/_i/pl/background_logged_body.jpg?v=6") repeat center center;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
`

const Content = (props: IContentProps) => {
  return (
    <StyledContent>
      {props.data.map(player => (<Bot data={player}/>))}
    </StyledContent>
  );
}

export default Content;