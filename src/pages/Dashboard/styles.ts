import { shade } from 'polished';
import styled from 'styled-components';

interface BackgroundProps {
  background: string;
}

export const AddCourseDiv = styled.div`
  width: 100%;
  height: 100vh;

  background-color: #e2e2e2;
  transition: all 0.2s ease;
  border: 3px dashed #ccc;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${shade(0.075, '#e2e2e2')};

    border: 3px dashed ${shade(0.1, '#ccc')};
  }

  button {
    width: 30%;
  }

  span {
    font-size: 50px;
  }

  h1 {
    font-size: 17px;
    text-align: center;
    color: #4f4f4f;
    margin: 20px 0;
  }
`;

export const Head = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
  }

  h2 {
    color: #003458;

    strong {
      color: #f01159;

      transition: all 0.2s ease;
      &:hover {
        color: ${shade(0.3, '#f01159')};
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-content: center;
  justify-items: center;
  justify-content: center;

  max-width: 1120px;
  margin: 90px auto 0;
`;
export const Content = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;

export const ListOfCourses = styled.div`
  width: 100%;
  max-width: 790px;
  min-width: 350px;
`;

export const InfoUser = styled.aside`
  width: 100%;

  height: 250px;
  margin-top: 85px;
  padding: 30px;

  background: transparent;
  border: 1px solid #003458;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .userMoney {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .userTools {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin: 0 20px;
      border: 2px solid #f01159;
      padding: 5px;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  a {
    background: none;
    border: 1px solid #003458;
    border-radius: 50px;
    display: flex;
    padding: 10px;
    color: #003458;
    transition: all 0.2s ease;
  }

  a:hover {
    background-color: #003458;
    color: white;
  }

  button {
    background: none;
    border: 1px solid #003458;
    border-radius: 50px;
    display: flex;
    padding: 10px;
    color: #003458;
    transition: all 0.2s ease;
  }

  button:hover {
    background-color: #003458;
    color: white;
  }

  h3 {
    color: #003458;
    font-size: 35px;
  }
`;

export const Course = styled.div<BackgroundProps>`
  a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
  }

  border-radius: 5px;
  background-image: linear-gradient(
      to left,
      rgba(0, 52, 88, 0.5),
      rgba(240, 17, 89, 0.5)
    ),
    url(${props => props.background});

  background-size: cover;
  background-position: center;

  padding: 30px;

  & + div {
    margin-top: 20px;
  }

  h2 {
    color: white;
  }

  svg {
    margin-right: 10px;
  }

  p {
    color: white;
    margin: 10px 0;
  }
`;

export const Teacher = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const SideBar = styled.div``;
