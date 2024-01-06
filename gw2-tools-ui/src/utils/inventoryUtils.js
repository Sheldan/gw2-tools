export function parseInventory(inventory) {
    let charName = inventory.name;
    let charInventory = {}
    charInventory.name = charName
    charInventory.items = []
    charInventory.addedItems = []
    charInventory.removedItems = []
    const usedItems = new Map()
    for (const bag of inventory.bags) {
        for (const item of bag.items) {
            if(!(item.id in usedItems)) {
                let itemToAdd = {
                    id: item.id,
                    name: item.name,
                    iconUrl: item.iconUrl,
                    rarity: item.rarity,
                    count: item.count,
                    changed: 0
                };
                charInventory.items.push(itemToAdd)
                usedItems[item.id] = itemToAdd
            } else {
                usedItems[item.id].count += item.count
            }
        }
    }
    return charInventory;
}

export function parseWallet(fullWallet) {
    const currencies = fullWallet.currencies;
    const accountCurrencies = []
    for (const currency of currencies) {
        accountCurrencies.push({
            id: currency.id,
            name: currency.name,
            amount: currency.amount,
            iconUrl: currency.iconUrl,
            order: currency.order,
            changed: 0
        })
    }
    return accountCurrencies;
}

export function parseBank(bank) {
    const slots = bank.slots;
    const bankSlots = []
    const usedItems = new Map()
    for (const slot of slots) {
        if(!(slot.id in usedItems)) {
            let itemToAdd = {
                id: slot.id,
                name: slot.name,
                count: slot.count,
                rarity: slot.rarity,
                iconUrl: slot.iconUrl,
                changed: 0
            };
            bankSlots.push(itemToAdd)
            usedItems[slot.id] = itemToAdd;
        } else {
            usedItems[slot.id].count += slot.count
        }
    }
    return bankSlots;
}

export function parseSharedInventory(sharedInventory) {
    const slots = sharedInventory.slots;
    const sharedInventorySlots = []
    const usedItems = new Map()
    for (const slot of slots) {
        if(!(slot.id in usedItems)) {
            let itemToAdd = {
                id: slot.id,
                name: slot.name,
                count: slot.count,
                rarity: slot.rarity,
                iconUrl: slot.iconUrl,
                changed: 0
            };
            sharedInventorySlots.push(itemToAdd)
            usedItems[slot.id] = itemToAdd;
        } else {
            usedItems[slot.id].count += slot.count
        }
    }
    return sharedInventorySlots;
}

export function parseMaterials(materials) {
    const slots = materials.slots;
    const materialSlots = []
    for (const slot of slots) {
        materialSlots.push({
            id: slot.id,
            name: slot.name,
            count: slot.count,
            rarity: slot.rarity,
            iconUrl: slot.iconUrl,
            changed: 0
        })
    }
    return materialSlots;
}


export function calculateBankDifferences(existingBank, incomingBankSlots, mocking) {
    const bankMap = new Map()
    existingBank.slots.forEach(slot => {
        bankMap[slot.id] = slot
    })
    const slotsToAdd = []
    const slotsAfterUpdate = new Map();
    const slotsToRemove = []
    const slotsToUpdate = new Map()
    incomingBankSlots.forEach(slot => {
        slotsAfterUpdate[slot.id] = slot;
        let mockValue = ~~(Math.random() * 10) === 0 && mocking;
        if (!(slot.id in bankMap) || mockValue) {
            slotsToAdd.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: slot.count
            })
        } else {
            const existingItem = bankMap[slot.id];
            const mockingValue = mocking ? ~~(Math.random() * 25 - 12) : 0
            slotsToUpdate[slot.id] = slot.count - existingItem.count + mockingValue;
        }
    })
    existingBank.slots.forEach(slot => {
        let mockValue = ~~(Math.random() * 20) === 0 && mocking;
        if (!(slot.id in slotsAfterUpdate) || mockValue) {
            slotsToRemove.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: -slot.count
            })
        }
    })
    return [slotsToAdd, slotsToRemove, slotsToUpdate];
}

export function calculateSharedInventoryDifferences(existingSharedInventory, incomingSharedInventorySlots, mocking) {
    const sharedInventoryMap = new Map()
    existingSharedInventory.slots.forEach(slot => {
        sharedInventoryMap[slot.id] = slot
    })
    const slotsToAdd = []
    const slotsAfterUpdate = new Map();
    const slotsToRemove = []
    const slotsToUpdate = new Map()
    incomingSharedInventorySlots.forEach(slot => {
        slotsAfterUpdate[slot.id] = slot;
        let mockValue = ~~(Math.random() * 10) === 0 && mocking;
        if (!(slot.id in sharedInventoryMap) || mockValue) {
            slotsToAdd.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: slot.count
            })
        } else {
            const existingItem = sharedInventoryMap[slot.id];
            const mockingValue = mocking ? ~~(Math.random() * 25 - 12) : 0
            slotsToUpdate[slot.id] = slot.count - existingItem.count + mockingValue;
        }
    })
    existingSharedInventory.slots.forEach(slot => {
        let mockValue = ~~(Math.random() * 20) === 0 && mocking;
        if (!(slot.id in slotsAfterUpdate) || mockValue) {
            slotsToRemove.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: -slot.count
            })
        }
    })
    return [slotsToAdd, slotsToRemove, slotsToUpdate];
}

export function calculateMaterialsDifference(materials, materialSlots, mocking) {
    const materialMap = new Map()
    materials.slots.forEach(slot => {
        materialMap[slot.id] = slot
    })
    const slotsToAdd = []
    const slotsAfterUpdate = new Map()
    const slotsToRemove = []
    const slotsToUpdate = new Map()
    materialSlots.forEach(slot => {
        slotsAfterUpdate[slot.id] = slot;
        let mockValue = ~~(Math.random() * 10) === 0 && mocking;
        if (!(slot.id in materialMap) || mockValue) {
            slotsToAdd.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: slot.count
            })
        } else {
            const existingItem = materialMap[slot.id];
            const mockingValue = mocking ? ~~(Math.random() * 25 - 12) : 0
            slotsToUpdate[slot.id] = slot.count - existingItem.count + mockingValue;
        }
    })
    materials.slots.forEach(slot => {
        let mockValue = ~~(Math.random() * 20) === 0 && mocking;
        if (!(slot.id in slotsAfterUpdate) || mockValue) {
            slotsToRemove.push({
                id: slot.id,
                name: slot.name,
                iconUrl: slot.iconUrl,
                rarity: slot.rarity,
                count: 0,
                changed: -slot.count
            })
        }
    })
    return [slotsToAdd, slotsToRemove, slotsToUpdate];
}

export function calculateWalletDifference(wallet, accountCurrencies, mocking) {
    const walletMap = new Map()
    const currenciesToUpdate = new Map()
    wallet.currencies.forEach(currency => {
        walletMap[currency.id] = currency
    })
    const currenciesToAdd = []
    accountCurrencies.forEach(currency => {
        let mockValue = ~~(Math.random() * 10) === 0 && mocking;
        if (!(currency.id in walletMap) || mockValue) {
            currenciesToAdd.push({
                id: currency.id,
                name: currency.name,
                iconUrl: currency.iconUrl,
                amount: 0,
                changed: currency.amount
            })
        } else {
            const existingItem = walletMap[currency.id];
            const mockingValue = mocking ? ~~(Math.random() * 25 - 12) : 0
            currenciesToUpdate[currency.id] = currency.amount - existingItem.amount + mockingValue;
        }
    })
    return [currenciesToUpdate, currenciesToAdd];
}

export function calculateInventoryDifferencesForCharacter(existingInventory, incomingCharacterInventory, mocking) {
    const itemMap = new Map()
    existingInventory.items.forEach(item => {
        itemMap[item.id] = item
    })
    const itemsAfterUpdate = new Map()
    const itemsToUpdateForCharacter = {}
    const itemsToAdd = []
    const itemsToRemove = []
    incomingCharacterInventory.items.forEach(item => {
        itemsAfterUpdate[item.id] = item
        let mockValue = ~~(Math.random() * 10) === 0 && mocking;
        if (!(item.id in itemMap) || mockValue) {
            itemsToAdd.push({
                id: item.id,
                name: item.name,
                iconUrl: item.iconUrl,
                rarity: item.rarity,
                count: 0,
                changed: item.count
            })
        } else { // completely removed items are not marked with - or completely removed
            const existingItem = itemMap[item.id];
            const mockingValue = mocking ? ~~(Math.random() * 25 - 12) : 0
            itemsToUpdateForCharacter[item.id] = item.count - existingItem.count + mockingValue;
        }
    })
    for (const itemIdBefore in itemMap) {
        let mockValue = ~~(Math.random() * 20) === 0 && mocking;
        if (!(itemIdBefore in itemsAfterUpdate) || mockValue) {
            const itemBefore = itemMap[itemIdBefore]
            itemsToRemove.push({
                id: itemBefore.id,
                name: itemBefore.name,
                iconUrl: itemBefore.iconUrl,
                rarity: itemBefore.rarity,
                count: 0,
                changed: -itemBefore.count
            })
            itemsToUpdateForCharacter[itemIdBefore] = -itemMap[itemIdBefore].count
        }
    }
    return [itemsToAdd, itemsToRemove, itemsToUpdateForCharacter]
}