import { useEffect, useState } from 'react';
import {
  FiShoppingCart,
  FiDollarSign,
  FiStar,
  FiPlusCircle,
} from 'react-icons/fi';

import api from 'services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import Emoji from '../../components/Emoji';

import {
  Container,
  Content,
  ListOfCourses,
  Course,
  Teacher,
  Options,
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

function Courses(): JSX.Element {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api.get(`/courses/mycourses`).then(response => {
      setCourses(response.data);
    });
  }, []);

  return (
    <Container>
      <Menu />
      <Content>
        <Options>
          <h2>
            Você tem&nbsp;
            <strong>
              {courses.length}
              &nbsp;
              {courses.length === 1 ? 'curso cadastrado' : 'cursos cadastrados'}
            </strong>
          </h2>

          <Link to="/createcourse">
            <FiPlusCircle />
          </Link>
        </Options>
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
    </Container>
  );
}

export default Courses;
