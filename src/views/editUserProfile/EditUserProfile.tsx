import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { editProfileFields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethoods';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { updatedUserInfo } from '../../models/editUserProfile';
import { fieldsType, formProps } from '../../models/form';
import { editProfileSchema } from '../../schemas/authentification';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserData } from '../../store/user/actions';
import { getAuthentificationErrorMessage } from '../../utils/authentification';

export default function EditUserProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowSaveMessage, setIsShowSaveMessage] = useState(false);
  const {
    name,
    login,
    isLoadingUserData,
    id: userId,
  } = useAppSelector((state) => state.authorization);
  const { isLoading, isError, request } = useAxios({}, { dontFetchAtMount: true });

  async function onSubmit(value: fieldsType) {
    const editUserRequestOptions = {
      url: `${AppRoute.USER}/${userId}`,
      method: Methods.PUT,
      data: value,
    };

    const userData = await request(editUserRequestOptions);

    if (userData) {
      const updatedData = userData as unknown as updatedUserInfo;

      dispatch(updateUserData(updatedData));
      setIsShowSaveMessage(true);
      setTimeout(() => {
        navigate(AppRoute.BOARDS);
      }, 2000);
    }
  }

  async function deleteUser(value: fieldsType) {
    const editUserRequestOptions = {
      url: `${AppRoute.USER}/${userId}`,
      method: Methods.DELETE,
    };

    const userData = await request(editUserRequestOptions);

    if (userData) {
      const updatedData = userData as unknown as updatedUserInfo;

      dispatch(updateUserData(updatedData));
      setIsShowSaveMessage(true);
      setTimeout(() => {
        navigate(AppRoute.BOARDS);
      }, 2000);
    }
  }

  if (isLoadingUserData) {
    return <Loader />;
  }

  const formOptions: formProps = {
    schema: editProfileSchema,
    initialValues: { name, login, password: '' },
    fields: editProfileFields,
    formId: 'editProfile',
    onSubmit,
    formClassName: 'authentification__form',
  };

  return (
    <div className="edit-profile">
      <div className="authentification__inner">
        {isError && (
          <p className="authentification__error">
            {getAuthentificationErrorMessage(isError.response?.status)}
          </p>
        )}
        <div className="edit-profile__header">
          <Button text="Удалить аккаунт" />
        </div>

        <Form {...formOptions} />
        {isShowSaveMessage && (
          <p className="edit-profile__save-message">Данные успешно сохранены!</p>
        )}
        <div className="authentification__footer">
          <Button
            isDisabled={isLoading}
            type="submit"
            text="Сохранить"
            formId={formOptions.formId}
            btnClass="authentification__button"
          />
        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  );
}
