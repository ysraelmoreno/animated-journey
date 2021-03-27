import React, { AllHTMLAttributes } from 'react';

interface EmojiProps extends AllHTMLAttributes<HTMLSpanElement> {
  label: string;
  symbol: string;
}

function Emoji({ label, symbol, ...rest }: EmojiProps): JSX.Element {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
      {...rest}
    >
      {symbol}
    </span>
  );
}

export default Emoji;
