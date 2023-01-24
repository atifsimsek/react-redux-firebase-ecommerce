import styles from './CheckoutSummary.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantitiy } from '../../redux/slice/cartSlice'
import { Card } from '../../pages'

const CheckoutSummary = () => {

    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantitiy = useSelector(selectCartTotalQuantitiy)



    return (
        <div>
            <h3>Checkout Summary</h3>
            <div>
                {
                    cartItems.lenght === 0
                        ? (
                            <>
                                <p>
                                    Your cart is empty
                                </p>
                                <button>
                                    <Link to={"/#products"}>
                                        Back To Shop
                                    </Link>
                                </button>
                            </>
                        )
                        : (
                            <div>
                                <p>
                                    <b>
                                        {`Cart item(s): ${cartTotalQuantitiy}`}
                                    </b>
                                </p>
                                <div className={styles.text}>
                                    <h4>Subtotal:</h4>
                                    <h3>{cartTotalAmount.toFixed(2)}</h3>
                                </div>
                                {
                                    cartItems.map((item, index) => {
                                        const { id, name, price, cartQuantity } = item

                                        return (
                                            <Card key={id} cardClass={styles.card}>
                                                <h4>Product: {name}</h4>
                                                <p>Quantity: {cartQuantity}</p>
                                                <p>Unit Price: {price}</p>
                                                <p>Set Price: {price * cartQuantity}</p>
                                            </Card>
                                        )

                                    })
                                }
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default CheckoutSummary