import React from 'react';

type Props = {
  refference: HTMLDivElement | null;
  onClickOutside: () => void;
  children: React.ReactNode;
};

export default function ClickOutside({ refference, onClickOutside, children }: Props) {
  function onClick(e: React.SyntheticEvent) {
    if (e.target != refference) {
      console.log('click outside');
    }
    console.log(e.target, refference);
  }
  return (
    <div className="window__wrapper" onClick={(e) => onClick(e)}>
      {children}
    </div>
  );
}
