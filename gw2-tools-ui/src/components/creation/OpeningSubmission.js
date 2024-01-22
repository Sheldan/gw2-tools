import {useSelector, useDispatch } from 'react-redux'
import fetcher from "../../utils/fetcher";
import {setLoading} from "../../redux/slices/loadingState";
import {useState} from "react";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

export function OpeningSubmission() {
    const apiKey = useSelector(state => state.apiKey.value)
    const inventory = useSelector(state => state.inventory.value)
    const sharedInventory = useSelector(state => state.sharedInventory.value)
    const wallet = useSelector(state => state.wallet.value)
    const bank = useSelector(state => state.bank.value)
    const materials = useSelector(state => state.materials.value)
    const loadingState = useSelector(state => state.loadingState.value)
    const dispatch = useDispatch()

    const [openingDescription, setOpeningDescription] = useState("");

    function createItem(item) {
        return {
            itemId: item.id,
            change: item.changed,
            itemType: "ITEM"
        };
    }

    function createCurrency(currency) {
        return {
            itemId: currency.id,
            change: currency.changed,
            itemType: "CURRENCY"
        };
    }

    function getChanges() {
        const changes = []
        const currencyChanges = []
        for (const charName in inventory) {
            const charInventory = inventory[charName]
            if (charInventory.addedItems) {
                charInventory.addedItems.forEach((item) => {
                    changes.push(createItem(item))
                })
            }
            if (charInventory.items) {
                charInventory.items.forEach((item) => {
                    if (item.changed !== 0) {
                        changes.push(createItem(item))
                    }
                })
            }
        }
        sharedInventory.slots.forEach((slot => {
            if (slot.changed !== 0) {
                changes.push(createItem(slot))
            }
        }))
        sharedInventory.addedSlots.forEach((slot => {
            changes.push(createItem(slot))
        }))
        wallet.currencies.forEach((slot => {
            if (slot.changed !== 0) {
                currencyChanges.push(createCurrency(slot))
            }
        }))
        wallet.addedCurrencies.forEach((slot => {
            currencyChanges.push(createCurrency(slot))
        }))
        bank.slots.forEach((slot => {
            if (slot.changed !== 0) {
                changes.push(createItem(slot))
            }
        }))
        bank.addedSlots.forEach((slot => {
            changes.push(createItem(slot))
        }))
        materials.slots.forEach((slot => {
            if (slot.changed !== 0) {
                changes.push(createItem(slot))
            }
        }))
        materials.addedSlots.forEach((slot => {
            changes.push(createItem(slot))
        }))

        const changesMap = new Map()
        // this is done, so that changes over different area cancel one another out
        changes.forEach((change => {
            if(changesMap.has(change.itemId)) {
               changesMap.get(change.itemId).change += change.change;
            } else {
                changesMap.set(change.itemId, change)
            }
        }))
        const finalChangesList = []
        changesMap.forEach((value) => {
            if(value.change !== 0)  {
                finalChangesList.push(value)
            }
        })
        currencyChanges.forEach((currencyChange) => {
            finalChangesList.push(currencyChange)
        })
        return finalChangesList;
    }

    async function submitOpening() {
        dispatch(setLoading(true))
        try {
            const submissionBody = {}
            submissionBody.items = getChanges();
            submissionBody.description = openingDescription;
            await fetcher("openings", {apiKey: apiKey, method: "POST", body: JSON.stringify(submissionBody), headers: {"Content-Type": "application/json"}})
            setOpeningDescription("")
            toast('Opening has been submitted.')
        } catch (e) {
            console.log(e)
        }
        dispatch(setLoading(false))
    }

    function hasChanges() {
        return getChanges().length > 0
    }

    function updateDescription(newDescription) {
        setOpeningDescription(newDescription)
    }

    return (
        <>
            <div>
                <label>Description<textarea name="description" maxLength={1024} value={openingDescription} onChange={e => updateDescription(e.target.value)}/></label>
                <label>
                    <button onClick={submitOpening} disabled={loadingState || !hasChanges()}>Submit opening</button>
                </label>
            </div>
        </>
    );
}