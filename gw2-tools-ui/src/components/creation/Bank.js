import {useDispatch, useSelector} from 'react-redux'
import {InventoryItem} from "../common/InventoryItem";
import fetcher from "../../utils/fetcher";
import {
    calculateBankDifferences,
    parseBank,
} from "../../utils/inventoryUtils";
import {useState} from "react";
import {setAddedBankSlots, setBank, setRemovedBankSlots, updateChangedBankSlots} from "../../redux/slices/bank";
import styles from "./InventoryDifference.module.css";

export function Bank() {
    const bank = useSelector(state => state.bank.value)
    const config = useSelector(state => state.config.value)
    const apiKey = useSelector(state => state.apiKey.value)
    const loadingState = useSelector(state => state.loadingState.value)

    const [bankLoading, setBankLoading] = useState(false);

    const dispatch = useDispatch()

    let displayAdded = bank.addedSlots.length > 0
    let displayRemoved = bank.removedSlots.length > 0

    const removedItems =
        <>
            {displayRemoved ? <span className={styles.spanNewLine}>Removed items</span> : ''}
            {bank.removedSlots.map((item) => <InventoryItem item={item}/>)}
        </>

    const addedItems =
        <>
            {displayAdded ? <span className={styles.spanNewLine}>Added Items</span> : ''}
            {bank.addedSlots.map((item) => <InventoryItem item={item}/>)}
        </>

    async function fetchBank() {
        const response = await fetcher("bank", {apiKey: apiKey})
        const bankResponse = await response.json()
        return parseBank(bankResponse);
    }

    async function reloadBank() {
        setBankLoading(true)
        try {
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
        } catch (e) {
            console.log(e)
        }
        setBankLoading(false)
    }

    let reloadButton = <button onClick={reloadBank} disabled={loadingState || bankLoading}>Update bank</button>;
    return (
        <>
            <div>
                <h2>Bank</h2>
                {bank.slots.length > 0 ? reloadButton : ''}
            </div>
            {bank.slots.map((item) =>
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