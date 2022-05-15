import React, { useId } from 'react';

type TProps = {
  order: number;
};

function EmptyColumn({ order }: TProps) {
  const id = useId();

  return <div className={`column-preview`}>EmptyColumn</div>;
}

export default EmptyColumn;
