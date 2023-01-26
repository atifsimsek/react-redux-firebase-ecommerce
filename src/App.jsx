import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from "./components"
import { Home, Contact, Admin, OrderHistory } from "./pages"
import './App.scss';
import { Login, Register } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderDetails from './components/orderDetails/OrderDetails';
import ReviewProducs from './components/reviewProducts/ReviewProducs';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        className="toast"
      />

      <Header />
      <Routes >
        <Route path='/react-redux-firebase-ecommerce/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
       

        <Route
          path='/admin/*'
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          } />
           <Route path='/product-details/:id' element={<ProductDetails />} />
           <Route path='/cart' element={<Cart />} />
           <Route path='/checkout-details' element={<CheckoutDetails />} />
           <Route path='/checkout' element={<Checkout />} />
           <Route path='/checkout-success' element={<CheckoutSuccess />} />
           <Route path='/order-history' element={<OrderHistory />} />
           <Route path='/order-details/:id' element={<OrderDetails />} />
           <Route path='/review-product/:id' element={<ReviewProducs />} />
           <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
