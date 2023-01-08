import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cardItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantitiy: 0,

}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    }
});

export const { } = cartSlice.actions

export default cartSlice.reducer