import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from "./components"
import { Home, Card, Admin, Contact, OrderHistory } from "./pages"
import './App.scss';
import { Login, Register, Reset } from './pages';

function App() {
  return (
    <>

      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<Reset />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
