import React, { useRef } from 'react';

type Props = {
  onClickOutside: () => void;
  children: React.ReactNode;
};

export default function ClickOutside({ onClickOutside, children }: Props) {
  const wrapperRef = useRef(null);

  function onClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    if (e.target === wrapperRef.current) {
      onClickOutside();
    }
  }
  return (
    <div ref={wrapperRef} className="popover__wrapper" onClick={onClick}>
      {children}
    </div>
  );
}
