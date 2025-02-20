// src/pages/seller/SellerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Divider, Modal, Spin, Empty } from 'antd';
import axios from 'axios';
import SellerDashboardStats from '../../components/seller/dashboard/SellerDashboardStats';
import RecentOrdersTable from '../../components/seller/dashboard/RecentOrdersTable';
import SalesChart from '../../components/seller/dashboard/SalesChart';

const API_URL = "https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/";
const API_KEY = "hello123@";

const SellerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalSales: 0,
      revenue: 0,
      orders: 0,
      pendingOrders: 0,
      customers: 0,
      newCustomers: 0
    },
    recentOrders: [],
    salesData: []
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Get user email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch products to calculate stats
      const productsResponse = await axios.post(API_URL, {
        subject: "Product",
        object: {
          email: userEmail
        },
        api_key: API_KEY
      });
      
      // Process product data to generate dashboard stats
      // This is mock processing - adjust based on your actual data structure
      if (productsResponse.data) {
        const products = productsResponse.data;
        
        // Calculate mock statistics based on available product data
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
        const totalValue = products.reduce((sum, product) => sum + ((product.quantity || 0) * (product.rrp || 0)), 0);
        
        // Generate mock sales data
        const mockSalesData = generateMockSalesData();
        
        setDashboardData({
          stats: {
            totalSales: Math.floor(totalValue * 0.7), // Mock: assume 70% of stock has been sold
            revenue: Math.floor(totalValue * 0.7), // Same as totalSales for demo
            orders: Math.floor(totalValue * 0.7 / 50), // Assume average order is $50
            pendingOrders: Math.floor(totalValue * 0.1 / 50), // 10% of orders pending
            products: totalProducts,
            totalStock: totalStock
          },
          recentOrders: generateMockOrders(5),
          salesData: mockSalesData
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchDashboardData();
    }
  }, [userEmail]);

  const handleViewOrder = (orderId) => {
    const order = dashboardData.recentOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setModalVisible(true);
  };

  // Helper function to generate mock sales data
  const generateMockSalesData = () => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - 29 + i);
      return {
        date: date.toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 1000) + 500
      };
    });
  };

  // Helper function to generate mock orders
  const generateMockOrders = (count) => {
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    return Array.from({ length: count }, (_, i) => ({
      id: `ORD-${1000 + i}`,
      customer: `Customer ${i + 1}`,
      product: `Product ${Math.floor(Math.random() * 10) + 1}`,
      amount: Math.floor(Math.random() * 200) + 50,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date().toISOString().split('T')[0]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      
      {/* Stats cards */}
      <SellerDashboardStats stats={dashboardData.stats} />
      
      {/* Sales chart */}
      {dashboardData.salesData.length > 0 ? (
        <SalesChart data={dashboardData.salesData} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <Empty description="No sales data available" />
        </div>
      )}
      
      {/* Recent orders */}
      <div>
        <Divider orientation="left">Recent Orders</Divider>
        {dashboardData.recentOrders.length > 0 ? (
          <RecentOrdersTable 
            orders={dashboardData.recentOrders} 
            onViewOrder={handleViewOrder}
          />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Empty description="No recent orders" />
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal
        title={`Order #${selectedOrder?.id}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Amount:</strong> ${selectedOrder.amount.toFixed(2)}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SellerDashboard;