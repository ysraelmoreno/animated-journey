import styled, { css } from 'styled-components';

interface ContainerProps {
  isScrolled: boolean;
}

export const Container = styled.header<ContainerProps>`
  position: fixed;
  overflow: hidden;

  width: 100%;
  height: 100px;
  transition: all 0.2s ease;
  top: 0;
  left: 0;
  -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.39);
  -moz-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.39);
  ${props =>
    props.isScrolled &&
    css`
      height: 50px;
    `}

  background: rgb(0, 52, 88);
  background: linear-gradient(
    9deg,
    rgba(0, 52, 88, 1) 0%,
    rgba(240, 17, 89, 1) 100%
  );

  display: flex;
  align-items: center;
  justify-content: space-around;

  nav {
    max-width: 1120px;

    ul {
      display: flex;
      flex-direction: row;
      list-style: none;
    }
  }

  button {
    display: none;
  }

  img {
    width: 2%;
  }

  @media (max-width: 600px) {
    height: 60px;
    width: 100vw;

    position: fixed;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
`;
