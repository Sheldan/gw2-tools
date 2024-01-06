import styles from "../creation/InventoryDifference.module.css";

export const ItemRateCurrencyDisplay = ({currency, showRelative}) => {

    function getChangedValue() {
        if(showRelative) {
            return currency.per
        } else {
            return currency.amount
        }
    }

    let currencyDisplay = <div className={styles.imageContainer}>
        <img src={currency.iconUrl} title={currency.name} alt={currency.name} className={styles.currencyDisplay}/>
        <span
            className={`${styles.imageCentered} ${styles.numberDisplay} ${styles.changedDisplayPositive}`}>{currency.per !== 0 && currency.per !== undefined
        && currency.amount !== 0 && currency.amount !== undefined ? `${getChangedValue()}x` : ''}</span>
    </div>;

    return (
        <>
            {currencyDisplay}
        </>
    )
}