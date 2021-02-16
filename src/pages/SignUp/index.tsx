import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Conta criada com sucesso',
          description: 'Você já pode fazer seu login na One!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao realizar o seu cadastro, tente novamente.',
        });
      }
    },
    [history, addToast],
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
              <h4>Faça seu cadastro</h4>
              <Input
                icon={FiUser}
                name="name"
                type="text"
                placeholder="Nome completo"
              />
              <Input
                icon={FiMail}
                name="email"
                type="email"
                placeholder="Email"
              />
              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Entrar</Button>
              <p>
                Já é um membro?
                <Link to="/"> Faça seu login</Link>
              </p>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
}

export default SignUp;
