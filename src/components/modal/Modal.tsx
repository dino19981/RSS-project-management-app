import React from 'react';
import { modalProps } from '../../models/modal';
import Button from '../button/Button';
import Portal from '../portal/Portal';

export default function Modal({
  formId,
  children,
  handleCloseModal,
  submitHandler,
  submitBtnName,
  isError,
  errorText,
  contentWrapperClassName,
  isDontShowFooter,
}: modalProps) {
  return (
    <Portal>
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
          className={`modal__content ${contentWrapperClassName || ''} active`}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
        >
          <div className="modal__header">
            <svg
              onClick={handleCloseModal}
              onKeyPress={(e) => e.stopPropagation()}
              className="modal__close"
            >
              <use xlinkHref="#close-icon" />
            </svg>
          </div>
          {isError && <p className="modal__error-text">{errorText}</p>}

          {children}

          {!isDontShowFooter && (
            <div className="modal__footer">
              <Button btnClass="button__cancel" handler={handleCloseModal} text="Закрыть" />
              <Button
                handler={submitHandler}
                btnClass="button__submit"
                type="submit"
                formId={formId}
                text={submitBtnName}
              />
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
