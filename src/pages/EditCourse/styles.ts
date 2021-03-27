import { shade } from 'polished';
import styled from 'styled-components';

interface IHeaderProps {
  background: string;
}

export const Container = styled.div`
  display: flex;
  max-width: 1120px;
  width: 100%;
  justify-content: center;

  margin: 0 auto;
`;

export const Content = styled.main`
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin-top: 100px;
  align-items: flex-start;
  justify-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;

  form {
    width: 100%;
    max-width: 1120px;
  }
`;

export const Header = styled.div<IHeaderProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 1120px;
  height: 200px;
  width: 100%;

  color: white;

  padding: 30px 35px;
  border-radius: 10px;
  margin-bottom: 45px;
  background-image: linear-gradient(
      to left,
      rgba(0, 52, 88, 0.5),
      rgba(240, 17, 89, 0.5)
    ),
    url(${props => props.background});
  background-size: cover;
  background-position: center;
  label {
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    font-size: 20px;
    align-self: flex-end;

    margin-bottom: -50px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: linear-gradient(
      to left,
      rgba(0, 52, 88, 0.9),
      rgba(240, 17, 89, 1)
    );
  }

  div {
    width: 100%;
    border: none;

    padding: 0;

    input {
      color: white;
      font-weight: 700;
      font-size: 28px;
      &::placeholder {
        color: white;
      }
    }
  }
`;

export const DoubleInput = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  div {
    width: 100%;

    button {
      background-color: transparent;
      color: red;
      width: 40%;
      height: inherit;
      &:hover {
        background-color: transparent;
        color: ${shade(0.1, '#FF0000')};
      }

      svg {
        margin-right: 10px;
      }
    }

    & + div {
      display: flex;
      justify-content: flex-end;
      margin-left: 30px;
    }
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }
  margin-bottom: 20px;
`;
