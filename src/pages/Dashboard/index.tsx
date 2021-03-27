import { useCallback, useEffect, useState } from 'react';
import {
  FiBookmark,
  FiSettings,
  FiSearch,
  FiShoppingCart,
  FiDollarSign,
  FiStar,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { useAuth } from 'hooks/AuthContext';
import api from 'services/api';
import { Link } from 'react-router-dom';
import Emoji from 'components/Emoji';
import Menu from '../../components/Menu';
import Input from '../../components/Input';
import Button from '../../components/Button';
import fakeprofileimage from '../../assets/profileimage.svg';

import {
  Container,
  Content,
  ListOfCourses,
  InfoUser,
  SideBar,
  Course,
  Teacher,
  Head,
  AddCourseDiv,
} from './styles';

interface Course {
  id: string;
  name: string;
  description: string;
  teacher: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  principalImageUrl: string;
}

function Dashboard(): JSX.Element {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);

  const handleSubmit = useCallback(() => {
    console.log('Submitted');
  }, []);

  useEffect(() => {
    api.get(`/courses/mycourses`).then(response => {
      setCourses(response.data);
    });
  }, []);

  return (
    <Container>
      <Menu />

      <Content>
        <Head>
          <h2>
            Olá,
            <Link to="/profile">
              <strong>
                &nbsp;
                {user.name}
              </strong>
            </Link>
          </h2>
        </Head>
        <ListOfCourses>
          {courses.length !== 0 ? (
            courses.map(course => (
              <Course key={course.id} background={course.principalImageUrl}>
                <Link to={`/course/${course.id}`}>
                  <div>
                    <h2>{course.name}</h2>
                    <p>
                      <FiShoppingCart />
                      135 vendas
                    </p>
                    <p>
                      <FiDollarSign />
                      R$1335,23
                    </p>
                    <p>
                      <FiStar />
                      4,8
                    </p>
                  </div>
                  <Teacher>
                    <img
                      src={course.teacher.avatarUrl}
                      alt={course.teacher.name}
                    />
                    <p>{course.teacher.name}</p>
                  </Teacher>
                </Link>
              </Course>
            ))
          ) : (
            <Link to="/createcourse">
              <AddCourseDiv>
                <Emoji label="😰" symbol="😰" />
                <h1>Parece que você não tem nenhum curso cadastrado</h1>
                <p>Crie seu curso agora clicando aqui</p>
              </AddCourseDiv>
            </Link>
          )}
        </ListOfCourses>
      </Content>
      <SideBar>
        <InfoUser>
          <div className="userTools">
            <button type="button">
              <FiBookmark size="20" />
            </button>

            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} />
            ) : (
              <img src={fakeprofileimage} alt="Profile" />
            )}

            <Link to="/profile">
              <FiSettings size="20" />
            </Link>
          </div>
          <div className="userMoney">
            <h3>R$00,00</h3>
            <p>saldo</p>
          </div>
        </InfoUser>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Comprar um produto" name="buy" icon={FiSearch} />
        </Form>
      </SideBar>
    </Container>
  );
}

export default Dashboard;
