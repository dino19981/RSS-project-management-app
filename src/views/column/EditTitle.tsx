import React from 'react';
import Button from '../../components/button/Button';
import { editColumnFields } from '../../components/form/constants/fieldsOptions';
import Form from '../../components/form/Form';
import { checkIcon, closeIcon } from '../../components/icons/Icons';
import Popover from '../../components/popover/Popover';
import { fieldsType } from '../../models/form';
import { columSchema } from '../../schemas/column';

type Props = {
  closeTitle: () => void;
  reference: Element | null;
  title: string;
  updateTitle: (value: fieldsType) => void;
};

export default function EditTitle({ closeTitle, reference, title, updateTitle }: Props) {
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
