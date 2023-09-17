import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import RegisterPage from './components/Register/Register';
import LoginPage from './components/Login/Login';
import DetailPage from './pages/Details/Details';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {

  return (
    <div className='app-container'>
      <AuthContextProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signIn" element={<LoginPage />} />
            <Route path="/details/:productId" element={<DetailPage />} />
          </Routes>
          <Cart />
          <Footer />
        </CartProvider>
      </AuthContextProvider>
    </div>
  );
}