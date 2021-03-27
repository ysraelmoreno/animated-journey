import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  FiTag,
  FiFolder,
  FiType,
  FiCamera,
  FiPower,
  FiTrash,
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
} from 'react-icons/fi';

import { useDropzone } from 'react-dropzone';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useHistory, useParams } from 'react-router-dom';

import { useAuth } from 'hooks/AuthContext';
import api from 'services/api';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Menu from '../../components/Menu';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Header, DoubleInput, Checkbox } from './styles';

interface IParams {
  id: string;
}

interface Course {
  name: string;
  description: string;
  category: string;
  principalImageUrl: string;
}

interface CourseFormData {
  name: string;
  description: string;
  category: string;
  principalImage: FileList | null;
}

function EditCourse(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const [image, setImage] = useState<FileList | null>(null);
  const history = useHistory();

  const { user } = useAuth();
  const { addToast } = useToast();

  const [course, setCourse] = useState<Course>();

  const { id }: IParams = useParams();

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    api.get(`/courses/${id}`).then(response => {
      setCourse(response.data);
      console.log(response.data);
    });
  }, [id]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await api.delete(`/courses/delete/${id}`);

      if (response.data.courseDeleted === true) {
        addToast({
          type: 'success',
          title: 'Curso deletado com sucesso',
        });
      }

      history.push('/dashboard');
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
  }, [addToast, id]);

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

        const response = await api.put(`/courses/${id}`, formedData);

        addToast({
          type: 'success',
          title: 'Curso alterado com sucesso',
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
    [addToast, image],
  );

  return (
    <Container>
      <Menu />
      <Content>
        {course && (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Header background={course.principalImageUrl} {...getRootProps()}>
              {isDragActive ? (
                <p>Arraste a foto de capa do seu curso aqui...</p>
              ) : (
                <>
                  {image ? (
                    <p>Foto enviada</p>
                  ) : (
                    <p>Clique para enviar uma foto</p>
                  )}
                  <label>
                    <FiCamera size={20} />
                  </label>
                </>
              )}
            </Header>
            <Input
              defaultValue={course.name}
              icon={FiType}
              label="Qual o título do seu curso?"
              placeholder="Insira o título do seu curso"
              type="text"
              name="name"
              id="name"
            />
            <Textarea
              onClick={e => {
                e.currentTarget.defaultValue = '';
              }}
              defaultValue={course.description}
              id="description"
              label="Descreva o seu curso"
              name="description"
              rows={20}
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
            <DoubleInput>
              <Checkbox>
                <label htmlFor="affiliate">É possível se afiliar?</label>
                <input
                  type="checkbox"
                  value="affiliate"
                  id="affiliate"
                  name="affiliate"
                />
              </Checkbox>
              <div>
                <Button type="button" onClick={handleDelete}>
                  <FiTrash />
                  Deletar curso
                </Button>
              </div>
            </DoubleInput>

            <Button type="submit">Cadastrar curso</Button>
          </Form>
        )}
      </Content>
    </Container>
  );
}

export default EditCourse;
