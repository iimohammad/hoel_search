import React, { useState } from 'react';
import axios from 'axios';
import './HotelInfo.css'; // Import the CSS file

function HotelInfo() {
  const [deposit, setDeposit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/hotel-info/${id}`);
      setDeposit(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="hotel-info-container">
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="hotel-id-input"
        placeholder="Enter hotel ID"
      />
      <button onClick={handleRequest} disabled={loading} className="fetch-button">
        {loading ? 'Loading...' : 'Get Deposit Info'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {deposit && (
        <div className="deposit-info">
          <h2>Deposit Information</h2>
          {deposit.map((item, index) => (
            <div key={index} className="deposit-item">
              <p><strong>Availability:</strong> {item.availability}</p>
              <p><strong>Currency:</strong> {item.currency}</p>
              <p><strong>Deposit Type:</strong> {item.deposit_type}</p>
              <p><strong>Payment Type:</strong> {item.payment_type}</p>
              <p><strong>Price:</strong> {item.price} {item.currency} ({item.price_unit})</p>
              <p><strong>Pricing Method:</strong> {item.pricing_method}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelInfo;
