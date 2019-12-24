import React from 'react';
import { FormGroup } from 'antd-doddle';
import { form, bind } from 'antd-doddle/decorator';
import { Button } from 'antd';

const { FormRender } = FormGroup;

export const editFields = [{
  key: 'tag',
  name: 'Tag',
}, {
  key: 'name',
  name: '名称',
}, {
  key: 'file',
  name: '文件',
  type: 'staticFile',
  // draggerable: true,
  reg: /\.(js|css|jpg|png|zip|html)$/,
  tips: '文件类型为web资源类文件',
  listType: 'text',
}];


@form
export default class Edit extends React.PureComponent {
  @bind
  handleSubmit() {
    const { handle, form: { validateFields } } = this.props;
    validateFields((error, values) => {
      if (error) {
        return;
      }
      console.log('val', values);
      handle(values);
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <FormGroup getFieldDecorator={getFieldDecorator} required>
        {editFields.map(field => <FormRender key={field.key} field={field} data={{ tag: 'tag', name: 'name' }} />)}
        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
      </FormGroup>
    );
  }
}
