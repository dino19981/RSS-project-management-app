import ButtonWithModalForm from 'components/buttonWithModalForm/ButtonWithModalForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteIcon } from 'components/icons/Icons';
import { AxiosError } from 'axios';

type Props = {
  onSubmit: () => void;
  error?: AxiosError | null;
  text: string;
};

export function DeleteButtonWithModal({ onSubmit, error, text }: Props) {
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);

  async function onDelete() {
    await onSubmit();
    setIsModalActive(false);
  }

  return (
    <ButtonWithModalForm
      modalState={{ isModalActive, setIsModalActive }}
      modalOptions={{
        submitHandler: onDelete,
        contentWrapperClassName: 'modal__delete',
        submitBtnName: t('buttons.delete'),
        error,
      }}
      buttonOptions={{
        text: 'delete',
        icon: deleteIcon,
        isVisuallyHiddenText: true,
        btnClass: 'board-preview__delete-btn',
      }}
      questionText={text}
    />
  );
}
