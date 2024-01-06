import styles from "../creation/InventoryDifference.module.css";
import ItemDisplay from "../common/ItemDisplay.module.css";

export const ItemRateItemDisplay = ({item, showRelative}) => {

    let rarityClasses = new Map()
    rarityClasses['LEGENDARY'] = ItemDisplay.legendary;
    rarityClasses['ASCENDED'] = ItemDisplay.ascended;
    rarityClasses['EXOTIC'] = ItemDisplay.exotic;
    rarityClasses['RARE'] = ItemDisplay.rare;
    rarityClasses['MASTERWORK'] = ItemDisplay.masterwork;
    rarityClasses['FINE'] = ItemDisplay.fine;
    rarityClasses['BASIC'] = ItemDisplay.basic;
    rarityClasses['JUNK'] = ItemDisplay.junk;

    function getChangedValue() {
        if(showRelative) {
            return item.per
        } else {
            return item.count
        }
    }

    let itemDisplay = <div className={styles.imageContainer}>
        <img src={item.iconUrl} title={item.name} alt={item.name}
             className={`${styles.itemDisplay} ${rarityClasses[item.rarity]}`}/>
        <span
            className={`${styles.imageCentered} ${styles.numberDisplay} ${styles.changedDisplayPositive}`}>{item.per !== 0 && item.per !== undefined
        && item.count !== 0 && item.count !== undefined ? `${getChangedValue()}x` : ''}</span>
    </div>;

    return (
        <>
            {itemDisplay}
        </>
    )
}