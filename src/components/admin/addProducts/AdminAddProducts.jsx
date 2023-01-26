import styles from './AdminAddProducts.module.scss'
import { useState } from 'react'
import { Card } from "../../../pages"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/productsSlice'



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
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
]



const AdminAddProducts = () => {

  //Add & Edit product
  const { id } = useParams()
  const products = useSelector(selectProducts)
  const prodctEdit = products.find(item => item.id === id)

  function detecForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    else {
      return f2;
    }

  }


  const [product, setProduct] = useState(() => {
    const newState = detecForm(id, { ...initialState }, prodctEdit)
    return newState
  })
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  //Input Changes

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

  //Add Product

  const addProduct = (e) => {
    e.preventDefault()
    setLoading(false)


    try {
      addDoc(collection(db, "products"), {
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

  const editProduct = (e) => {
    e.preventDefault()
    setLoading(false)

    if (product.imageUrl !== prodctEdit.imageUrl) {

      const strogeRef = ref(storage, prodctEdit.imageUrl);
      deleteObject(strogeRef)

    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: prodctEdit.createdAt,
        editedAt: Timestamp.now().toDate()


      });
      setLoading(false)
      toast.success("Product Edited Successfully")
      navigate("/admin/all-products")


    } catch (error) {
      toast.error(error.message)
      setLoading(false)

    }
  }


  return (

    <>
      {loading && <Loader />}
      <div className={styles.product}>
        <h2>{detecForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card} >
          <form onSubmit={detecForm(id, addProduct, editProduct)}>
            {/*****  Name Input *****/}
            <label>Product name:</label>
            <input
              name="name"
              type="text"
              placeholder='Product name'
              required
              value={product.name}
              onChange={(e) => { handleInputChange(e) }}
            />

            {/*****  Image Input & Progress Bar *****/}

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

            {/*****  Price Input *****/}

            <label>Product price:</label>
            <input
              name="price"
              type="number"
              placeholder='Product price'
              required
              value={product.price}
              onChange={(e) => { handleInputChange(e) }}
            />

            {/*****  Category Input *****/}

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

            {/*****  Product Input *****/}

            <label>Product Company/Brtand:</label>
            <input
              name="brand"
              type="text"
              placeholder='Product brand'
              required
              value={product.brand}
              onChange={(e) => { handleInputChange(e) }}
            />

            {/*****  Desc Input *****/}

            <label>Product Description:</label>
            <textarea
              name="desc"
              cols="30"
              rows="10"
              required
              value={product.desc}
              onChange={(e) => { handleInputChange(e) }}
            />
            <button type='submit' className='--btn --btn-primary'>{detecForm(id, "Save Product", "Edit Product")}</button>

          </form>

        </Card>
      </div>

    </>


  )
}

export default AdminAddProducts