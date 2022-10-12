import styled from "styled-components";
import { PlayerData } from "../../../../types";
import ProgressBar from "../ProgressBar";
import { timeToDateString } from "../Bot";

export interface IHeroDataProps {
    data: PlayerData["hero"];
    login: string;
}

const isOnWorldPage = () => document.querySelector("h1")?.innerText !== "All";
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const addZeros = (num: number, digits: number = 3): string => {
    let string = num.toString();
    while (string.length < digits) {
        string = "0" + string;
    }
    return string;
}
const parseGold = (gold: number): string => {
    const parsedMoney: [g: number, m: number, k: number, r: number] = [0, 0, 0, 0];
    const [g, m, k] = [1e9, 1e6, 1e3];
    while (gold > 0) {
        if (gold > g) {
            parsedMoney[0]++;
            gold -= g;
        } else if (gold > m) {
            parsedMoney[1]++;
            gold -= m;
        } else if (gold > k) {
            parsedMoney[2]++;
            gold -= k;
        } else {
            parsedMoney[3] += gold;
            break;
        }
    };
    if (parsedMoney[0] > 0) {
        return `${parsedMoney[0]}.${addZeros(parsedMoney[1])}g`;
    } else if (parsedMoney[1] > 0) {
        return `${parsedMoney[1]}.${addZeros(parsedMoney[2])}m`;
    } else if (parsedMoney[2] > 0) {
        return `${parsedMoney[2]}.${addZeros(parsedMoney[3])}k`;
    } else {
        return `${parsedMoney[3]}`;
    }
}

const Container = styled.div`
    display: flex;
`;

const Woj = styled.div`
    width: 30%;
    margin: 0.5rem;
    height: inherit;
    background: url(./images/woj.png) no-repeat center center;
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

    &:last-child {
        border-bottom: none;
    }
`;

const HeroData = ({ data, login }: IHeroDataProps) => {
  return (
    <Container>
        <Woj onClick={() => navigator.clipboard.writeText(login)} title={timeToDateString(data.time)}></Woj>
        <Data>
            <ProgressBar minValue={1} maxValue={data.maxhp ?? 1} currentValue={data.hp ?? 1} type="hp"/>
            <ProgressBar minValue={Math.pow((data.lvl ?? 1) - 1, 4) } maxValue={Math.pow(data.lvl ?? 0, 4)} currentValue={data.exp ?? 0} type="exp"/>
            <ProgressBar minValue={0} maxValue={360} currentValue={data.ttl === null || data.ttl < 0 ? 0 : data.ttl} type="ttl"/>
            <Field>{data.map}</Field>
            <Field>{parseGold(data.gold ?? 0)}</Field>
            { !isOnWorldPage() && <Field>{capitalize(data.worldname ?? "")}</Field> }
        </Data>
    </Container>
  );
}

export default HeroData;