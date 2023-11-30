
import Dashboard from './components/dashboard'
import { Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Create from './components/event';
import PrivateRoute from './components/privateroute';
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/' element={
      <PrivateRoute>
          < Dashboard/>
       
      </PrivateRoute>
       


      }
      
      />
      <Route path='/create-event' element={
      <PrivateRoute>
          < Create/>
       
      </PrivateRoute>
       


      }
      
      />
      
      
   

  </Routes>
  );
}

export default App;
