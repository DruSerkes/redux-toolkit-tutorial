import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showError } from "../error/errorSlice";
// import { cartItems } from '../../cartItems'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const URL = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
  try {
    const res = await axios(URL);
    return res.data
  } catch (e) {
    thunkAPI.dispatch(showError(e.message))
    return thunkAPI.rejectWithValue(e.response.data)
  }
})

export const getCartItemsWithError = createAsyncThunk('cart/getCartItemsWithError', async (_, thunkAPI) => {
  try {
    const res = await axios(URL + 'aiogjoaigj')
    return res.data;
  } catch (e) {
    thunkAPI.dispatch(showError(e.message ?? 'Something went wrong - please try again later'))
    return thunkAPI.rejectWithValue(e.response.data);
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = []
    },
    removeItem: (state, { payload: id }) => {
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    increment: (state, { payload: id }) => {
      const cartItem = state.cartItems.find(item => item.id === id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrement: (state, { payload: id }) => {
      const cartItem = state.cartItems.find(item => item.id === id);
      cartItem.amount = cartItem.amount - 1;
    },
    toggle: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id);
      if (payload.decrease) cartItem.amount = cartItem.amount - 1
      else cartItem.amount = cartItem.amount + 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false
    },
    [getCartItemsWithError.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false
    }
  }
});

export const {
  reducer: cartReducer,
  actions: { clearCart, removeItem, increment, decrement, calculateTotals }
} = cartSlice;