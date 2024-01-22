import {useDispatch, useSelector} from "react-redux";
import {InventoryItem} from "../common/InventoryItem";
import {
    replaceCharacterItems,
    setAddedInventoryItemsForCharacter, setChangedInventoryItemsForCharacter,
    setRemovedInventoryItemsForCharacter
} from "../../redux/slices/inventory";
import fetcher from "../../utils/fetcher";
import {
    calculateInventoryDifferencesForCharacter,
    calculateWalletDifference,
    parseInventory,
    parseWallet
} from "../../utils/inventoryUtils";
import {useState} from "react";
import {setAddedWalletCurrency, setWallet, updateChangedWalletCurrencies} from "../../redux/slices/wallet";

export const CharacterInventory = ({character}) => {
    const loadingState = useSelector(state => state.loadingState.value)
    const apiKey = useSelector(state => state.apiKey.value)
    const wallet = useSelector(state => state.wallet.value)
    const config = useSelector(state => state.config.value)
    const [characterLoading, setCharacterLoading] = useState(false);
    const dispatch = useDispatch()

    let displayAdded = character.addedItems.length

    let addedItemsElement = <>
        {displayAdded ? <h2>Added items</h2> : ''}
        {character.addedItems.map((item) =>
            <InventoryItem item={item}/>
        )}
    </>;

    async function reloadWallet() {
        const walletResponse = await fetcher("wallet", {apiKey: apiKey})
        const fullWallet = await walletResponse.json()
        const accountCurrencies = parseWallet(fullWallet);
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

    async function reloadCharacterInventory() {
        const response = await fetcher(`inventory/${character.name}`, {apiKey: apiKey})
        const characterInventoryObj = await response.json()
        if(!config.locked) {
            const inventory = parseInventory(characterInventoryObj);
            dispatch(replaceCharacterItems(inventory))
        } else {
            const parsedInventory = parseInventory(characterInventoryObj);
            const [
                itemsToAdd,
                itemsToRemove,
                itemsToUpdate
            ] = calculateInventoryDifferencesForCharacter(character, parsedInventory, config.mocking);
            let itemsToAddPayload = {
                name: character.name,
                addedItems: itemsToAdd
            };
            let itemsToRemovePayload = {
                name: character.name,
                removedItems: itemsToRemove
            };
            let itemsToUpdatePayload = {
                name: character.name,
                items: itemsToUpdate
            };
            dispatch(setAddedInventoryItemsForCharacter(itemsToAddPayload))
            dispatch(setRemovedInventoryItemsForCharacter(itemsToRemovePayload))
            dispatch(setChangedInventoryItemsForCharacter(itemsToUpdatePayload))
        }
    }

    async function updateCharacter() {
        setCharacterLoading(true)
        try {
            await reloadCharacterInventory();
            await reloadWallet();
        } catch (e) {
            console.log(e)
        }
        setCharacterLoading(false)
    }

    return (
        <>
            <div>
                <h1>{character.name}</h1>
                <button onClick={updateCharacter} disabled={loadingState || characterLoading}>Update character</button>
            </div>

            {character.items.map((item) =>
                <InventoryItem item={item}/>
            )}
            {config.locked ? addedItemsElement : ''}
        </>
    )
}