import React, { useRef } from 'react';

type Props = {
  onClickOutside: () => void;
  children: React.ReactNode;
  popoverWrapperClass?: string;
};

export default function ClickOutside({ onClickOutside, children, popoverWrapperClass }: Props) {
  const wrapperRef = useRef(null);

  function onClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    if (e.target === wrapperRef.current) {
      onClickOutside();
    }
  }
  return (
    <div ref={wrapperRef} className={popoverWrapperClass || ''} onMouseDown={onClick}>
      {children}
    </div>
  );
}
