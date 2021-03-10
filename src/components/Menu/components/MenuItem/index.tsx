import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface MenuItemProps {
  children: ReactNode;
  linksTo: string;
}

function Menu({ children, linksTo }: MenuItemProps): JSX.Element {
  return (
    <Container>
      <Link to={linksTo}>{children}</Link>
    </Container>
  );
}

export default Menu;
