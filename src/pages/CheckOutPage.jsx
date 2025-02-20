import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShippingForm } from '../components/ShippingForm';
import PaymentForm from '../components/PaymentForm';
import CheckoutSummary from '../components/CheckoutSummary';
import { Truck, CreditCard } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { totalPrice } = useCart();
  const [formData, setFormData] = useState({
    shipping: {},
    payment: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.payment.method === 'card') {
      // Create payment method
      const paymentMethod = await createPaymentMethod();
      if (!paymentMethod) return;

      // Send to your backend
      try {
        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: totalPrice * 100, // Convert to cents for Stripe
            currency: 'usd',
            shipping: formData.shipping // Include shipping details
          }),
        });

        const result = await response.json();

        if (result.success) {
          navigate('/order-confirmation');
        } else {
          // Handle payment error
          alert(result.error || 'Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred during payment. Please try again.');
      }
    } else {
      // Handle other payment methods
      navigate('/order-confirmation');
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Checkout Form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-orange-500" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">1. Shipping Information</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <ShippingForm
                      formData={formData}
                      onFormChange={(data) => {
                        setFormData(prev => ({ ...prev, shipping: data }));
                      }}
                    />
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-orange-500" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">2. Payment Method</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <PaymentForm
                      formData={formData}
                      onFormChange={(data) => {
                        setFormData(prev => ({ ...prev, payment: data }));
                      }}
                    />
                  </div>
                </div>

                {/* Submit Order Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-4">
                    {/* Optional: Terms and Conditions */}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the Terms of Service and Privacy Policy. I agree that my order may be processed
                        and shipped as soon as all items are available.
                      </label>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      Place Order
                      <span className="text-sm font-normal">
                        (Total: ${totalPrice.toFixed(2)})
                      </span>
                    </button>

                    {/* Security Badges */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure Checkout
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        SSL Encrypted
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;