import {useSelector } from 'react-redux'
import {CharacterInventory} from "./CharacterInventory";

export function Inventories() {
    const inventory = useSelector(state => state.inventory.value)
    const config = useSelector(state => state.config.value)

    function shouldShowCharacter(characterInventory) {
        if(!config.showChangedOnly) { //
            return true;
        }
        // quick exits
        if(characterInventory.addedItems.length > 0) {
            return true;
        }
        if(characterInventory.removedItems.length > 0) {
            return true;
        }
        return characterInventory.items.filter(item => item.changed !== 0).length > 0;

    }
    return (
        <>
            <h2>Inventories</h2>
            {inventory.map(characterInventory =>
                shouldShowCharacter(characterInventory) ? <CharacterInventory character={characterInventory} /> : ''
            )}
        </>
    );
}