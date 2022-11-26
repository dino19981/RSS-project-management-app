import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { editProfileFields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethod';
import { ErrorMessage } from '../../const/errorMessage';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { User } from '../../models/user';
import { fieldsType, formProps } from '../../models/form';
import { editProfileSchema } from '../../schemas/user';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteUserData, updateUserData } from '../../store/user';
import { useTranslation } from 'react-i18next';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';

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
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  async function onSubmit(value: fieldsType) {
    const editUserRequestOptions = {
      url: `${AppRoute.USER}/${userId}`,
      method: Methods.PUT,
      data: value,
    };

    const userData = await request(editUserRequestOptions);

    if (userData) {
      const updatedData = userData.data as User;

      dispatch(updateUserData(updatedData));
      setIsShowSaveMessage(true);

      timeoutRef.current = setTimeout(() => {
        setIsShowSaveMessage(false);
      }, 3000);
    }
  }

  async function deleteUser() {
    const editUserRequestOptions = {
      url: `${AppRoute.USER}/${userId}`,
      method: Methods.DELETE,
    };

    const userData = await request(editUserRequestOptions);

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
        {isError && <p className="authentication__error">{ErrorMessage.SERVER_ERROR}</p>}
        <h4 className="edit-profile__title">{t('edit_profile.title')}</h4>
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
