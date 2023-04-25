import './App.css';
import {Routes,Route } from 'react-router-dom';
import RegisterPagef from './components/RegisterPage';
import AdminPagef from './components/AdminPage';
import Allusersf from './pages/Allusersf';
import Allproductsf from './pages/Allproductsf';
import Allcategorysf from './pages/Allcategorysf';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<RegisterPagef />} /> 
           <Route path="/AdminPage" element={<AdminPagef />} >
            <Route path="allusers" element={<Allusersf />}/>
            <Route path="allproducts" element={<Allproductsf />}/>
            <Route path="allcategorys" element={<Allcategorysf/>}/>
            </Route> 
      </Routes>
    </div>
  );
}

export default App;
