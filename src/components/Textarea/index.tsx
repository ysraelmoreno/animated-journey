import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error, InputContainer } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyles?: object;
  label?: string;
}

Input.defaultProps = {
  icon: '',
  label: '',
  containerStyles: {},
};

function Input({
  name,
  containerStyles,
  icon: Icon,
  label,
  ...rest
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <InputContainer>
      <label htmlFor={inputRef.current?.id}>{label}</label>
      <Container
        style={containerStyles}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <Icon size="20" />}
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size="20" />
          </Error>
        )}
      </Container>
    </InputContainer>
  );
}

export default Input;
