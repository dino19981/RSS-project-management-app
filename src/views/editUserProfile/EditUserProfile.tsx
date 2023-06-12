import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { editProfileFields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import { AppRoute } from '../../const/routes';
import { fieldsType, formProps } from '../../models/form';
import { editProfileSchema } from '../../schemas/user';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteUserData, updateUserData } from '../../store/user';
import { useTranslation } from 'react-i18next';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { useDeleteUser, useEditUser } from 'shared/api/requests/user';
import { ErrorMessage } from 'components/errorMessage/ErrorMessage';

export default function EditUserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowSaveMessage, setIsShowSaveMessage] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const {
    name,
    login,
    isLoadingUserData,
    id: userId,
  } = useAppSelector((state) => state.authorization);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const { isLoading, error, request: editRequest } = useEditUser(userId);
  const {
    isLoading: deleteLoading,
    error: deleteError,
    request: deleteRequest,
  } = useDeleteUser(userId);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  async function onSubmit(value: fieldsType) {
    const userData = await editRequest({ data: value });

    if (userData) {
      dispatch(updateUserData(userData.data));
      setIsShowSaveMessage(true);

      timeoutRef.current = setTimeout(() => {
        setIsShowSaveMessage(false);
      }, 3000);
    }
  }

  async function deleteUser() {
    const userData = await deleteRequest();

    if (userData) {
      dispatch(deleteUserData());
      navigate(AppRoute.WELCOME_PAGE);
    }
  }

  if (isLoadingUserData) {
    return <Loader />;
  }

  const updateUserFormOptions: formProps = {
    schema: editProfileSchema,
    initialValues: { name, login, password: '' },
    fields: editProfileFields,
    formId: 'editProfile',
    onSubmit,
    formClassName: 'authentication__form',
  };

  const deleteUserOptions = {
    modalOptions: { submitHandler: deleteUser, contentWrapperClassName: 'modal__delete' },
    buttonOptions: {
      btnClass: 'edit-profile__delete-button',
      text: t('buttons.delete_profile'),
    },
    modalState: { isModalActive, setIsModalActive },
    submitBtnName: t('buttons.delete'),
    questionText: `${t('edit_profile.delete_profile_message')} ${login}?`,
  };

  return (
    <section className="edit-profile">
      <div className="edit-profile__wrapper">
        <h4 className="edit-profile__title">{t('edit_profile.title')}</h4>

        {error && <ErrorMessage message={error.message} className="authentication__error" />}

        <Form {...updateUserFormOptions} />

        {isShowSaveMessage && (
          <p className="edit-profile__save-message">{t('edit_profile.saved_data')}</p>
        )}

        <div className="edit-profile__footer">
          <Button
            isDisabled={isLoading}
            type="submit"
            text={t('buttons.save')}
            formId={updateUserFormOptions.formId}
            btnClass="edit-profile__save-button"
          />
          <ButtonWithModalForm {...deleteUserOptions} />
        </div>
        {isLoading && <Loader />}
      </div>
    </section>
  );
}
