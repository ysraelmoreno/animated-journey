import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

Tooltip.defaultProps = {
  className: '',
};

function Tooltip({
  title,
  className = '',
  children,
}: TooltipProps): JSX.Element {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

export default Tooltip;
