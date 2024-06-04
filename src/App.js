import React from 'react';
import BankWidget from './components/BankWidget';
import ConnectWidget from './components/ConnectWidget';

const App = () => {
  const customerId = '7029334956';
  const partnerId = '2445584535123';
  return (
    <div className="App">
      <h1>Bank Account Balances</h1>
      <ConnectWidget partnerId={partnerId} customerId={customerId} />
      <BankWidget customerId={customerId} />
    </div>
  );
};

export default App;
