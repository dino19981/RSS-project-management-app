import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { editProfileFields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import Loader from '../../components/loader/loader';
import { Methods } from '../../const/APIMethoods';
import { ErrorMessage } from '../../const/errorMessage';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';
import { updatedUserInfo } from '../../models/user';
import { fieldsType, formProps } from '../../models/form';
import { editProfileSchema } from '../../schemas/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUserData, updateUserData } from '../../store/user/actions';
import Modal from '../../components/modal/Modal';

export default function EditUserProfile() {
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
      const updatedData = userData.data as updatedUserInfo;

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

  function openModal() {
    setIsModalActive(true);
  }

  function closeModal() {
    setIsModalActive(false);
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
    formClassName: 'authentification__form',
  };

  return (
    <section className="edit-profile">
      <div className="edit-profile__wrapper">
        {isError && <p className="authentification__error">{ErrorMessage.SERVER_ERROR}</p>}
        <h4 className="edit-profile__title">Редактирование профиля</h4>
        <Form {...updateUserFormOptions} />

        {isShowSaveMessage && (
          <p className="edit-profile__save-message">Данные успешно сохранены!</p>
        )}

        <div className="edit-profile__footer">
          <Button
            isDisabled={isLoading}
            type="submit"
            text="Сохранить"
            formId={updateUserFormOptions.formId}
            btnClass="edit-profile__save-button"
          />
          <Button
            btnClass="edit-profile__delete-button"
            text="Удалить профиль"
            handler={openModal}
          ></Button>
        </div>
        {isModalActive && (
          <Modal
            submitBtnName="Удалить"
            contentWrapperClassName="modal__delete"
            handleCloseModal={closeModal}
            submitHandler={deleteUser}
          >
            <p className="edit-profile__delete-text">{`Действительно хотите удалить профиль ${login}?`}</p>
          </Modal>
        )}
        {isLoading && <Loader />}
      </div>
    </section>
  );
}
