import styles from './AdminAddProducts.module.scss'
import { useState } from 'react'
import { Card } from "../../../pages"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Loader from '../../loader/Loader'

const initialState = {
  name: "",
  imageUrl: "",
  price: 0,
  category: "",
  brand: "",
  desc: ""
}


const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashipon" },
  { id: 4, name: "Phone" },
]



const AdminAddProducts = () => {

  const [product, setProduct] = useState({
    ...initialState

  })


  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })

  }


  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const storageRef = ref(storage, `ecommerce/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)

      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL })
          toast.success("Image uploaded successfully")
        });
      }
    );
  }

  const addProduct = (e) => {
    e.preventDefault()
    setLoading(false)


    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setLoading(false)
      setUploadProgress(0)
      setProduct({ ...initialState })
      toast.success("Product uploaded successfully")
      navigate("/admin/all-products")
    }
    catch (error) {
      toast.error(error.message)
      setLoading(false)
    }

  }


  return (

    <>
      {loading && <Loader />}
      <div className={styles.product}>
        <h2>Add New Product</h2>
        <Card cardClass={styles.card} >
          <form onSubmit={addProduct}>
            <label>Product name:</label>
            <input
              name="name"
              type="text"
              placeholder='Product name'
              required
              value={product.name}
              onChange={(e) => { handleInputChange(e) }}
            />

            <label>Product Image:</label>

            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${Math.round(uploadProgress)}%` }}>
                    {uploadProgress < 100 ? `Uploading ${Math.round(uploadProgress)}%` : `Upload Complete ${Math.round(uploadProgress)}%`}
                  </div>
                </div>
              )}
              <input
                name="image"
                type="file"
                placeholder='Product Image'
                accept='image/*'
                onChange={(e) => { handleImageChange(e) }}
              />

              {product.imageUrl === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder='Image URL'
                  name="imageURL"
                  disabled
                  value={product.imageUrl}
                />
              )}

            </Card>

            <label>Product price:</label>
            <input
              name="price"
              type="number"
              placeholder='Product price'
              required
              value={product.price}
              onChange={(e) => { handleInputChange(e) }}
            />

            <label>Product category:</label>
            <select
              name="category"
              required
              value={product.category}
              onChange={(e) => { handleInputChange(e) }}
            >
              <option value="" disabled>
                -- Choose product category
              </option>
              {
                categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              }

            </select>

            <label>Product Company/Brtand:</label>
            <input
              name="brand"
              type="text"
              placeholder='Product brand'
              required
              value={product.brand}
              onChange={(e) => { handleInputChange(e) }}
            />

            <label>Product Description:</label>
            <textarea
              name="desc"
              cols="30"
              rows="10"
              required
              value={product.desc}
              onChange={(e) => { handleInputChange(e) }}
            />
            <button type='submit' className='--btn --btn-primary'>Save Product</button>

          </form>

        </Card>
      </div>

    </>


  )
}

export default AdminAddProducts