import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from "./components"
import { Home, Contact, Admin } from "./pages"
import './App.scss';
import { Login, Register, Reset } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute, { AdminOnlyLink } from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';

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
        <Route path='/' element={<Home />} />
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
      </Routes>
      <Footer />

    </>
  );
}

export default App;
