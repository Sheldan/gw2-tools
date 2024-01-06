import styles from "../creation/InventoryDifference.module.css";
import {useSelector} from "react-redux";

export const CurrencyDisplay = ({currency}) => {
    const config = useSelector(state => state.config.value)
    // TODO render gold coins differently
    let classNames = `${styles.imageBottom} ${styles.numberDisplay} ${currency.changed > 0 ? styles.changedDisplayPositive : styles.changedDisplayNegative}`;

    function displayItem() {
        if(config.showChangedOnly) {
            return currency.changed !== 0
        } else {
            return true
        }
    }

    let currencyDisplay = <div className={styles.imageContainer}>
        <img src={currency.iconUrl} title={currency.name} alt={currency.name} className={styles.currencyDisplay}/>
        <span
            className={`${styles.imageCentered} ${styles.numberDisplay}`}>{currency.amount > 1 ? `${currency.amount}x` : ''}</span>
        <span className={classNames}>{currency.changed !== 0 ? `${currency.changed}x` : ''}</span>

    </div>;
    return (
        <>
            {displayItem() ? currencyDisplay : ''}
        </>
    )
}