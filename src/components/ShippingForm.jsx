import React from 'react';

export const ShippingForm = ({ formData, onFormChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ 
      ...formData.shipping,
      [name]: value 
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.shipping?.firstName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.shipping?.lastName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.shipping?.email || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.shipping?.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
            placeholder="1234567890"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.shipping?.address || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            name="city"
            required
            value={formData.shipping?.city || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">State</label>
          <select
            name="state"
            required
            value={formData.shipping?.state || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
          >
            <option value="">Select State</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            <option value="IL">Illinois</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            required
            pattern="[0-9]{5}"
            value={formData.shipping?.zipCode || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black"
            placeholder="12345"
          />
        </div>
      </div>
    </div>
  );
};