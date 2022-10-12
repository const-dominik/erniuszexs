import styled from "styled-components";
import { PlayerData } from "../../../../types";
import { timeToDateString } from "../Bot";

export interface ILastDeathDataProps {
    data: PlayerData["dead"];
}

interface IFieldProps {
    isDead?: boolean;
}

const Container = styled.div`
    display: flex;
`;

const Tomb = styled.div`
    width: 30%;
    margin: 0.5rem;
    height: inherit;
    background: url(./images/rip.png) no-repeat center center;
    background-size: contain;
    z-index: 10;
`;

const Data = styled.div`
    width: 70%;
`;

const Field = styled.div`
    text-align: center;
    width: 80%;
    margin: 0 auto;
    padding: 0.3rem 0;
    border-bottom: 1px dotted black;
    color: ${(props: IFieldProps) => props.isDead === undefined ? "black" : props.isDead ? "red" : "green"};

    &:last-child {
        border-bottom: none;
    }
`;

const calculateRespawn = (respawn: number, deathTime: number): [respawnAt: number, isDead: boolean] => {
    const respawnAt = deathTime + respawn * 1000;
    const isDead = respawnAt > Date.now();
    return [respawnAt, isDead];
}

const parseMob = (mob: string): string => {
    const mobs = mob.split(", ");
    if (mobs.length > 1) {
        return `${mobs[0]}, ...`;
    }
    return mob;
};

const LastDeathData = (props: ILastDeathDataProps) => {
    const [respawnAt, isDead] = calculateRespawn(props.data.respawn ?? 0, props.data.time ?? Date.now());
    const respawnDate = new Date(respawnAt);

    return (
    <Container>
        <Data>
            <Field isDead={isDead} title={respawnDate.toLocaleString()}>Respawn: {respawnDate.toLocaleTimeString()}</Field>
            <Field>{ props.data.map ?? "No data yet :(" }</Field>
            <Field title={props.data.mob ?? ""}>{ parseMob(props.data.mob ?? "Pity :(") }</Field>
        </Data>
        <Tomb title={timeToDateString(props.data.time)}></Tomb>
    </Container>
  );
}

export default LastDeathData;