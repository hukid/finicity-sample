import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankWidget = ({ customerId }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/finicity/accounts/${customerId}`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching account data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bank Accounts</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            <strong>{account.name}</strong>: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankWidget;
