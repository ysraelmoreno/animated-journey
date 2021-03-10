import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import api from 'services/api';
import { Container, Content, AnimationContainer, Background } from './styles';

import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

function ResetPassword(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senhas devem ser iguais  ',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, passwordConfirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }
        await api.post('/password/reset', {
          password,
          passwordConfirmation,
          token,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar sua senha, tente novamente mais tarde.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <h1>A plataforma perfeita para afiliados</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              porta volutpat egestas consequat, aliquet at gravida. Morbi
              sodales felis viverra quisque hac elementum sed tortor praesent.
            </p>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h4>Resetar senha</h4>

              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Nova senha"
              />

              <Input
                icon={FiLock}
                name="passwordConfirmation"
                type="password"
                placeholder="Confirmação da senha"
              />

              <Button type="submit">Alterar senha</Button>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
}

export default ResetPassword;
