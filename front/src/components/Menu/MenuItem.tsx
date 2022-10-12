import { World } from '../../types';
import styled from 'styled-components';

export interface IMenuItemProps {
    world: World;
    onClick: Function;
}

const Li = styled.li`
  padding-bottom: .6rem;
  border-bottom: 1px solid #a25990;
  cursor: pointer;
`

const capitalize = (s: World) => s.charAt(0).toUpperCase() + s.slice(1);

const MenuItem = (props: IMenuItemProps) => {
  return (
      <Li onClick={() => props.onClick(props.world)}> 
        {capitalize(props.world)}
      </Li>
  );
}

export default MenuItem;