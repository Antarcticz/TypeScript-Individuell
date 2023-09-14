import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
// import ProductDetails from './pages/ProductDetails'
// import Add from './pages/Add'
import Footer from './components/Footer/Footer'
// import Checkout from './pages/Checkout'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-app">
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path='add' element={<Add />} />
          <Route path='product-details/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<Checkout />} /> */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
