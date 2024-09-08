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
import Producto from './Components/Producto/Producto.js'
import Curso from './Components/Curso/Curso.js'
import Navbar from './Components/Navbar/Navbar.js'
import Carrito from './Components/Carrito/Carrito.js'

function App() {
  return (
    <div className="App">
      {/* <Incoming /> */}  
      <BrowserRouter>
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
            {/* Dynamic routes */}
            <Route path="/Producto/:id" element={<Producto/>} />
            <Route path="/Curso/:id" element={<Curso/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

