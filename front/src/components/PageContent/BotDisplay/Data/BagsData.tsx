import styled from "styled-components";
import { PlayerData } from "../../../../types";

export interface IBagsDataProps {
    data: PlayerData["bag"];
}

const Container = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Fader = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 3rem;
    font-weight: bold;  
`;
    
const Background = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0.3;
    z-index: -1;
    background: url(${(props: { img: string }) => props.img}) no-repeat center center;
`;

const BagsData = ({ data }: IBagsDataProps) => {
  return (
    <Container title={new Date(data.time ?? Date.now()).toLocaleString()}>
        <Fader>
            <Background img={"./images/torba.png"}></Background>
            {data.freeSpace ?? -1}
        </Fader>
        <Fader>
            <Background img={"./images/pot.png"}></Background>
            {data.potions ?? -1}
        </Fader>
        <Fader>
            <Background img={"./images/tep.png"}></Background>
            {data.teleports ?? -1}
        </Fader>
    </Container>
  );
}

export default BagsData;