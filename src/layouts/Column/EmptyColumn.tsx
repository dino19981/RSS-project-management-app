import React, { useId } from 'react';

type TProps = {
  order: number;
};

function EmptyColumn({ order }: TProps) {
  const id = useId();

  return <div className={`column-preview`}></div>;
}

export default EmptyColumn;
