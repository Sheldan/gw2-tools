import { createSlice } from '@reduxjs/toolkit'

export const loadingStateSlice = createSlice({
    name: 'loadingState',
    initialState: {
        value: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload
        },
        toggleLoading: state => {
            state.value = !state.value
        },
        resetLoading: state => {
            state.value = false
        }
    }
})

export const { setLoading, toggleLoading, resetLoading } = loadingStateSlice.actions

export default loadingStateSlice.reducer