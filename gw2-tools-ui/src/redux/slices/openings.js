import { createSlice } from '@reduxjs/toolkit'

export const openingsSlice = createSlice({
    name: 'openings',
    initialState: {
        value: []
    },
    reducers: {
        setOpenings: (state, action) => {
            state.value = action.payload
        },
        removeOpening: (state, action) => {
            const openingId = action.payload.id;
            state.value = state.value.filter(opening => opening.id !== openingId);
        }
    }
})

export const { setOpenings,
    removeOpening
} = openingsSlice.actions

export default openingsSlice.reducer