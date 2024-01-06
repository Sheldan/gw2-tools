import { createSlice } from '@reduxjs/toolkit'

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        value: []
    },
    reducers: {
        setInventory: (state, action) => {
            state.value = action.payload
        },
        setInventoryForCharacter: (state, action) => {
            const name = action.payload.name;
            const character = state.value.find(inventory => inventory.name === name)
            if(character !== undefined) {
                character.items = action.payload.items;
                character.addedItems = [];
                character.removedItems = [];
            } else {
                state.value.push(action.payload)
            }
        },
        replaceCharacterItems: (state, action) => {
            const name = action.payload.name;
            const character = state.value.find(inventory => inventory.name === name)
            character.items = action.payload.items;
            character.addedItems = [];
            character.removedItems = [];
        },
        clearCharacterItems: (state, action) => {
            const name = action.payload.name;
            const character = state.value.find(inventory => inventory.name === name)
            character.addedItems = [];
            character.removedItems = [];
        },
        setAddedInventoryItems: (state, action) => {
            let itemsToAdd = action.payload;
            for(const charName in itemsToAdd) {
                const itemsToAddForChar = itemsToAdd[charName];
                const existingCharInventory = state.value.find(inventory => inventory.name === charName)
                existingCharInventory.addedItems = itemsToAddForChar
            }
        },
        setRemovedInventoryItems: (state, action) => {
            let itemsToRemove = action.payload;
            for(const charName in itemsToRemove) {
                const itemsToRemoveForChar = itemsToRemove[charName];
                const existingCharInventory = state.value.find(inventory => inventory.name === charName)
                existingCharInventory.removedItems = itemsToRemoveForChar
            }
        },
        setChangedInventoryItems: (state, action) => {
            let itemsToChange = action.payload;
            for(const charName in itemsToChange) {
                const itemsToChangeForChar = itemsToChange[charName];
                const existingCharInventory = state.value.find(inventory => inventory.name === charName)
                existingCharInventory.items.forEach(item => {
                    if(item.id in itemsToChangeForChar) {
                        item.changed = itemsToChangeForChar[item.id]
                    }
                })
            }
        },
        setAddedInventoryItemsForCharacter: (state, action) => {
            let charName = action.payload.name;
            let itemsToAdd = action.payload.addedItems;
            const existingCharInventory = state.value.find(inventory => inventory.name === charName)
            existingCharInventory.addedItems = itemsToAdd
        },
        setRemovedInventoryItemsForCharacter: (state, action) => {
            let charName = action.payload.name;
            let itemsToRemove = action.payload.removedItems;
            const existingCharInventory = state.value.find(inventory => inventory.name === charName)
            existingCharInventory.removedItems = itemsToRemove
        },
        setChangedInventoryItemsForCharacter: (state, action) => {
            let charName = action.payload.name;
            let itemsToUpdate = action.payload.items;
            const existingCharInventory = state.value.find(inventory => inventory.name === charName)
            existingCharInventory.items.forEach(item => {
                if(item.id in itemsToUpdate) {
                    item.changed = itemsToUpdate[item.id]
                }
            })
        }
    }
})

export const { setInventory,
    setInventoryForCharacter,
    replaceCharacterItems,
    clearCharacterItems ,
    setAddedInventoryItems,
    setRemovedInventoryItems,
    setChangedInventoryItems,
    setAddedInventoryItemsForCharacter,
    setRemovedInventoryItemsForCharacter,
    setChangedInventoryItemsForCharacter
} = inventorySlice.actions

export default inventorySlice.reducer