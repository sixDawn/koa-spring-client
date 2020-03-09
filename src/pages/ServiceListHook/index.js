import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { EnhanceTable, WithSearch } from 'antd-doddle';
import { usePagination, setPagination } from 'antd-doddle/hooks';
import { fields, searchFields } from './fields';
import Edit from './Edit';
import { useRequest, useLazyRequest } from './services';

setPagination({ pn: 1, ps: 5 });

export default function Root() {
  const [search, onSearch, onReset] = usePagination({});
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const handleEdit = useCallback((detail = {}) => {
    setVisible(Symbol(''));
    setDetail(detail);
  });

  const getExtraFields = () => ([
    {
      key: 'operate',
      name: '操作',
      width: 120,
      fixed: 'right',
      render: (text, detail) => (
        <div>
          <a onClick={() => { handleEdit(detail); }}>修改</a>
        </div>)
    }
  ]);

  const { data = {}, loading, forceUpdate } =
  useRequest('/rule/query', search, { prompt: true });

  const [onUpdate, { loading: updateLoading }] =
    useLazyRequest('/rule/update', {}, { callback: forceUpdate });
  const [onSave, { loading: saveLoading }] =
    useLazyRequest('/rule/save', {}, { callback: forceUpdate });
  const onOk = useCallback(data => detail.id ?
    onUpdate({ id: detail.id, ...data }) : onSave(data), [detail]);

  const { datas = [], total } = data;

  const tableProps = {
    search,
    datas,
    fields,
    onSearch,
    total,
    loading,
    extraFields: getExtraFields()
  };

  const searchProps = {
    fields: searchFields,
    search,
    onReset,
    onSearch,
  };

  const editProps = {
    onOk,
    visible,
    onSearch,
    id: detail.id,
    title: detail.id ? '修改' : '新增',
    confirmLoading: updateLoading || saveLoading,
  };

  return (
    <div>
      <Button type="primary" onClick={handleEdit}>
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
