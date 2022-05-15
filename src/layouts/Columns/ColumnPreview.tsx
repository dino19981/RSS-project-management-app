import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAppSelector } from '../../store/hooks';
import ButtonWithModalForm from '../../components/buttonWithModalForm/ButtonWithModalForm';
import { useAxios } from '../../hooks/useAxios';
import { TColumn } from '../../models/column';
import TaskPreview from '../Task/TaskPreview';
import { TColumnUpdateSchema } from '../../models/schemas';
import { TTask } from '../../models/task';

/*
смена порядка
1 Если order изменяемого элемента Y  больше чем order заменяемого элемента Х
- начиная с конца изменить ордер элементов c Y на +1 по X включительно
- изменить Order Y на Х
2 Если order изменяемого элемента Y  меньше чем order заменяемого элемента Х
- изменить X на последний (columns.length) +1 
- изменить Y  на х
- изменить X на Y-1
*/

async function changeColumnOrder(
  arr: TColumn[],
  currentY: TColumn,
  replaceX: TColumn,
  apiPutCallback: (id: string, body: TColumnUpdateSchema) => Promise<void>
) {
  const reversedArr = arr.map((i: TColumn | TTask) => i).reverse();
  // Если order изменяемого элемента Y больше чем order заменяемого элемента Х
  if (currentY.order > replaceX.order) {
    // если текущий элемент это последний
    if (currentY.order === arr.length) {
      for (let i = 0; i < reversedArr.length; i++) {
        const el = reversedArr[i];
        if (el.order >= replaceX.order) {
          await apiPutCallback(el.id, {
            title: el.title,
            order: el.order + 1,
          });
        }
      }

      await apiPutCallback(currentY.id, {
        title: currentY.title,
        order: replaceX.order,
      });
    }
    // если текущий элемент не последний
    else {
      for (let i = 0; i < reversedArr.length; i++) {
        const el = reversedArr[i];
        if (el.order === currentY.order) {
          await apiPutCallback(currentY.id, {
            title: currentY.title,
            order: arr.length + 1,
          });
        } else if (el.order < currentY.order && el.order >= replaceX.order) {
          await apiPutCallback(el.id, {
            title: el.title,
            order: el.order + 1,
          });
        }
        i++;
      }

      await apiPutCallback(currentY.id, {
        title: currentY.title,
        order: replaceX.order,
      });
    }
  } else {
    // Если order изменяемого элемента Y меньше чем order заменяемого элемента Х
    // если текущий элемент это первый
    if (currentY.order === 1) {
      await apiPutCallback(currentY.id, {
        title: currentY.title,
        order: arr.length + 1,
      });
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el.order === currentY.order || el.order > replaceX.order) return el;
        await apiPutCallback(el.id, {
          title: el.title,
          order: el.order - 1,
        });
      }
    } else {
      // если текущий элемент не первый
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el.order < currentY.order || el.order > replaceX.order) return el;
        if (el.order === currentY.order) {
          apiPutCallback(currentY.id, {
            title: currentY.title,
            order: arr.length + 1,
          });
        }
        apiPutCallback(el.id, {
          title: el.title,
          order: el.order - 1,
        });
      }

      await apiPutCallback(currentY.id, {
        title: currentY.title,
        order: replaceX.order,
      });
    }
  }
}

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required(),
    description: yup.string().trim().required(),
  })
  .required();

const initialValues = {
  title: '',
  description: '',
};

const fields = [
  //TODO разобраться с полями
  { name: 'title', errorMessage: 'Title is required', placeholder: 'Task Title' },
  { name: 'description', errorMessage: 'description is required', placeholder: 'description' },
];

const formOptions = {
  schema,
  initialValues,
  fields,
};

function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  const target = e.target as HTMLDivElement;
  target.classList.add('drag');
}
function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
  const target = e.target as HTMLDivElement;
  target.classList.remove('drag');
}

type TProps = {
  currentColumn: TColumn;
  updateHandler: () => void;
  getReplaceCoumn: (id: string) => TColumn | undefined;
  allColumns: TColumn[] | undefined;
};
function ColumnPreview({ currentColumn, updateHandler, getReplaceCoumn, allColumns }: TProps) {
  const { id: columnId, order, title, tasks } = currentColumn;
  const { pathname } = useLocation();
  const { boardId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const { id: userId } = useAppSelector((state) => state.authorization);
  const { data, isLoading, isError, request } = useAxios({
    url: `/boards/${boardId}`,
    method: 'get',
  });

  async function createTaskHandler(value: typeof schema) {
    const body = { ...value, order: tasks.length + 1, userId };
    await request({
      url: `/boards/${boardId}/columns/${columnId}/tasks`,
      method: 'post',
      data: body,
    });
    updateHandler();
    setIsModalActive(false);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>, order: number) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    // const replaceCoumn = getReplaceCoumn(target.innerText);
    console.log('drop', target.innerText, allColumns, currentColumn);
    // changeColumnOrder(allColumns, currentColumn,replaceCoumn);
    // await request({
    //   url: `/boards/${boardId}/columns/${columnId}`,
    //   method: 'put',
    //   data: {
    //     title,
    //     order,
    //   },
    // });
    // await request();
  }

  return (
    <div
      className={`column-preview`}
      draggable={true}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e, 2)}
    >
      <div className="column-preview_title">{title}</div>
      {tasks &&
        tasks.map((task) => {
          return <TaskPreview key={task.id} {...task} columnId={columnId} />;
        })}

      <ButtonWithModalForm
        submitBtnName="add task"
        modalState={{ isModalActive, setIsModalActive }}
        buttonOptions={{
          btnClass: 'task_create__btn',
          text: 'Add task',
        }}
        formOptions={{
          ...formOptions,
          onSubmit: createTaskHandler,
          buttonOptions: {},
        }}
      />
    </div>
  );
}

export default ColumnPreview;
