import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantitiy: 0,
    cartTotalAmount: 0,
    previousURL: "",

}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        ADD_TO_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (productIndex >= 0) {
                // Item already exists in the cart
                // Increase the cartQuantity
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(` ${action.payload.name} Increased by one`)


            }
            else {
                // Item doesn't exists in the cart
                // Add item to the cart
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(` ${action.payload.name} Product added to cart`)

            }
            // Save cart to LS
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        DECREASE_CART(state, action) {

            const item = state.cartItems.find(item => item.id === action.payload.id)

            if (item.cartQuantity > 1) {

                item.cartQuantity = item.cartQuantity - 1
                toast.info(` ${action.payload.name} Decreased by one`)
            }
            else if (item.cartQuantity === 1) {
                const tempCart = state.cartItems.filter(item => item.id !== action.payload.id)
                state.cartItems = tempCart
                toast.success(` ${action.payload.name} Product removed to cart`)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state, action) {
            const tempCart = state.cartItems.filter(item => item.id !== action.payload.id)
            state.cartItems = tempCart
            toast.success(` ${action.payload.name} Product removed to cart`)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state) {
            state.cartItems = [];
            toast.success(`Cart cleared`)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CALCULATE_SUBTOTAL(state) {
            const cartTotal = state.cartItems.reduce((total, item) => total = (total + item.price * item.cartQuantity), 0)
            state.cartTotalAmount = cartTotal
        },
        CALCULATE_CARTQUANTİTY(state) {

            const cartQuantity = state.cartItems.reduce((total, item) => total += item.cartQuantity, 0)
            state.cartTotalQuantitiy = cartQuantity

        },
        SAVE_URL(state, action) {
            state.previousURL = action.payload
        }



    }
});

export const { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_CARTQUANTİTY,SAVE_URL } = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantitiy = (state) => state.cart.cartTotalQuantitiy
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousURL = (state) => state.cart.previousURL

export default cartSlice.reducer