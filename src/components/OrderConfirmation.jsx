import React from 'react';
import { useCart } from '../Context/CartContext';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const OrderConfirmation = ({ orderData, onComplete, onBack }) => {
  const { items, totalPrice } = useCart();
  const { shipping } = orderData;

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Thank you for your order!</h2>
            <p className="text-gray-600">Order placed on {formatDate()}</p>
          </div>

          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{`${shipping.firstName} ${shipping.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{shipping.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {shipping.address}<br />
                    {`${shipping.city}, ${shipping.state} ${shipping.zipCode}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{shipping.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Order Details</h3>
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button 
              onClick={onComplete}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default OrderConfirmation;