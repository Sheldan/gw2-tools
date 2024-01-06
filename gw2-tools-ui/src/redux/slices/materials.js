import { createSlice } from '@reduxjs/toolkit'

export const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
        value: {slots: [], addedSlots: [], removedSlots: []}
    },
    reducers: {
        setMaterials: (state, action) => {
            state.value = action.payload
        },
        setAddedMaterialSlots: (state, action) => {
            state.value.addedSlots = action.payload
        },
        updateChangedMaterialSlots: (state, action) => {
            let slotsToChange = action.payload;
            Object.keys(slotsToChange).forEach(slotId => {
                const existingSlot = state.value.slots.find(slot => slot.id === parseInt(slotId))
                existingSlot.changed = slotsToChange[slotId]
            })
        },
        setRemovedMaterialSlots: (state, action) => {
            state.value.removedSlots = action.payload
        }
    }
})

export const { setMaterials, setRemovedMaterialSlots, setAddedMaterialSlots, updateChangedMaterialSlots,  } = materialsSlice.actions

export default materialsSlice.reducer