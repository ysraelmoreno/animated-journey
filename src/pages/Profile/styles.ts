import { shade } from 'polished';
import styled from 'styled-components';

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
`;

export const HeadContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 40px;
    height: 40px;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;

    border: 2px solid #f01159;
    padding: 10px;
  }
`;

export const UserImage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-items: center;

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    margin-top: -70px;
    margin-left: -70px;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background: #003458;

    svg {
      color: white;
    }

    &:hover {
      background: ${shade(0.3, '#003458')};
    }
  }
`;

export const ProfileMenu = styled.div`
  margin-top: 20px;

  width: 100%;

  padding-bottom: 5px;

  border-bottom: 1px solid #e8e8e8;

  ul {
    list-style: none;
  }
  li {
    padding: 10px;
    display: inline-block;

    .active {
      color: #f01159;
    }

    a {
      text-decoration: none;
      font-weight: 700;
      color: #c6c6c6;

      transition: all 0.2s ease;

      &:hover {
        color: #f01159;
      }
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  margin-left: 30px;

  button {
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;

    margin: 0 0 0 15px;

    transition: all 0.2s ease;

    background: #003458;

    &:hover {
      background: ${shade(0.3, '#003458')};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    color: #003458;

    strong {
      font-size: 35px;
    }

    span {
      text-transform: uppercase;
      letter-spacing: 12px;
    }
  }
`;

export const ProfileInputValues = styled.section`
  padding: 10px;
  width: 100%;

  label {
    color: #003458;
  }

  div {
    width: 100%;
  }

  button {
    &:hover {
      background: ${shade(0.3, '#f01159')};
    }
  }
`;

export const DoubleInput = styled.div`
  display: flex;
  margin-bottom: 10px;

  div {
    & + div {
      padding-left: 20px;
    }
  }
`;
