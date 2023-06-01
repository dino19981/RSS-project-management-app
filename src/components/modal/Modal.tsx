import React from 'react';
import { useTranslation } from 'react-i18next';
import { modalProps } from '../../models/modal';
import Button from '../button/Button';
import Portal from '../portal/Portal';

export default function Modal({
  formId,
  children,
  handleCloseModal,
  submitHandler,
  submitBtnName,
  error,
  contentWrapperClassName,
  isDontShowFooter,
}: modalProps) {
  const { t } = useTranslation();
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
          {error && <p className="modal__error-text">{t(error.message)}</p>}

          {children}

          {!isDontShowFooter && (
            <div className="modal__footer">
              <Button
                btnClass="button__cancel"
                handler={handleCloseModal}
                text={t('buttons.close')}
              />
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
