import './App.css';
import './Sass/Default.css'
/* import Incoming from './Components/Incoming/Incoming'; */
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home.js'
import Perfil from './Components/Perfil/Perfil.js'
import Nosotros from './Components/Nosotros/Nosotros.js'
import Elearning from './Components/E-learning/E-learning.js'
import Catalogo from './Components/Catalogo/Catalogo.js'
import Contacto from './Components/Contacto/Contacto.js'
import ProductDetail from './Components/Catalogo/ProductDetail.js/ProductDetail.js';
import TallerDetail from './Components/E-learning/TallerDetail/TallerDetail.js'
import Navbar from './Components/Navbar/Navbar.js'
import Carrito from './Components/Carrito/Carrito.js'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop.js';
import Login from './Components/LogToAccount/Login/Login.js';
import Register from './Components/LogToAccount/Register/Register.js';
import Dashboard from './Components/Dashboard/dashboard.js';
import UpdateUserInfo from './Components/Perfil/optionsPerfil/update.js';
import DeleteAccount from './Components/Perfil/optionsPerfil/delete.js';

function App() {
  return (
    <div className="App">
      {/* <Incoming /> */}  
      <BrowserRouter>
        <ScrollToTop />
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/Nosotros" element={<Nosotros/>} />
            <Route exact path="/Carrito" element={<Carrito/>} />
            <Route exact path="/Contacto" element={<Contacto/>}/>
            <Route exact path="/Catalogo" element={<Catalogo/>}/>
            <Route exact path="/Talleres" element={<Elearning/>}/>
            <Route exact path="/Perfil" element={<Perfil/>}/>
            <Route exact path="/Login" element={<Login/>}/>
            <Route exact path="/Register" element={<Register/>}/>
            <Route exact path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/perfil" element={<Perfil />} />
            {/* Dynamic routes */}
            <Route path="/perfil/update/:id" element={<UpdateUserInfo />} />
            <Route path="/perfil/delete/:id" element={<DeleteAccount />} />
            <Route path="/Producto/:id" element={<ProductDetail/>} />
            <Route path="/Talleres/:id" element={<TallerDetail/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

