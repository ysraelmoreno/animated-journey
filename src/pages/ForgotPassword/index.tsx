import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from 'services/api';
import { Container, Content, AnimationContainer, Background } from './styles';

import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ForgotPasswordFormData {
  email: string;
}

function ForgotPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('Email obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Pedido de recuperação de senha realizado',
          description:
            'O próximo passo é ir ao seu email e entrar no link para que você altere sua senha.',
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao fazer o seu pedido de recuperação de senha. Tente novamente mais tarde',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
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
              <h4>Recupere sua senha</h4>

              <Input
                icon={FiMail}
                name="email"
                type="text"
                placeholder="Email"
              />

              <Button loading={loading} type="submit">
                Recuperar
              </Button>
              <p>
                <Link to="/"> Voltar ao login</Link>
              </p>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
}

export default ForgotPassword;
