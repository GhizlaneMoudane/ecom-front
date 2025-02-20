// src/components/seller/dashboard/RecentOrdersTable.jsx
import React from 'react';
import { Table, Tag, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const RecentOrdersTable = ({ orders, onViewOrder }) => {
  const statusColors = {
    'Delivered': 'green',
    'Processing': 'blue',
    'Shipped': 'purple',
    'Pending': 'orange',
    'Cancelled': 'red'
  };

  const columns = [
    { 
      title: 'Order ID', 
      dataIndex: 'id', 
      key: 'id',
      render: (id) => <span className="font-medium">#{id}</span>
    },
    { 
      title: 'Customer', 
      dataIndex: 'customer', 
      key: 'customer',
    },
    { 
      title: 'Product', 
      dataIndex: 'product', 
      key: 'product',
      ellipsis: true 
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: Object.keys(statusColors).map(status => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EyeOutlined />} 
          onClick={() => onViewOrder(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={orders}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      className="rounded-lg overflow-hidden shadow-sm"
    />
  );
};

export default RecentOrdersTable;