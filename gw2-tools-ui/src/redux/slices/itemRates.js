import { createSlice } from '@reduxjs/toolkit'

export const itemRatesSlice = createSlice({
    name: 'itemRates',
    initialState: {
        value: []
    },
    reducers: {
        setItemRates: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {
    setItemRates
} = itemRatesSlice.actions

export default itemRatesSlice.reducer