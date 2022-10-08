import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../../../components/button/Button';
import { editColumnFields } from '../../../../components/form/constants/fieldsOptions';
import Form from '../../../../components/form/Form';
import { checkIcon, closeIcon } from '../../../../components/icons/Icons';
import Popover from '../../../../components/popover/Popover';
import { columSchema } from '../../../../schemas/column';
import { updateColumnData } from '../../../../store/board/actions';

type Props = {
  setIsTitleEditActive: (state: boolean) => void;
  reference: Element | null;
  data: { boardId: string | undefined; columnId: string; title: string; order: number };
};

function EditingTitle({
  reference,
  setIsTitleEditActive,
  data,
  updateColumnData,
}: Props & PropsFromRedux) {
  const { boardId, columnId, title, order } = data;

  async function updateTitle(value: typeof columSchema) {
    if (value.title === title) {
      closeTitle();
      return;
    }

    if (!boardId) return;

    const body = { order, ...value };
    const response = await updateColumnData({ boardId, columnId, values: body });

    if (response.meta.requestStatus === 'fulfilled') {
      closeTitle();
    }
  }

  function closeTitle() {
    setIsTitleEditActive(false);
  }

  return (
    <Popover
      placement="bottom-start"
      onClose={closeTitle}
      reference={reference}
      popoverWrapperClass="popover__gray-wrapper"
    >
      <div className="column__title-edit">
        <div className="column__form-wrapper" style={{ width: reference?.clientWidth }}>
          <Form
            schema={columSchema}
            initialValues={{ title }}
            fields={editColumnFields}
            formId="editTitle"
            onSubmit={updateTitle}
          />
        </div>
        <div className="column__title-buttons">
          <Button icon={checkIcon} btnClass="button__check-icon" formId="editTitle" type="submit" />
          <Button icon={closeIcon} btnClass="button__cancel-icon" handler={closeTitle} />
        </div>
      </div>
    </Popover>
  );
}

const mapDispatchToProps = {
  updateColumnData,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditingTitle);
