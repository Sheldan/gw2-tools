import {useDispatch, useSelector} from 'react-redux'
import {InventoryItem} from "../common/InventoryItem";
import fetcher from "../../utils/fetcher";
import {calculateMaterialsDifference, parseMaterials} from "../../utils/inventoryUtils";
import {useState} from "react";
import {
    setAddedMaterialSlots,
    setMaterials,
    setRemovedMaterialSlots,
    updateChangedMaterialSlots
} from "../../redux/slices/materials";
import styles from "./InventoryDifference.module.css";

export function Materials() {
    const materials = useSelector(state => state.materials.value)
    const config = useSelector(state => state.config.value)
    const apiKey = useSelector(state => state.apiKey.value)
    const loadingState = useSelector(state => state.loadingState.value)

    const [materialsLoading, setMaterialsLoading] = useState(false);

    const dispatch = useDispatch()

    let displayAdded = materials.addedSlots.length
    let displayRemoved = materials.removedSlots.length

    const removedItems =
        <>
            {displayAdded ? <span className={styles.spanNewLine}>Removed items</span> : ''}
            {materials.removedSlots.map((item) =>
                <InventoryItem item={item}/>
            )}
        </>

    const addedItems =
        <>
            {displayRemoved ? <span className={styles.spanNewLine}>Added Items</span> : ''}
            {materials.addedSlots.map((item) =>
                <InventoryItem item={item}/>
            )}
        </>

    async function fetchMaterials() {
        const response = await fetcher("materials", {apiKey: apiKey})
        const materials = await response.json()
        return parseMaterials(materials);
    }

    async function reloadMaterials() {
        setMaterialsLoading(true)
        try {
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
        } catch (e) {
            console.log(e)
        }

        setMaterialsLoading(false)
    }

    let reloadButton = <button onClick={reloadMaterials} disabled={loadingState || materialsLoading}>Update materials</button>;
    return (
        <>
            <div>
                <h2>Materials</h2>
                {materials.slots.length > 0 ? reloadButton : ''}
            </div>
            {materials.slots.map((item) =>
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