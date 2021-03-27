import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface BackgroundProps {
  background: string;
}

interface ButtonProps {
  isLiked: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin-top: 120px;
  width: 100%;
`;

export const Header = styled.div<BackgroundProps>`
  background-image: linear-gradient(
      to left,
      rgba(0, 52, 88, 0.5),
      rgba(240, 17, 89, 0.5)
    ),
    url(${props => props.background});

  background-position: center;
  background-size: cover;
  border-radius: 5px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 250px;

  padding: 30px;

  color: white;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 20px;

    border-radius: 50%;
    margin-top: 20px;
    margin-bottom: -50px;

    background: linear-gradient(
      to left,
      rgba(0, 52, 88, 1),
      rgba(240, 17, 89, 1)
    );

    width: 50px;
    height: 50px;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(
        to left,
        rgba(0, 39, 66, 1),
        rgba(240, 17, 89, 1)
      );
    }
  }
`;

export const Info = styled.div`
  margin-top: 10px;

  h3 {
    svg {
      margin-right: 5px;
    }
    color: #858585;
  }

  p {
    margin: 10px 0;
  }
`;

export const LikeButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  width: 30px;
  height: 30px;

  transition: all 0.2s ease;

  font-size: 15px;

  ${props =>
    props.isLiked &&
    css`
      color: #fff;
    `}
  margin-right: 10px;
  color: #858585;
  &:hover {
    background: transparent;
    color: black;
  }
  svg {
    margin-right: 5px;
  }
`;

export const SocialButtons = styled.div`
  display: flex;

  margin-top: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;

    width: 30px;
    height: 30px;

    font-size: 15px;

    margin-right: 10px;
    color: #858585;

    &:hover {
      background: transparent;
      color: black;
    }
    svg {
      margin-right: 5px;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    transition: all 0.2s ease;
    width: 30px;
    height: 30px;
    font-size: 15px;

    color: #858585;

    &:hover {
      background: transparent;
      color: black;
    }
    svg {
      margin-right: 5px;
    }
  }
`;
