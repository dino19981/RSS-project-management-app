import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { AppRoute } from '../../const/routes';

export default function TaskEdit() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  function closeEdit() {
    navigate(`${AppRoute.BOARDS}/${boardId}`);
  }
  return <Modal handleCloseModal={closeEdit}>TaskEdit</Modal>;
}
