import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { AppRoute } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';

export default function TaskEdit() {
  const { boardId, columnId, taskId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, request } = useAxios({
    url: `${AppRoute.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: 'get',
  });

  console.log(data);

  function closeEdit() {
    navigate(`${AppRoute.BOARDS}/${boardId}`);
  }
  return <Modal handleCloseModal={closeEdit}>TaskEdit</Modal>;
}
