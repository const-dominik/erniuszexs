import styled from "styled-components";
import { PlayerData } from "../../../../types";

export interface IBotErrorProps {
    data: PlayerData["error"];
    heroTime: PlayerData["hero"]["time"];
}

const StyledField = styled.div`
    padding: 0.4rem;
    width: 90%;
    height: 90%;
    background: ${(props: { isInGame: boolean }) => props.isInGame ? "rgba(90, 90, 90, 0.4)" : "rgba(255, 0, 0, 0.2)"};
    margin: .4rem auto .4rem auto;
    text-align: center;
    border-radius: .4rem;
`;

const BotError = (props: IBotErrorProps) => {
    const isInGame: boolean = (props.heroTime ?? Date.now()) > (props.data.time ?? 0);
    return (
        <StyledField title={new Date(props.data.time ?? Date.now()).toLocaleString()} isInGame={isInGame}>
            { props.data.message }
        </StyledField>
    );
}

export default BotError;