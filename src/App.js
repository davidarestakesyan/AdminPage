import './App.css';
import {Routes,Route } from 'react-router-dom';
import RegisterPagef from './components/RegisterPage';
import AdminPagef from './components/AdminPage';
import Allusersf from './pages/Allusersf';
import Allproductsf from './pages/Allproductsf';
import Allcategorysf from './pages/Allcategorysf';
import LoginPagef from './components/LoginPage';
import Createproductsf from './pages/Createproductsf';
import Createcategorysf from './pages/Createcategorysf';
import ProtectRoute from './ProtectRoute/ProtectRoute';
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<RegisterPagef />} /> 
          <Route path='LoginPage'element = {<LoginPagef/>} /> 
           <Route path="AdminPage" element={<ProtectRoute> <AdminPagef/></ProtectRoute >} >
            <Route path="allusers" element={<Allusersf/>}/>
            <Route path="allproducts" element={<Allproductsf />}/>
            <Route path="allcategorys" element={<Allcategorysf/>}/>
            <Route path="createproducts" element={<Createproductsf/>}/>
            <Route path="createcategorys" element={<Createcategorysf/>}/>
            </Route> 
      </Routes>
    </div>
  );
}

export default App;
