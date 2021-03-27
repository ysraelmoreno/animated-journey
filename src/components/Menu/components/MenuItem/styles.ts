import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  margin-left: 30px;
  font-size: 15px;
  font-weight: 600;
  position: relative;
  a {
    color: white;
    text-decoration: none;
    z-index: 999;
  }

  &::after {
    content: '';
    height: 35px;

    margin-top: -7px;
    margin-left: -5px;

    border-radius: 5px;
    position: absolute;
    width: 0;
    background: rgb(0, 52, 88);
    background: linear-gradient(
      9deg,
      rgba(0, 52, 88, 1) 0%,
      rgba(240, 17, 89, 1) 100%
    );
    transition: all 0.2s ease;
  }

  &:hover::after {
    width: 120%;
    -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.39);
    -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.39);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.39);
  }
  svg {
    margin-right: 10px;
  }
`;
