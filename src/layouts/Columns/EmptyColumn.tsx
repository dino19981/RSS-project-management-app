import React, { useId } from 'react';
import { useDrag } from 'react-dnd';

type TProps = {
  order: number;
};

function EmptyColumn({ order }: TProps) {
  const id = useId();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'columns',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { columnId: id, order },
    end: () => {
      console.log('drop function');
    },
  }));

  const dragClass = isDragging ? 'drag' : '';
  return (
    <div className={`column-preview ${dragClass}`} ref={drag}>
      EmptyColumn
    </div>
  );
}

export default EmptyColumn;
