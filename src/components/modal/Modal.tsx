import React from 'react';
import { modalProps } from '../../models/modal';
import Button from '../button/Button';

export default function Modal({
  formId,
  children,
  handleCloseModal,
  submitBtnName,
  isShowFooter = true,
}: modalProps) {
  return (
    <div className="main__container" aria-label="modal">
      <div
        role="textbox"
        tabIndex={0}
        className="modal active"
        onMouseDown={handleCloseModal}
        onKeyPress={(e) => e.stopPropagation()}
      >
        <div
          role="textbox"
          tabIndex={0}
          className="modal__content active"
          onMouseDown={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
        >
          {children}

          {isShowFooter && (
            <div className="modal__footer">
              <Button handler={handleCloseModal} text="Закрыть" />
              <Button type="submit" formId={formId} text={submitBtnName} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
