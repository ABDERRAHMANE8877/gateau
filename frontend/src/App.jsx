import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import PrivateRouteByRole from "./components/PrivateRouteByRole.jsx";
import Home from './Pages/Home.jsx'
import Favories from './Pages/Favories.jsx'
import Personnaliser from './Pages/Personnaliser.jsx'
import Explorer from './Pages/Explorer.jsx'
import Achat from './Pages/Achat.jsx'
import Connecter from './Pages/Connecter.jsx'
import Inscription from './Pages/Inscription.jsx'
import About from './Pages/About.jsx'
import Admin from './Pages/Admin.jsx'
import Patissier from './Pages/Patissier.jsx'
import AddProduct from './Pages/AddProduct.jsx';
import DeleteProduct from './Pages/DeleteProduct.jsx';
import ModifieProduct from './Pages/ModifieProduct.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/admin' element={
          <PrivateRouteByRole allowedRoles={["admin"]}>
            <Admin />
          </PrivateRouteByRole>
        } />
        <Route path='/patissier' element={
            <PrivateRouteByRole allowedRoles={["patissier"]}>
              <Patissier />
            </PrivateRouteByRole>
        } />
        <Route path='/ajouterProduit' element={
          <PrivateRouteByRole allowedRoles={["admin"]}>
              <AddProduct />  
          </ PrivateRouteByRole>
        } />
        <Route path='/supprimerProduit' element={
          <PrivateRouteByRole allowedRoles={["admin"]}>
              <DeleteProduct />
          </ PrivateRouteByRole>
        } />
        <Route path='/modifierProduit' element={
          <PrivateRouteByRole allowedRoles={["admin"]}>
              <ModifieProduct />
          </ PrivateRouteByRole>
        } />
        <Route path="/" element={<Home /> } />
        <Route path="/achat" element={<Achat />} />
        <Route path="/connection" element={<Connecter />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/favories" element={<Favories />} />
        <Route path="/personnaliser" element={<Personnaliser />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App