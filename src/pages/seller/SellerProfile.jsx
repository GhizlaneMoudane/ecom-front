// src/pages/seller/SellerProfile.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Divider, message, Spin, Upload, Switch, InputNumber } from 'antd';
import { UploadOutlined, SaveOutlined, UserOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_URL = "https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/";
const API_KEY = "hello123@";

const SellerProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // Get user email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Fetch user profile data
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        subject: "UserInfo",
        object: {
          email: userEmail
        },
        api_key: API_KEY
      });
      
      if (response.data) {
        setUserInfo(response.data);
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      message.error('Failed to load profile information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  const handleSave = async (values) => {
    setSaving(true);
    try {
      // If profile exists, update it. Otherwise create it.
      const method = userInfo?.created_at ? 'PUT' : 'POST';
      
      await axios({
        method,
        url: API_URL,
        data: {
          subject: "UserInfo",
          object: {
            email: userEmail,
            ...values
          },
          api_key: API_KEY
        }
      });
      
      message.success('Profile updated successfully');
      fetchUserProfile(); // Refresh data
    } catch (error) {
      console.error('Error saving profile:', error);
      message.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
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
      <h1 className="text-2xl font-bold mb-6">Seller Profile</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          email: userEmail,
          kyc_status: 'init',
          business: {}
        }}
      >
        <Card className="mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserOutlined className="mr-2" /> Personal Information
          </h2>
          
          <Form.Item name="email" label="Email Address" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          
          <Form.Item name="eth_address" label="Ethereum Address">
            <Input placeholder="Enter your Ethereum wallet address" />
          </Form.Item>
          
          <Form.Item name="kyc_status" label="KYC Status" hidden>
            <Input />
          </Form.Item>
          
          <Divider orientation="left">KYC Documents</Divider>
          
          <Form.Item name="kyc_documents" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
            <Upload 
              listType="picture" 
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload Verification Documents</Button>
            </Upload>
          </Form.Item>
          
          <p className="text-sm text-gray-500 mt-2">
            Please upload government-issued ID, proof of address, and any business registration documents.
          </p>
        </Card>
        
        <Card className="mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BankOutlined className="mr-2" /> Business Information
          </h2>
          
          <Form.Item label="Business Name" name={['business', 'name']}>
            <Input placeholder="Enter your business name" />
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Year of Registration" name={['business', 'registration_year']}>
              <InputNumber 
                min={1900} 
                max={new Date().getFullYear()} 
                style={{ width: '100%' }} 
              />
            </Form.Item>
            
            <Form.Item label="Number of Employees" name={['business', 'number_of_employees']}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item label="Annual Turnover ($)" name={['business', 'turnover']}>
              <InputNumber 
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
            
            <Form.Item label="Operating Capital ($)" name={['business', 'operating_capital']}>
              <InputNumber 
                min={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
          
          <Form.Item label="Expected Monthly Volume ($)" name={['business', 'expected_volume']}>
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
          
          <Form.Item 
            label="Accept Product Returns" 
            name={['business', 'accept_returns']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Form.Item 
            label="Minimum Escrow Amount ($)" 
            name={['business', 'min_escrow']}
            tooltip="Minimum amount to hold in escrow for transactions"
          >
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Card>
        
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={saving}
            className="bg-orange-500 hover:bg-orange-600 border-orange-500"
            size="large"
          >
            Save Profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SellerProfile;