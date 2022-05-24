import React, { useState } from 'react';
import Portal from '../portal/Portal';
import { usePopper } from 'react-popper';
import ClickOutside from '../clickOutside/ClickOutside';
import { popoverProps } from '../../models/popover';

export default function Popover({ reference, placement, children, onClose }: popoverProps) {
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
