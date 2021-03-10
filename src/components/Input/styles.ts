import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  padding: 15px 10px;
  width: 100%;

  border: 1px solid #003458;
  border-radius: 5px;
  color: #003458;

  margin: 10px 0;

  svg {
    margin-right: 10px;
    color: #878787;
  }

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid #c53030;
    `};

  ${props =>
    props.isFocused &&
    css`
      svg {
        color: #003458;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #003458;
      }
    `}



  input {
    border: none;
    width: 100%;
    background-color: transparent;
    color: #003458;

    &::placeholder {
      color: #878787;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
