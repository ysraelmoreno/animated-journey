import { useCallback, useEffect, useState } from 'react';
import {
  FiShoppingCart,
  FiDollarSign,
  FiStar,
  FiPlusCircle,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { useAuth } from 'hooks/AuthContext';
import api from 'services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import Button from '../../components/Button';

import {
  Container,
  Content,
  ListOfCourses,
  Course,
  Teacher,
  Options,
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
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [countCourses, setCountCourses] = useState(0);

  const handleSubmit = useCallback(() => {
    console.log('submited');
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
        <Options>
          <h2>
            Você tem&nbsp;
            <strong>
              {courses.length}
              &nbsp;curso cadastrado
            </strong>
          </h2>

          <Link to="/createcourse">
            <FiPlusCircle />
          </Link>
        </Options>
        <ListOfCourses>
          {courses.map(course => (
            <Course key={course.id} background={course.principalImageUrl}>
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
                <img src={course.teacher.avatarUrl} alt={course.teacher.name} />
                <p>{course.teacher.name}</p>
              </Teacher>
            </Course>
          ))}
        </ListOfCourses>
      </Content>
    </Container>
  );
}

export default Courses;
