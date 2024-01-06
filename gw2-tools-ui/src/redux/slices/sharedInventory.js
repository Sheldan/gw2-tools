import { createSlice } from '@reduxjs/toolkit'

export const sharedInventorySlice = createSlice({
    name: 'sharedInventory',
    initialState: {
        value: {slots: [], addedSlots: [], removedSlots: []}
    },
    reducers: {
        setSharedInventory: (state, action) => {
            state.value = action.payload
        },
        setAddedSharedInventorySlots: (state, action) => {
            state.value.addedSlots = action.payload
        },
        updateChangedSharedInventorySlots: (state, action) => {
            let slotsToChange = action.payload;
            Object.keys(slotsToChange).forEach(slotId => {
                const existingSlot = state.value.slots.find(slot => slot.id === parseInt(slotId))
                existingSlot.changed = slotsToChange[slotId]
            })
        },
        setRemovedSharedInventorySlots: (state, action) => {
            state.value.removedSlots = action.payload
        }
    }
})

export const {
    setSharedInventory,
    setAddedSharedInventorySlots,
    updateChangedSharedInventorySlots,
    setRemovedSharedInventorySlots } = sharedInventorySlice.actions

export default sharedInventorySlice.reducer