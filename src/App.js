import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApproveLoan from './Pages/components/ApproveLoan';
import ChangePassword from './Pages/components/ChangePassword';
import CreateNewAgent from './Pages/components/CreateNewAgent';
import Deposits from './Pages/components/Deposits';
import ListAgent from './Pages/components/ListAgent';
import ListUser from './Pages/components/ListUser';
import OnLoan from './Pages/components/OnLoan';
import PendingLoan from './Pages/components/PendingLoan';
import SingleAgent from './Pages/components/SingleAgent';
import SingleCustomer from './Pages/components/SingleCustomer';
import Withdrawals from './Pages/components/Withdrawals';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Statement from './Pages/Statement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} > 
          <Route path='customers/:id' element={<ListUser />} />
          <Route path='agents' element={<ListAgent />} />
          <Route path='customer/:id' element={<SingleCustomer />} />
          <Route path='customer/loan/:id' element={<ApproveLoan />} />
          <Route path='customer/:id/deposits/:id' element={<Deposits />} />
          <Route path='customer/:id/withdraws/:id' element={<Withdrawals />} />
          <Route path='customer/:id/transactions' />
          <Route path='agent/:id' element={<SingleAgent />} />
          <Route path='reset/password/:id' element={<ChangePassword />} />
          <Route path='new/agent' element={<CreateNewAgent />} />
          <Route path='customer/onloan' element={<OnLoan />} />
          <Route path='customer/activeloan' element={<PendingLoan />} />
        </Route>
        <Route path ='/customer/statement/:id' element={ <Statement />} />
      </Routes>
    </Router>
  );
}

export default App