import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface HeaderProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
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

export const Header = styled.div<HeaderProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1120px;
  height: 200px;
  width: 100%;

  color: #4f4f4f;

  padding: 30px 35px;
  border-radius: 10px;
  margin-bottom: 45px;
  background-color: #f3f3f3;
  border: 3px dashed #ccc;
  transition: all 0.2s ease;
  font-weight: 700;

  &:hover {
    background-color: ${shade(0.075, '#f3f3f3')};
  }

  ${props =>
    props.isActive &&
    css`
      border: 3px dashed ${shade(0.1, '#c0ffca')};

      background-color: #c0ffca;

      &:hover {
        background-color: ${shade(0.075, '#c0ffca')};
      }
    `}
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
  margin-bottom: 20px;
  div {
    width: 100%;

    & + div {
      margin-left: 30px;
    }
  }
`;

export const TitleSection = styled.div`
  margin: 10px 0;
  span {
    color: #a5a5a5;
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
