import { useState } from "react"
import { CountryDropdown } from "react-country-region-selector"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary"
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice"
import Card from "../card/Card"
import styles from "./CheckoutDetails.module.scss"

const initialAddress = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
}


const CheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddress })
    const [billlingAddress, setBillingAddress] = useState({ ...initialAddress })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShipping = (e) => {

        const { name, value } = e.target
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })

    }

    const handleBiling = (e) => {
        const { name, value } = e.target
        setBillingAddress({
            ...billlingAddress,
            [name]: value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billlingAddress))
        navigate("/checkout")
    }

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h3>Checkout Details</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cartClass={styles.card}>

                            <h3>Shipping Address</h3>
                            <label>Recipient Name</label>
                            <input
                                type="text"
                                placeholder="Recipient Name"
                                required
                                name="name"
                                value={shippingAddress.name}
                                onChange={(e) => { handleShipping(e) }}
                            />
                            <label>Address Line 1</label>
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                required
                                name="line1"
                                value={shippingAddress.line1}
                                onChange={(e) => { handleShipping(e) }}
                            />
                            <label>Address Line 2</label>
                            <input
                                type="text"
                                placeholder="Address Line 2"
                                name="line2"
                                value={shippingAddress.line2}
                                onChange={(e) => { handleShipping(e) }}
                            />
                            <label>City</label>
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                value={shippingAddress.city}
                                onChange={(e) => { handleShipping(e) }}
                            />
                            <label>State</label>
                            <input
                                type="text"
                                placeholder="State"
                                name="state"
                                value={shippingAddress.state}
                                onChange={(e) => { handleShipping(e) }}
                            />
                            <label>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                name="postal_code"
                                value={shippingAddress.postal_code}
                                onChange={(e) => { handleShipping(e) }}
                            />

                            {/* Country Input */}
                            <label>Country</label>
                            <CountryDropdown
                                valueType="short"
                                className={styles.select}
                                value={shippingAddress.country}
                                onChange={(val) => {
                                    handleShipping({
                                        target: {
                                            name: "country",
                                            value: val
                                        }
                                    })
                                }}

                            />

                            {/* Country Input */}

                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                value={shippingAddress.phone}
                                onChange={(e) => { handleShipping(e) }}
                            />

                        </Card>

                        {/* Billing Adress */}

                        <Card cartClass={styles.card}>

                            <h3>Billing Address</h3>
                            <label>Billing Name</label>
                            <input
                                type="text"
                                placeholder="Billing Name"
                                required
                                name="name"
                                value={billlingAddress.name}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <label>Address Line 1</label>
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                required
                                name="line1"
                                value={billlingAddress.line1}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <label>Address Line 2</label>
                            <input
                                type="text"
                                placeholder="Address Line 2"
                                name="line2"
                                value={billlingAddress.line2}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <label>City</label>
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                value={billlingAddress.city}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <label>State</label>
                            <input
                                type="text"
                                placeholder="State"
                                name="state"
                                value={billlingAddress.state}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <label>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                name="postal_code"
                                value={billlingAddress.postal_code}
                                onChange={(e) => { handleBiling(e) }}
                            />

                            {/* Country Input */}
                            <label>Country</label>
                            <CountryDropdown
                                valueType="short"
                                className={styles.select}
                                value={billlingAddress.country}
                                onChange={(val) => {
                                    handleBiling({
                                        target: {
                                            name: "country",
                                            value: val
                                        }
                                    })
                                }}

                            />

                            {/* Country Input */}

                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                value={billlingAddress.phone}
                                onChange={(e) => { handleBiling(e) }}
                            />
                            <button className="--btn --btn-primary" type="submit">Proceed To Checkout</button>
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CheckoutDetails