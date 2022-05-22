import React, { useRef, useState } from 'react';
import Portal from '../portal/Portal';
import { usePopper } from 'react-popper';
import ClickOutside from '../clickOutside/ClickOutside';

type Props = {
  reference: Element | null;
  placement:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  onClose: () => void;
  children: React.ReactNode;
};

export default function Popover({ reference, placement, children, onClose }: Props) {
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(reference, popper, { placement });

  return (
    <Portal>
      <ClickOutside refference={popper} onClickOutside={onClose}>
        <div
          className="window__popover"
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
        </div>
      </ClickOutside>
    </Portal>
  );
}
