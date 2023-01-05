import { useEffect } from 'react'
import { toast } from 'react-toastify'
import styles from './AdminViewProducts.module.scss'
import Loader from "../../loader/Loader"
import { deleteDoc, doc } from "firebase/firestore"
import { db, storage } from "../../../firebase/config"
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productsSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'


const AdminViewProducts = () => {
  const { data, loading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data
    }))
  }, [data, dispatch])


  const deleteProduct = async (id, imageUrl) => {

    try {
      await deleteDoc(doc(db, "products", id));
      const strogeRef = ref(storage, imageUrl);
      await deleteObject(strogeRef)
      toast.success("Produc deleted successfully.")
    }
    catch (error) {
      toast.error(error.message)
    }

  }

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      'Delete Product!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageUrl)
      },
      function cancelCb() {
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      },
    );
  }


  return (
    <>
      {loading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {products.map((product, index) => {
              const { id, name, price, imageUrl, category } = product
              return (
                <tbody key={id}>
                  <tr >
                    <td>{index + 1}</td>
                    <td><img src={imageUrl} alt={name} style={{ width: "100px" }} /></td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => { confirmDelete(id, imageUrl) }} />
                    </td>
                  </tr>
                </tbody>

              )
            })}
          </table>
        )}

      </div>
    </>
  )
}

export default AdminViewProducts