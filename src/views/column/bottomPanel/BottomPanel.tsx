import { t } from 'i18next';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ButtonWithModalForm from '../../../components/buttonWithModalForm/ButtonWithModalForm';
import { plusIcon } from '../../../components/icons/Icons';
import { ErrorMessage } from '../../../const/errorMessage';
import { createTaskSchema } from '../../../schemas/task';
import { useAppSelector } from '../../../store/hooks';
import { createTask } from '../../../store/board';
import { createTaskValues } from '../../../components/form/constants/initialValues';
import { createTaskFields } from '../../../components/form/constants/fieldsOptions';
import { RootState } from '../../../models/store';
import { TTask } from '../../../models/task';

const formOptions = {
  schema: createTaskSchema,
  initialValues: createTaskValues,
  fields: createTaskFields,
};

type Props = {
  boardId: string | undefined;
  columnId: string;
};

function BottomPanel({ createTask, boardId, columnId, requestError }: Props & PropsFromRedux) {
  const [isCreateTaskModalActive, setIsCreateTaskModalActive] = useState(false);

  const { id: userId } = useAppSelector((state) => state.authorization);

  async function createTaskHandler(value: typeof createTaskSchema) {
    const requestData: Pick<TTask, 'title' | 'description' | 'userId'> = { ...value, userId };

    if (!boardId) return;

    const createTaskResponse = await createTask({ boardId, columnId, values: requestData });

    if (createTaskResponse.meta.requestStatus === 'fulfilled') {
      setIsCreateTaskModalActive(false);
    }
  }

  const addTaskOptions = {
    modalState: {
      isModalActive: isCreateTaskModalActive,
      setIsModalActive: setIsCreateTaskModalActive,
    },
    modalOptions: {
      submitBtnName: t('column.add_task'),
      isError: !!requestError,
      errorText: ErrorMessage.SERVER_ERROR,
    },
    buttonOptions: {
      btnClass: 'column__create-task-btn',
      text: t('column.add_task'),
      icon: plusIcon,
    },
    formOptions: { ...formOptions, onSubmit: createTaskHandler },
  };

  return <ButtonWithModalForm {...addTaskOptions} />;
}

const mapStateToProps = (state: RootState) => {
  return {
    requestError: state.board.requestError,
  };
};

const mapDispatchToProps = {
  createTask,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BottomPanel);
