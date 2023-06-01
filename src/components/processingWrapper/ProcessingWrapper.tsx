import { useTranslation } from 'react-i18next';
import { processingWrapperProps } from '../../models/processingWrapper';
import Loader from '../loader/loader';

export function ProcessingWrapper({ isLoading, error, children, items }: processingWrapperProps) {
  const { t } = useTranslation();

  if (isLoading && !items) {
    return <Loader />;
  }

  if (error) {
    return <p className="modal__error-text">{t(`error_messages.${error.message}`)}</p>;
  }

  return <>{children}</>;
}
