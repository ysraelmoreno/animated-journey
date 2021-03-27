import { useCallback, useRef, useState } from 'react';
import { FiCamera, FiTag, FiFolder, FiType } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';

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
import Textarea from '../../components/Textarea';
import Emoji from '../../components/Emoji';

import {
  Container,
  Content,
  Header,
  DoubleInput,
  TitleSection,
  Checkbox,
} from './styles';

interface CourseFormData {
  name: string;
  description: string;
  category: string;
  principalImage: FileList | null;
}

function CreateCourse(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const [image, setImage] = useState<FileList | null>(null);
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  // const [tags, setTags] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = useCallback(
    async (data: CourseFormData) => {
      try {
        formRef.current?.setErrors({});

        const formedData = new FormData();

        const schema = Yup.object().shape({
          name: Yup.string(),
          description: Yup.string(),
          category: Yup.string(),
          tags: Yup.string(),
          affiliate: Yup.boolean(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (image) {
          formedData.append('name', data.name);
          formedData.append('description', data.description);
          formedData.append('principalImage', image[0]);
        }

        const response = await api.post('/courses', formedData);

        addToast({
          type: 'success',
          title: 'Curso criado com sucesso',
        });

        history.push(`/course/${response.data.id}`);
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
    [addToast, image],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <TitleSection>
          <span>
            Crie seu curso agora,&nbsp;
            {user.name}
          </span>
        </TitleSection>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Header isActive={!!image} {...getRootProps()}>
            {isDragActive ? (
              <p>Arraste a foto de capa do seu curso aqui...</p>
            ) : (
              <>
                {image ? (
                  <>
                    <Emoji style={{ fontSize: 50 }} label="✅" symbol="✅" />
                    <p>Foto enviada</p>
                  </>
                ) : (
                  <>
                    <Emoji style={{ fontSize: 50 }} symbol="📷" label="📷" />
                    <p>Arraste ou clique para enviar uma foto</p>
                  </>
                )}
              </>
            )}
          </Header>
          <Input
            icon={FiType}
            label="Qual o título do seu curso?"
            placeholder="Insira o título do seu curso"
            type="text"
            name="name"
            id="name"
          />
          <Textarea
            id="description"
            label="Descreva o seu curso"
            name="description"
            rows={5}
            cols={33}
          />
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="principalImage"
            name="principalImage"
            type="file"
            {...getInputProps()}
          />
          <DoubleInput>
            <div>
              <Input
                icon={FiTag}
                placeholder="Tags"
                label="Tags"
                type="text"
                name="tags"
                id="tags"
              />
            </div>
            <div>
              <Input
                icon={FiFolder}
                placeholder="Categoria"
                label="Categoria"
                type="text"
                name="category"
                id="category"
              />
            </div>
          </DoubleInput>
          <Checkbox>
            <label htmlFor="affiliate">É possível se afiliar?</label>
            <input
              type="checkbox"
              value="affiliate"
              id="affiliate"
              name="affiliate"
            />
          </Checkbox>
          <Button type="submit">Cadastrar curso</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default CreateCourse;
