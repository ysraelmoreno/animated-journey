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

  form {
    width: 100%;
    max-width: 1120px;
  }
`;

export const Header = styled.div`
  display: flex;
  max-width: 1120px;
  width: 100%;

  label {
    color: #003458;
  }
`;

export const DoubleInput = styled.div`
  display: flex;

  div {
    width: 100%;

    & + div {
      margin-left: 30px;
    }
  }
`;

export const TitleSection = styled.div`
  margin: 10px 0;
`;
