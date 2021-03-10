import { useState } from 'react';
import {
  FiHome,
  FiPackage,
  FiBook,
  FiBox,
  FiTool,
  FiUsers,
} from 'react-icons/fi';

import fakelogo from '../../assets/fakelogo.svg';
import MenuItem from './components/MenuItem';
import { Container } from './styles';

function Menu(): JSX.Element {
  const [navbar, setNavbar] = useState(false);

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  });

  return (
    <Container isScrolled={navbar}>
      <img src={fakelogo} alt="Fake Logo" />
      <nav>
        <ul>
          <MenuItem linksTo="/">
            <FiHome />
            Painel
          </MenuItem>

          <MenuItem linksTo="/">
            <FiPackage />
            Mercado
          </MenuItem>

          <MenuItem linksTo="/courses">
            <FiBook />
            Cursos
          </MenuItem>

          <MenuItem linksTo="/">
            <FiBox />
            Produtos
          </MenuItem>

          <MenuItem linksTo="/">
            <FiTool />
            Ferramentas
          </MenuItem>

          <MenuItem linksTo="/">
            <FiUsers />
            Afiliado
          </MenuItem>
        </ul>
      </nav>
    </Container>
  );
}

export default Menu;
