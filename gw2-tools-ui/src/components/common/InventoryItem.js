import styles from "../creation/InventoryDifference.module.css";
import ItemDisplay from "./ItemDisplay.module.css";
import {useSelector} from "react-redux";

export const InventoryItem = ({item}) => {
    const config = useSelector(state => state.config.value)
    let classNames = `${styles.imageBottom} ${styles.numberDisplay} ${item.changed > 0 ? styles.changedDisplayPositive : styles.changedDisplayNegative}`;

    let rarityClasses = new Map()
    rarityClasses['LEGENDARY'] = ItemDisplay.legendary;
    rarityClasses['ASCENDED'] = ItemDisplay.ascended;
    rarityClasses['EXOTIC'] = ItemDisplay.exotic;
    rarityClasses['RARE'] = ItemDisplay.rare;
    rarityClasses['MASTERWORK'] = ItemDisplay.masterwork;
    rarityClasses['FINE'] = ItemDisplay.fine;
    rarityClasses['BASIC'] = ItemDisplay.basic;
    rarityClasses['JUNK'] = ItemDisplay.junk;

    let itemDisplay = <div className={styles.imageContainer}>
        <img src={item.iconUrl} title={item.name} alt={item.name} className={`${styles.itemDisplay} ${rarityClasses[item.rarity]}`}/>
        <span
            className={`${styles.imageCentered} ${styles.numberDisplay}`}>{item.count !== 1 && item.count !== undefined ? `${item.count}x` : ''}</span>
        <span className={classNames}>{item.changed !== 0 && item.changed !== undefined ? `${item.changed}x` : ''}</span>
    </div>;

    function displayItem() {
        if(config.showChangedOnly) {
            return item.changed !== 0
        } else {
            return true
        }
    }
    return (
        <>
            {displayItem() ? itemDisplay : ''}
        </>
    )
}