import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        value: {
            showChangedOnly: false,
            mocking: false,
            locked: false
        }
    },
    reducers: {
        setShowChangedOnly: (state, action) => {
            state.value.showChangedOnly = action.payload
        },
        toggleShowChangedOnly: state => {
            state.value.showChangedOnly = !state.value.showChangedOnly
        },
        resetShowChangedOnly: state => {
            state.value.showChangedOnly = false
        },
        setMocking: (state, action) => {
            state.value.mocking = action.payload
        },
        toggleMocking: state => {
            state.value.mocking = !state.value.mocking
        },
        resetMocking: state => {
            state.value.mocking = false
        },
        setLocked: (state, action) => {
            state.value.locked = action.payload
        },
        toggleLocked: state => {
            state.value.locked = !state.value.locked
        },
        resetLocked: state => {
            state.value.locked = false
        }
    }
})

export const {
    setShowChangedOnly,
    toggleShowChangedOnly,
    resetShowChangedOnly,
    setMocking,
    toggleMocking,
    resetMocking,
    setLocked,
    toggleLocked,
    resetLocked
} = configSlice.actions

export default configSlice.reducer