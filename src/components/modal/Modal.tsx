import React from 'react';
import { modalProps } from '../../models/modal';

import './style.scss';

export default function Modal({ formId, children, handleCloseModal, submitBtnName }: modalProps) {
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

          <div className="modal__footer">
            <button onClick={handleCloseModal}>Закрыть</button>
            <button type="submit" form={formId}>
              {submitBtnName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
