// src/layouts/SellerLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import HeaderTop from "../components/HeaderTop"; // your top section with logo, search, cart


const { Header, Sider, Content } = Layout;

const SellerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    {
      key: '/seller',
      icon: <DashboardOutlined />,
      label: <Link to="/seller">Dashboard</Link>,
    },
    {
      key: '/seller/products',
      icon: <ShoppingOutlined />,
      label: <Link to="/seller/products">Products</Link>,
    },
    {
      key: '/seller/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/seller/orders">Orders</Link>,
    },
    {
      key: '/seller/profile',
      icon: <UserOutlined />,
      label: <Link to="/seller/profile">Profile</Link>,
    }
  ];

  const handleLogout = () => {
    // Handle logout functionality
    console.log("Logging out...");
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        className="bg-white shadow-md"
      >
        <div className="h-16 flex items-center justify-center">
          <h2 className={`text-xl font-bold text-orange-500 transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            Seller Portal
          </h2>
        </div>
        
        <Menu 
          theme="light" 
          selectedKeys={[location.pathname]} 
          mode="inline" 
          items={menuItems}
        />
        
        <div className="mt-auto mb-4 px-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-md"
          >
            <LogoutOutlined className="mr-2" />
            <span className={collapsed ? 'hidden' : 'block'}>Logout</span>
          </button>
        </div>
      </Sider>
      
      <Layout>
        <Header className="bg-white p-0 flex items-center justify-end px-6 shadow-sm">
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Welcome, Seller</span>
            <div className="bg-orange-100 p-2 rounded-full text-orange-500">
              <UserOutlined />
            </div>
          </div>
        </Header>
        
        <Content className="m-4">
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-[80vh]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerLayout;