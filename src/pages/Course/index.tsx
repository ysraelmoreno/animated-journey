import { useCallback, useEffect, useState } from 'react';
import { FiTag, FiHeart, FiEdit } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from 'hooks/AuthContext';
import api from 'services/api';
import Menu from '../../components/Menu';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Header,
  Info,
  SocialButtons,
  LikeButton,
} from './styles';

interface Likes {
  count: number;
  currentUserLiked: boolean;
}

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

interface IParams {
  id: string;
}

function Course(): JSX.Element {
  const { user } = useAuth();

  const [singleCourse, setSingleCourse] = useState<Course>();
  const [likes, setLikes] = useState<Likes>({
    count: 0,
    currentUserLiked: false,
  });

  const { id }: IParams = useParams();
  let textSplited: string[];

  singleCourse
    ? (textSplited = singleCourse.description.split('\n'))
    : (textSplited = ['']);

  const handleLikeClick = useCallback(() => {
    if (singleCourse) {
      api.post(`/courses/like/${singleCourse.id}`);
    }
  }, [singleCourse]);

  useEffect(() => {
    if (singleCourse) {
      api.get(`/courses/like/${singleCourse.id}`).then(response => {
        setLikes(response.data);
      });
    }
  }, [singleCourse]);

  useEffect(() => {
    api.get(`/courses/${id}`).then(response => {
      setSingleCourse(response.data);
    });
  }, [id]);

  return (
    <Container>
      <Menu />
      <Content>
        <Header background={singleCourse ? singleCourse.principalImageUrl : ''}>
          <div>
            <h1>{singleCourse?.name}</h1>
            <span>
              Professor: &nbsp;
              {singleCourse?.teacher.name}
            </span>
          </div>
          <div>
            {user.id === singleCourse?.teacher.id ? (
              <Link
                to={{
                  pathname: `/editcourse/${singleCourse.id}`,
                  state: { fromCourse: true },
                }}
              >
                <FiEdit />
              </Link>
            ) : (
              ''
            )}
          </div>
        </Header>
        <SocialButtons>
          <LikeButton
            isLiked={likes.currentUserLiked}
            onClick={handleLikeClick}
          >
            <FiHeart />
            {likes.count}
          </LikeButton>
        </SocialButtons>
        <Info>
          <h3>Descrição</h3>
          {textSplited.map(text => {
            return <p key={text[0]}>{text}</p>;
          })}
          <h3>
            <FiTag strokeWidth="3" />
            Tags
          </h3>
        </Info>
      </Content>
    </Container>
  );
}

export default Course;
