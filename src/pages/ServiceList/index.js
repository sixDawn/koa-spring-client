import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { EnhanceTable, WithSearch } from 'antd-doddle';
import { bind } from 'antd-doddle/decorator';
import { fields, searchFields } from './fields';
import Edit from './Edit';

@connect(({ rule }) => ({ ...rule }), dispatch => ({
  onSearch(payload) {
    dispatch({ type: 'rule/updateSearch', payload });
    dispatch({ type: 'rule/getList' });
  },
  onSave(payload) {
    dispatch({ type: 'rule/save', payload });
  },
  onUpdate(payload) {
    dispatch({ type: 'rule/update', payload });
  },
  onGetDetail(payload) {
    return dispatch({ type: 'rule/getDetail', payload });
  }
}))
export default class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      detail: {}
    };
  }

  @bind
  onOk(data) {
    const { detail } = this.state;
    const { onSave, onUpdate } = this.props;
    return detail.id ? onUpdate({ id: detail.id, ...data }) : onSave(data);
  }

  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 120,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { this.handleEdit(detail); }}>修改</a>
            {/* <Popconfirm title="确认删除？" onConfirm={() => { this.handleSubmit(detail); }}>
              <a className="ml-10">更新</a>
            </Popconfirm> */}
          </div>)
      }
    ];
  }

  @bind
  handleEdit({ id } = {}) {
    if (id) {
      const { onGetDetail } = this.props;
      onGetDetail({ id }).then((detail) => {
        this.setState({
          detail,
          visible: Symbol('')
        });
      });
    } else {
      this.setState({
        detail: {},
        visible: Symbol('')
      });
    }
  }

  render() {
    const { loading, datas, total, search, onSearch } = this.props;
    const { visible, detail } = this.state;
    const tableProps = {
      search,
      datas,
      fields,
      loading: loading.getList,
      onSearch,
      total,
      extraFields: this.getExtraFields()
    };
    const searchProps = {
      fields: searchFields,
      search,
      onSearch,
    };

    const editProps = {
      onOk: this.onOk,
      visible,
      detail,
      title: detail.id ? '修改' : '新增',
      confirmLoading: loading.update || loading.save || false,
    };

    return (
      <div>
        <Button type="primary" title="确认删除？" onClick={() => this.handleEdit()}>
          添加
        </Button>
        <WithSearch {...searchProps} />
        <div className="pageContent">
          <EnhanceTable {...tableProps} />
        </div>
        {visible && <Edit {...editProps} />}
      </div>
    );
  }
}
