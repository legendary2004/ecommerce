import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import Shop from './pages/Shop';
import { initFlowbite } from 'flowbite';
import SinglePage from './pages/SinglePage';
import ProductForm from './pages/ProductForm';
import ManageStore from './pages/ManageStore';

function App() {
  setTimeout(() => {
    initFlowbite()
  }, 500);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/single' element={<SinglePage />}/>
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/manageStore" element={<ManageStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
