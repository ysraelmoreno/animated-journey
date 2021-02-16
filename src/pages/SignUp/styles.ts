import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  background-color: #f1f1f1;
`;
export const Content = styled.div`
  display: flex;

  justify-content: center;
  align-content: center;
  flex-direction: column;

  background-color: #f1f1f1;

  width: 100%;
  max-width: 550px;

  padding: 5%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 0.5s ease-in-out;

  form {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    text-align: center;

    h4 {
      color: #003458;
    }
  }

  h1 {
    color: #003458;
    margin-bottom: 10px;
  }

  a {
    color: #f01159;
    transition: all 0.2s ease;
    &:hover {
      color: ${shade(0.15, '#f01159')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
