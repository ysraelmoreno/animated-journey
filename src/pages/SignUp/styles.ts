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
  justify-items: center;
  align-items: center;
  flex-direction: column;

  background-color: #f1f1f1;

  width: 100%;
  max-width: 750px;

  padding: 0 5%;
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
  max-width: 450px;

  form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    text-align: center;

    h4 {
      color: #003458;
    }

    p {
      margin-top: 30px;

      a {
        color: #f01159;
        transition: all 0.2s ease;
        &:hover {
          color: ${shade(0.15, '#f01159')};
        }
      }
    }
  }

  h1 {
    color: #003458;
    margin-bottom: 10px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
