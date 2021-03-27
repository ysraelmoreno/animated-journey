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
import fakeuser from '../../assets/profileimage.svg';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
  HeadContent,
  UserImage,
  ProfileMenu,
  UserInfo,
  ProfileInputValues,
  DoubleInput,
} from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  avatarUrl: string;
  cpf: string;
}

interface ProfileFormData {
  avatar: File;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
}

function Profile(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const { user, signOut, updateUser } = useAuth();
  const { addToast } = useToast();

  const [userProfile, setUserProfile] = useState<User>();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string().email('Digite um email válido'),
          cpf: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          birthDate: data.birthDate,
          cpf: data.cpf,
          ...(data.avatar
            ? {
                avatar: data.avatar,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Conta atualizada com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na alteração de dados',
          description:
            'Ocorreu um erro ao realizar a alteração de seus dados, tente novamente.',
        });
      }
    },
    [addToast, updateUser],
  );

  useEffect(() => {
    api.get(`/profile`).then(response => {
      setUserProfile(response.data);
    });
  }, []);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);
        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Foto de perfil alterada com sucesso!',
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <HeadContent>
          <UserImage>
            {!userProfile?.avatarUrl ? (
              <img src={fakeuser} alt={user.name} />
            ) : (
              <img src={user.avatarUrl} alt={user.name} />
            )}

            <label htmlFor="avatar">
              <FiCamera size={20} />
            </label>
          </UserImage>

          <UserInfo>
            <div>
              <strong>{userProfile?.name}</strong>
              <span>Platina</span>
            </div>
            <Button onClick={signOut}>
              <FiPower />
            </Button>
          </UserInfo>
        </HeadContent>

        <ProfileMenu>
          <nav>
            <ul>
              <li>
                <a className="active" href="#dados">
                  Dados pessoais
                </a>
              </li>
              <li>
                <a href="#conqusitas">Conquistas</a>
              </li>
              <li>
                <a href="#financeiro">Financeiro</a>
              </li>
              <li>
                <a href="#perfil">Perfil público</a>
              </li>
              <li>
                <a href="#perfil">Senha</a>
              </li>
            </ul>
          </nav>
        </ProfileMenu>

        <ProfileInputValues>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              containerStyles={{ display: 'none' }}
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
            />

            <Input
              label="Nome Completo"
              onClick={e => {
                e.currentTarget.defaultValue = '';
              }}
              icon={FiUser}
              type="text"
              id="name"
              name="name"
              defaultValue={userProfile?.name}
            />

            <Input
              label="Email"
              onClick={e => {
                e.currentTarget.defaultValue = '';
              }}
              icon={FiMail}
              type="email"
              id="email"
              name="email"
              defaultValue={userProfile?.email}
            />

            <DoubleInput>
              <div>
                <Input
                  label="Data de nascimento"
                  onClick={e => {
                    e.currentTarget.defaultValue = '';
                  }}
                  icon={FiCalendar}
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  defaultValue={
                    userProfile?.birthDate
                      ? userProfile.birthDate.toString()
                      : ''
                  }
                />
              </div>
              <div>
                <Input
                  label="CPF"
                  onClick={e => {
                    e.currentTarget.defaultValue = '';
                  }}
                  icon={FiShield}
                  type="text"
                  id="cpf"
                  name="cpf"
                  disabled
                  value={userProfile?.cpf}
                  defaultValue={userProfile?.cpf}
                />
              </div>
            </DoubleInput>

            <Button type="submit">Alterar dados</Button>
          </Form>
        </ProfileInputValues>
      </Content>
    </Container>
  );
}

export default Profile;
