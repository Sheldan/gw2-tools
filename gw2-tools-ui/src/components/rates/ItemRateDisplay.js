import {InventoryItem} from "../common/InventoryItem";
import styles from "./DropRates.module.css";
import {ItemRateItemDisplay} from "./ItemRateItemDisplay";
import {ItemRateCurrencyDisplay} from "./ItemRateCurrencyDisplay";

export function ItemRateDisplay({item, showRelative}) {

    let receivedItems = <>
        {item.receivedItems.map((receivedItem) => <ItemRateItemDisplay item={receivedItem} showRelative={showRelative}/>)}
    </>;

    let receivedCurrencies = <>
        {item.receivedCurrencies.map((receivedCurrency) => <ItemRateCurrencyDisplay currency={receivedCurrency} showRelative={showRelative}/>)}
    </>;

    return (
        <>
            <div className={styles.itemRateContainer}>
                <div className={styles.openedItem}>
                    <InventoryItem item={item.item}/>
                </div>
                <div className={styles.resultingItems}>
                    {receivedItems} {receivedCurrencies}
                </div>
            </div>
        </>
    );
}