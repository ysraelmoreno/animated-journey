import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

const toastTypeVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background-color: #fddede;
    color: #c53038;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 5px;

  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 10px;
  }

  background-color: #ebf8ff;
  color: #3172b7;

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.7;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 10px;
    top: 19px;
    background: transparent;
    border: 0;
    opacity: 0.6;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
