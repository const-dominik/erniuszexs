import styled from "styled-components"

export interface IAppProps {
    nick: string | null;
    id: number | null;
}

const StyledHeader = styled.h3`
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
`
const getProfileUrl = (id: number | null): string => {
    if (!id) return "";
    return `https://www.margonem.pl/profile/view,${id}`;
} 

const App = (props: IAppProps) => {
  return (
    <StyledHeader onClick={() => window.open(getProfileUrl(props.id))}>{props.nick && props.nick}</StyledHeader>
  );
}

export default App;