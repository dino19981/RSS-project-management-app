import React from 'react';
import { modalProps } from '../../models/modal';
import Button from '../button/Button';

export default function Modal({
  formId,
  children,
  handleCloseModal,
  submitBtnName,
  isError,
  errorText,
  contentClassName,
  isDontShowFooter,
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
          className={`modal__content ${contentClassName} active`}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
        >
          <div className="modal__header" onClick={handleCloseModal}>
            <svg className="task__edit_icon">
              <use xlinkHref="#close-icon" />
            </svg>
          </div>
          {isError && <p className="modal__error-text">{errorText}</p>}

          {children}

          {!isDontShowFooter && (
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
