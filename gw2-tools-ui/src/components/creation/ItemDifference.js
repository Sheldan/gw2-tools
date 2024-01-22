import {useDispatch, useSelector} from "react-redux";
import fetcher from "../../utils/fetcher";
import {setLoading} from "../../redux/slices/loadingState";
import {
    setAddedInventoryItemsForCharacter,
    setChangedInventoryItemsForCharacter,
    setInventoryForCharacter,
    setRemovedInventoryItemsForCharacter
} from "../../redux/slices/inventory";
import {setAddedWalletCurrency, setWallet, updateChangedWalletCurrencies} from "../../redux/slices/wallet";
import {setAddedBankSlots, setBank, setRemovedBankSlots, updateChangedBankSlots} from "../../redux/slices/bank";
import {
    calculateBankDifferences,
    calculateInventoryDifferencesForCharacter,
    calculateMaterialsDifference, calculateSharedInventoryDifferences,
    calculateWalletDifference,
    parseBank,
    parseInventory,
    parseMaterials, parseSharedInventory,
    parseWallet
} from "../../utils/inventoryUtils";
import {Bank} from "./Bank";
import {Wallet} from "./Wallet";
import {Inventories} from "./Inventories";
import {
    setAddedMaterialSlots,
    setMaterials,
    setRemovedMaterialSlots,
    updateChangedMaterialSlots
} from "../../redux/slices/materials";
import {Materials} from "./Materials";
import {SharedInventory} from "./SharedInventory";
import {
    setAddedSharedInventorySlots,
    setRemovedSharedInventorySlots,
    setSharedInventory, updateChangedSharedInventorySlots
} from "../../redux/slices/sharedInventory";


export function ItemDifference() {
    const apiKey = useSelector(state => state.apiKey.value)
    const loadingState = useSelector(state => state.loadingState.value)
    const inventory = useSelector(state => state.inventory.value)
    const sharedInventory = useSelector(state => state.sharedInventory.value)
    const wallet = useSelector(state => state.wallet.value)
    const bank = useSelector(state => state.bank.value)
    const materials = useSelector(state => state.materials.value)
    const config = useSelector(state => state.config.value)

    const dispatch = useDispatch()

    async function fetchBank() {
        const response = await fetcher("bank", {apiKey: apiKey})
        const bank = await response.json()
        return parseBank(bank);
    }

    async function updateBank() {
        const bankSlots = await fetchBank();
        if(!config.locked) {
            const bankState = {
                slots: bankSlots,
                addedSlots: [],
                removedSlots: []
            }
            dispatch(setBank(bankState))
        } else {
            const [slotsToAdd, slotsToRemove, slotsToUpdate] = calculateBankDifferences(bank, bankSlots, config.mocking);

            dispatch(setRemovedBankSlots(slotsToRemove))
            dispatch(setAddedBankSlots(slotsToAdd))
            dispatch(updateChangedBankSlots(slotsToUpdate))
        }
    }

    async function fetchMaterials() {
        const response = await fetcher("materials", {apiKey: apiKey})
        const materials = await response.json()
        return parseMaterials(materials);
    }

    async function updateMaterials() {
        const materialSlots = await fetchMaterials();
        if(!config.locked) {
            const materialsState = {
                slots: materialSlots,
                addedSlots: [],
                removedSlots: []
            }
            dispatch(setMaterials(materialsState))
        } else {
            const [slotsToAdd, slotsToRemove, slotsToUpdate] = calculateMaterialsDifference(materials, materialSlots, config.mocking);

            dispatch(setRemovedMaterialSlots(slotsToRemove))
            dispatch(setAddedMaterialSlots(slotsToAdd))
            dispatch(updateChangedMaterialSlots(slotsToUpdate))
        }
    }

    async function fetchSharedInventory() {
        const response = await fetcher("sharedInventory", {apiKey: apiKey})
        const sharedInventoryResponse = await response.json()
        return parseSharedInventory(sharedInventoryResponse);
    }

    async function updatedSharedInventory() {
        const sharedInventoryResponse = await fetchSharedInventory();
        if(!config.locked) {
            const sharedInventoryState = {
                slots: sharedInventoryResponse,
                addedSlots: [],
                removedSlots: []
            }
            dispatch(setSharedInventory(sharedInventoryState))
        } else {
            const [slotsToAdd, slotsToRemove, slotsToUpdate] = calculateSharedInventoryDifferences(sharedInventory, sharedInventoryResponse, config.mocking);

            dispatch(setRemovedSharedInventorySlots(slotsToRemove))
            dispatch(setAddedSharedInventorySlots(slotsToAdd))
            dispatch(updateChangedSharedInventorySlots(slotsToUpdate))
        }
    }

    async function fetchInformation() {
        dispatch(setLoading(true))
        try {
            await updateWallet()
            await updateBank()
            await updateMaterials()
            await updatedSharedInventory()
            await updateInventoryCharacterSpecific()
        } catch (e) {
            console.log(e)
        }
        dispatch(setLoading(false))
    }

    async function fetchWallet() {
        const response = await fetcher("wallet", {apiKey: apiKey})
        const fullWallet = await response.json()
        return parseWallet(fullWallet);
    }

    async function updateWallet() {
        const accountCurrencies = await fetchWallet();
        if(!config.locked) {
            const walletState = {
                currencies: accountCurrencies,
                addedCurrencies: []
            }
            dispatch(setWallet(walletState))
        } else {
            const [currenciesToUpdate, currenciesToAdd] = calculateWalletDifference(wallet, accountCurrencies, config.mocking);
            dispatch(setAddedWalletCurrency(currenciesToAdd))
            dispatch(updateChangedWalletCurrencies(currenciesToUpdate))
        }
    }

    async function updateInventoryCharacterSpecific() {
        const response = await fetcher("characters", {apiKey: apiKey})
        const characters = await response.json()
        if(!config.locked) {
            for (const charName of characters) {
                const parsedInventory = await fetchInventoryForCharacter(charName)
                dispatch(setInventoryForCharacter(parsedInventory))
            }
        } else {
            for (const charName of characters) {
                const parsedInventory = await fetchInventoryForCharacter(charName)
                const existingInventory = inventory.find((characterInventory => characterInventory.name === charName))
                const [
                    itemsToAdd,
                    itemsToRemove,
                    itemsToUpdate
                ] = calculateInventoryDifferencesForCharacter(existingInventory, parsedInventory, config.mocking);
                let itemsToAddPayload = {
                    name: charName,
                    addedItems: itemsToAdd
                };
                let itemsToRemovePayload = {
                    name: charName,
                    removedItems: itemsToRemove
                };
                let itemsToUpdatePayload = {
                    name: charName,
                    items: itemsToUpdate
                };
                dispatch(setAddedInventoryItemsForCharacter(itemsToAddPayload))
                dispatch(setRemovedInventoryItemsForCharacter(itemsToRemovePayload))
                dispatch(setChangedInventoryItemsForCharacter(itemsToUpdatePayload))
            }
        }
    }

    async function fetchInventoryForCharacter(characterName) {
        const response = await fetcher(`inventory/${characterName}/`, {apiKey: apiKey})
        const inventoryResponse = await response.json()
        return parseInventory(inventoryResponse);
    }

    function noApiKeyProvided() {
        return apiKey === undefined || apiKey.length === 0
    }

    return (
        <>
            <div>
                <button onClick={fetchInformation} disabled={loadingState || noApiKeyProvided()}>Load information</button>
                <Wallet/>
                <Bank/>
                <Materials/>
                <SharedInventory/>
                <Inventories/>
            </div>
        </>
    );
}