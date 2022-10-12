import { useEffect, useState } from 'react';
import Menu from './Menu/Menu';
import PageContent from './PageContent/PageContainer';
import styled from 'styled-components';
import { PlayerData, worlds, PossibleDisplays } from '../types';

const Container = styled.div`
  display: flex;
`;

const initialState: PossibleDisplays = "all";
const initialPage: PlayerData[] = [];

const MainPage = () => {
  const [world, setWorld] = useState<PossibleDisplays>(initialState);
  const [bots, setBots] = useState<PlayerData[]>(initialPage);

  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:5000/api/getAccounts/" + world);
      const accounts = await data.json();
      setBots(accounts);
    })();
  }, [world]);

  const changeWorldHandler = (dataToDisplay: PossibleDisplays) => {
    setWorld(dataToDisplay);
  };

  return (
    <Container>
        <Menu items={worlds} onClick={changeWorldHandler}/>
        <PageContent worldName={world} data={bots || []}/>
    </Container>
  );
}

export default MainPage;