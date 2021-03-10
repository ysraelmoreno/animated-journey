import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  FiCamera,
  FiPower,
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { useAuth } from 'hooks/AuthContext';
import api from 'services/api';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
  Header,
  DoubleInput,
  TitleSection,
} from './styles';

function CreateCourse(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const { user, signOut, updateUser } = useAuth();
  const { addToast } = useToast();

  const [tags, setTags] = useState([]);

  return (
    <Container>
      <Menu />
      <Content>
        <TitleSection>
          <h3>
            Crie seu curso agora,&nbsp;
            {user.name}
          </h3>
        </TitleSection>
        <Header>
          <Form
            ref={formRef}
            onSubmit={() => {
              console.log('submitted');
            }}
          >
            <Input
              label="Título do curso"
              type="text"
              name="title"
              id="title"
            />
            <DoubleInput>
              <div>
                <Input label="Tags" type="text" name="tags" id="tags" />
              </div>
              <div>
                <Input
                  label="Categoria"
                  type="text"
                  name="category"
                  id="category"
                />
              </div>
            </DoubleInput>
          </Form>
        </Header>
      </Content>
    </Container>
  );
}

export default CreateCourse;
