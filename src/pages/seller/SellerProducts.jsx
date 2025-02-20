// src/pages/seller/SellerProducts.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Modal, Form, InputNumber, Upload, message, Spin } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  
  // Get user email from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'nate@gmail.com'; // Default for testing

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/?email=${userEmail}&subject=Product`
      );
      
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [userEmail]);

  // Filter products based on search
  const filteredProducts = products.filter(
    product => product.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (product = null) => {
    setEditingProduct(product);
    form.resetFields();
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.setFieldsValue({ 
        email: userEmail,
        sku: `SKU-${Math.floor(Math.random() * 10000)}`
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async (values) => {
    try {
      const payload = {
        subject: "Product",
        object: {
          ...values,
          email: userEmail,
          // Ensure numeric values are sent as numbers
          rrp: Number(values.rrp),
          quantity: Number(values.quantity)
        }
      };
  
      let response;
      if (editingProduct) {
        // If editing, use PUT
        response = await axios.put(
          'https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/',
          payload
        );
      } else {
        // If adding new product, use POST
        response = await axios.post(
          'https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/',
          payload
        );
      }
      
      setIsModalVisible(false);
      message.success(`Product ${editingProduct ? 'updated' : 'added'} successfully!`);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error saving product:', error);
      message.error('Failed to save product');
    }
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name?.localeCompare(b.name),
    },
    {
      title: 'Price (RRP)',
      dataIndex: 'rrp',
      key: 'rrp',
      render: rrp => `$${Number(rrp).toFixed(2)}`,
      sorter: (a, b) => Number(a.rrp) - Number(b.rrp),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
    },
    {
      title: 'Product URL',
      dataIndex: 'url',
      key: 'url',
      render: url => url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Image
        </a>
      ) : 'No image',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)} 
            type="text"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.sku)} 
            type="text" 
            danger
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async (sku) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // Since there's no specific delete endpoint, we'll update quantity to 0
          const payload = {
            subject: "Product",
            object: {
              email: userEmail,
              sku: sku,
              quantity: 0
            }
          };
          
          await axios.post(
            'https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/',
            payload
          );
          
          message.success('Product marked as out of stock');
          fetchProducts(); // Refresh the list
        } catch (error) {
          console.error('Error deleting product:', error);
          message.error('Failed to delete product');
        }
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Space>
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-64"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            className="bg-orange-500 hover:bg-orange-600 border-orange-500"
          >
            Add Product
          </Button>
        </Space>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="sku"
          className="bg-white rounded-lg shadow-sm"
          locale={{ emptyText: 'No products found' }}
        />
      )}

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="email"
            hidden
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Please enter SKU' }]}
          >
            <Input placeholder="Enter SKU (e.g., SKU-1234)" disabled={!!editingProduct} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="rrp"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              min={0}
              precision={2}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="url"
            label="Product Image URL"
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-orange-500 hover:bg-orange-600">
                {editingProduct ? 'Update' : 'Add'} Product
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SellerProducts;