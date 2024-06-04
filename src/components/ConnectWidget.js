import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectWidget = ({ partnerId, customerId }) => {
  const [connectUrl, setConnectUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnectUrl = async () => {
      try {
        const response = await axios.post('http://localhost:3000/finicity/connect-url', {
          partnerId: partnerId,
          customerId: customerId
        });
        setConnectUrl(response.data.link);
      } catch (error) {
        console.error('Error fetching connect URL', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectUrl();
  }, [partnerId, customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Connect to Your Bank</h2>
      <a href={connectUrl} target="_blank" rel="noopener noreferrer">Click here to connect your bank account</a>
    </div>
  );
};

export default ConnectWidget;
