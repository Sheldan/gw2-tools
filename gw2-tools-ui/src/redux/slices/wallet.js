import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        value: {currencies: [], addedCurrencies: []}
    },
    reducers: {
        setWallet: (state, action) => {
            state.value = action.payload
        },
        setAddedWalletCurrency: (state, action) => {
            state.value.addedCurrencies = action.payload
        },
        updateChangedWalletCurrencies: (state, action) => {
            let currenciesToChange = action.payload;
            Object.keys(currenciesToChange).forEach(currencyId => {
                const existingCurrency = state.value.currencies.find(currency => currency.id === parseInt(currencyId))
                existingCurrency.changed = currenciesToChange[currencyId]
            })
        }
    }
})

export const { setWallet, setAddedWalletCurrency, updateChangedWalletCurrencies } = walletSlice.actions

export default walletSlice.reducer