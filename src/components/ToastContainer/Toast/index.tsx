import React, { useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/Toast';
import { Container } from './styles';

import Emoji from '../../Emoji';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <Emoji label="info" symbol="🧐" />,
  error: <Emoji label="error" symbol="😢" />,
  success: <Emoji label="sucess" symbol="🥳" />,
};

function Toast({ message, style }: ToastProps): JSX.Element {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

export default Toast;
