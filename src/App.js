import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './screens/login';
import OrderPage from './screens/orderPage';
import AddOrder from './screens/addOrder';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/orderPage' element={<OrderPage />} />
        <Route path='addOrder' element={<AddOrder />} />
        <Route path='editOrder' element={<AddOrder />} />
      </Routes>
    </div>
  );
}

export default App;
