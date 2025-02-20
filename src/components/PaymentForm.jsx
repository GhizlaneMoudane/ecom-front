import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const PaymentForm = ({ formData, onFormChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardChange = (event) => {
    setError(event.error ? event.error.message : '');
    onFormChange({ 
      ...formData,
      method: selectedMethod,
      cardComplete: event.complete 
    });
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card' },
    { id: 'paypal', name: 'PayPal' },
    { 
      id: 'amazonPay', 
      name: 'Amazon Pay',
      description: 'Use payment method from your Amazon account' 
    },
    { id: 'klarna', name: 'Klarna' },
    { id: 'gPay', name: 'G Pay' }
  ];

  const CheckIcon = () => (
    <div className="absolute top-4 right-4 w-6 h-6 bg-black rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    onFormChange({ 
      ...formData,
      method: methodId 
    });
  };

  return (
    <div className="flex-1">
      {/* Credit Card Section */}
      <div 
        className={`bg-white rounded-lg p-6 mb-6 border-2 cursor-pointer relative transition-colors
          ${selectedMethod === 'card' ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
        onClick={() => handleMethodChange('card')}
      >
        {selectedMethod === 'card' && <CheckIcon />}
        
        <h2 className="text-xl font-medium mb-6">Credit/Debit Card</h2>
        
        {/* Card Logos */}
        <div className="flex gap-4 mb-6">
          <img src="/visa.png" alt="Visa" className="h-8" />
          <img src="/mastercard.png" alt="Mastercard" className="h-8" />
          <img src="/amex.png" alt="American Express" className="h-8" />
          <img src="/discover.png" alt="Discover" className="h-8" />
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <CardElement 
                options={CARD_ELEMENT_OPTIONS} 
                onChange={handleCardChange}
              />
            </div>

            {error && (
              <div className="mt-1 bg-red-50 text-red-500 text-sm p-2 rounded">
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <input 
                type="checkbox" 
                id="useShipping" 
                className="rounded"
                onChange={(e) => onFormChange({
                  ...formData,
                  useShippingAddress: e.target.checked
                })}
              />
              <label htmlFor="useShipping" className="text-sm">
                Use my shipping address as the cardholder's address
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Payment Methods */}
      <div 
        className={`bg-white rounded-lg p-6 border-2 cursor-pointer relative transition-colors
          ${selectedMethod !== 'card' ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
        onClick={() => handleMethodChange('alternative')}
      >
        {selectedMethod !== 'card' && <CheckIcon />}
        
        <h3 className="font-medium mb-4">Other Payment Methods</h3>
        <div className="space-y-3">
          {paymentMethods.filter(method => method.id !== 'card').map((method) => (
            <label 
              key={method.id}
              className={`block border rounded-lg p-3 hover:bg-gray-50 cursor-pointer
                ${selectedMethod === method.id ? 'border-black' : 'border-gray-200'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleMethodChange(method.id);
              }}
            >
              <div className="flex items-start gap-3">
                <input 
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleMethodChange(method.id)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">{method.name}</div>
                  {method.description && (
                    <p className="text-sm text-gray-500">{method.description}</p>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;