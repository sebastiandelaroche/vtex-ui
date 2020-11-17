import React from 'react';
import { Table as AntdTable, Space, Button } from 'antd';

const actions = ({ onEdit, onDelete }) => ({
  title: 'Actions',
  dataIndex: '',
  key: 'x',
  render: (props) => {
    return (
      <Space size='middle'>
        <Button type="link" onClick={() => onEdit(props)}>Edit</Button>
        <Button type="link" onClick={() => onDelete(props)}>Delete</Button>
      </Space>
    )
  }
});

const Table = ({ columns, data, onEdit, onDelete }) => (
  <AntdTable
    columns={[...columns, actions({ onEdit, onDelete })]}
    dataSource={data}
    bordered
  />
);

export default Table;
