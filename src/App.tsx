import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Footer from './components/Footer/Footer'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-app">
        <Routes>
          <Route index element={<Home />} />
          <Route path='product-details/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<Checkout />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
