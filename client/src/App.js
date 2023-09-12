import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Create from './components/create/Create';
import FoodDetails from './components/foodDetails/FoodDetails';
import FoodCatalog from './components/foodCatalog/FoodCatalog';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import {useLocation, Navigate} from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Token from './Token';
import Updateduser from './components/updatedUser/Updateduser';

function App() {
 const location = useLocation()
 
 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])

 const {user} = useSelector((state) => state.auth)
  return (
    <div>
      <Navbar />
       <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
         
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path='/auth/:toKen' element={<Token/>} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/create' element={<Create />} />
         <Route path='/food/:id' element={<FoodDetails />} />
         <Route path='/foods/:id' element={<FoodCatalog />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/checkout' element={<Checkout />} />
         <Route path='/updateProfile' element={<Updateduser/>}/>
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
