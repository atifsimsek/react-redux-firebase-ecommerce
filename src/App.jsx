import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from "./components"
import { Home, Contact, Admin } from "./pages"
import './App.scss';
import { Login, Register, Reset } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute, { AdminOnlyLink } from './components/adminOnlyRoute/AdminOnlyRoute';

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
        <Route path='/reset' element={<Reset />} />

        <Route
          path='/admin/*'
          element={
            <AdminOnlyLink>
              <Admin />
            </AdminOnlyLink>
          } />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
