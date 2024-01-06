import { createSlice } from '@reduxjs/toolkit'

export const apiKeySlice = createSlice({
    name: 'apiKey',
    initialState: {
        value: ''
    },
    reducers: {
        setTo: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setTo } = apiKeySlice.actions

export default apiKeySlice.reducer