import styles from './Admin.module.scss'
import AdminNavbar from "../../components/admin/navbar/AdminNavbar"
import AdminHome from "../../components/admin/home/AdminHome"
import { Routes, Route } from 'react-router-dom'
import AdminViewProducts from '../../components/admin/viewProducts/AdminViewProducts'
import AdminAddProducts from '../../components/admin/addProducts/AdminAddProducts'
import AdminOrders from '../../components/admin/orders/AdminOrders'


const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="all-products" element={<AdminViewProducts />} />
          <Route path="add-products" element={<AdminAddProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin