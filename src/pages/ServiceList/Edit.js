import React from 'react';
import { Form } from 'antd';
import { HModal, FormGroup } from 'antd-doddle';
import { editFields } from './fields';

const { FormRender } = FormGroup;

function Edit({ detail, form, visible, ...others }) {
  const { getFieldDecorator } = form;

  const modalProps = {
    visible,
    form,
    bodyStyle: {
      padding: '10px 80px 0 0'
    },
    ...others
  };
  return (
    <HModal {...modalProps}>
      <FormGroup getFieldDecorator={getFieldDecorator} required>
        {editFields.map(field => <FormRender key={field.key} field={field} data={detail} />)}
      </FormGroup>
    </HModal>
  );
}

export default Form.create()(Edit);
