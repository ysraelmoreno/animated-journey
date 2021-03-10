import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, cheque suas credenciais.',
        });
      }
    },
    [signIn, addToast, history],
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
              <h4>Faça seu login</h4>

              <Input
                icon={FiMail}
                name="email"
                type="text"
                placeholder="Email"
              />
              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Senha"
              />
              <Link to="/forgotpassword">Esqueci minha senha </Link>
              <Button type="submit">Entrar</Button>
              <p>
                Ainda não é um membro?
                <Link to="/signup"> Faça seu cadastro</Link>
              </p>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
}

export default SignIn;
