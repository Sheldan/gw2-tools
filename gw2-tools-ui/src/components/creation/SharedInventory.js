import {useDispatch, useSelector} from 'react-redux'
import {InventoryItem} from "../common/InventoryItem";
import fetcher from "../../utils/fetcher";
import {
    calculateSharedInventoryDifferences,
    parseSharedInventory
} from "../../utils/inventoryUtils";
import {useState} from "react";
import styles from "./InventoryDifference.module.css";
import {
    setAddedSharedInventorySlots,
    setRemovedSharedInventorySlots,
    setSharedInventory, updateChangedSharedInventorySlots
} from "../../redux/slices/sharedInventory";

export function SharedInventory() {
    const sharedInventory = useSelector(state => state.sharedInventory.value)
    const config = useSelector(state => state.config.value)
    const apiKey = useSelector(state => state.apiKey.value)
    const loadingState = useSelector(state => state.loadingState.value)

    const [sharedInventoryLoading, setSharedInventoryLoading] = useState(false);

    const dispatch = useDispatch()

    let displayAdded = sharedInventory.addedSlots.length > 0
    let displayRemoved = sharedInventory.removedSlots.length > 0

    const removedItems =
        <>
            {displayAdded ? <span className={styles.spanNewLine}>Removed items</span> : ''}
            {sharedInventory.removedSlots.map((item) => <InventoryItem item={item}/>)}
        </>

    const addedItems =
        <>
            {displayRemoved ? <span className={styles.spanNewLine}>Added Items</span> : ''}
            {sharedInventory.addedSlots.map((item) => <InventoryItem item={item}/>)}
        </>

    async function fetchSharedInventory() {
        const response = await fetcher("sharedInventory", {apiKey: apiKey})
        const sharedInventoryResponse = await response.json()
        return parseSharedInventory(sharedInventoryResponse);
    }

    async function reloadSharedInventory() {
        setSharedInventoryLoading(true)
        const sharedInventoryValue = await fetchSharedInventory();

        if(!config.locked) {
            const sharedInventoryState = {
                slots: sharedInventoryValue,
                addedSlots: [],
                removedSlots: []
            }
            dispatch(setSharedInventory(sharedInventoryState))
        } else {
            const [slotsToAdd, slotsToRemove, slotsToUpdate] = calculateSharedInventoryDifferences(sharedInventory, sharedInventoryValue, config.mocking);
            dispatch(setRemovedSharedInventorySlots(slotsToRemove))
            dispatch(setAddedSharedInventorySlots(slotsToAdd))
            dispatch(updateChangedSharedInventorySlots(slotsToUpdate))
        }

        setSharedInventoryLoading(false)
    }

    let reloadButton = <button onClick={reloadSharedInventory} disabled={loadingState || sharedInventoryLoading}>Update shared inventory</button>;
    return (
        <>
            <div>
                <h2>Shared inventory</h2>
                {sharedInventory.slots.length > 0 ? reloadButton : ''}
            </div>
            {sharedInventory.slots.map((item) =>
                <InventoryItem item={item}/>
            )}
            <>
                {config.locked ? addedItems : ''}
            </>
            <>
                {config.locked ? removedItems : ''}
            </>
        </>
    );
}