import Header from './PageHeader';
import Content from './Content'
import { World, PlayerData, PossibleDisplays } from '../../types';
import styled from 'styled-components';

export interface IPageContentProps {
    worldName: PossibleDisplays;
    data: PlayerData[]
}

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const PageContent = (props: IPageContentProps) => {
  return (
    <Page>
      <Header worldName={props.worldName} />
      <Content data={props.data}/>
    </Page>
  );
}

export default PageContent;