import { createSlice } from '@reduxjs/toolkit'

export const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        value: {slots: [], addedSlots: [], removedSlots: []}
    },
    reducers: {
        setBank: (state, action) => {
            state.value = action.payload
        },
        setAddedBankSlots: (state, action) => {
            state.value.addedSlots = action.payload
        },
        updateChangedBankSlots: (state, action) => {
            let slotsToChange = action.payload;
            Object.keys(slotsToChange).forEach(slotId => {
                const existingSlot = state.value.slots.find(slot => slot.id === parseInt(slotId))
                existingSlot.changed = slotsToChange[slotId]
            })
        },
        setRemovedBankSlots: (state, action) => {
            state.value.removedSlots = action.payload
        }
    }
})

export const { setBank, setAddedBankSlots, updateChangedBankSlots, setRemovedBankSlots } = bankSlice.actions

export default bankSlice.reducer