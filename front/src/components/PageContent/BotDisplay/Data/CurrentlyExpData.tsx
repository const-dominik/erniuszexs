import styled from "styled-components";
import { PlayerData } from "../../../../types";


export interface IExpTimeProps {
  data: PlayerData["expTime"];
}

const Container = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem 0;
`;

const OnOffDot = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto 0 1.5rem;
  border-radius: 50%;
  background: ${(props: { on: 0 | 1 }) => props.on ? "green" : "red"};
  border: 2px solid ${(props: { on: 0 | 1 }) => props.on ? "rgb(23, 102, 6)" : "rgb(163, 19, 6)"};
`;

const DateContainer = styled.div`
  width: 80%;
`;

const ExpTime = (props: IExpTimeProps) => {
  let date: Date;
  if (props.data.time === null || props.data.timee === null) {
    date = new Date(0);
  } else {
    date = props.data.state === 0 ? new Date(props.data.timee) : new Date(props.data.time + props.data.timee);
  };
  return (
    <Container>
      <OnOffDot on={props.data.state ?? 0} />
      <DateContainer>
        {(props.data.state ? "Expię do: \n" : "Powrót o: \n") } <br/>
        { date.toLocaleString() }
      </ DateContainer>
    </Container>
  );
}

export default ExpTime;