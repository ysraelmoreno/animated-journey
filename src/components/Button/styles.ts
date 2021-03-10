import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: #f01159;

  width: 100%;

  font-weight: 600;
  color: white;

  height: 50px;

  border: none;
  border-radius: 5px;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${shade(0.15, '#f01159')};
  }
`;
