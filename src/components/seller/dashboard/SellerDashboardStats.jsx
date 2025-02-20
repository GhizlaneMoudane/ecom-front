// src/components/seller/dashboard/SellerDashboardStats.jsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  DollarOutlined, 
  ShoppingOutlined, 
  UserOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';

const SellerDashboardStats = ({ stats }) => {
  return (
    <Row gutter={16} className="mb-8">
      <Col xs={24} sm={12} md={6}>
        <Card hoverable className="shadow-sm">
          <Statistic
            title="Total Sales"
            value={stats.totalSales}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<DollarOutlined />}
            suffix="USD"
          />
          <div className="mt-2 text-xs text-green-600 flex items-center">
            <ArrowUpOutlined /> 12% from last month
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card hoverable className="shadow-sm">
          <Statistic
            title="Revenue"
            value={stats.revenue}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<DollarOutlined />}
            suffix="USD"
          />
          <div className="mt-2 text-xs text-green-600 flex items-center">
            <ArrowUpOutlined /> 8% from last month
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card hoverable className="shadow-sm">
          <Statistic
            title="Orders"
            value={stats.orders}
            precision={0}
            valueStyle={{ color: '#1890ff' }}
            prefix={<ShoppingOutlined />}
          />
          <div className="mt-2 text-xs text-blue-600">
            {stats.pendingOrders} pending orders
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card hoverable className="shadow-sm">
          <Statistic
            title="Customers"
            value={stats.customers}
            precision={0}
            valueStyle={{ color: '#722ed1' }}
            prefix={<UserOutlined />}
          />
          <div className="mt-2 text-xs text-purple-600">
            {stats.newCustomers} new this month
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SellerDashboardStats;