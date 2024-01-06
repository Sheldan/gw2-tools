import {InventoryItem} from "../common/InventoryItem";
import styles from "./Openingdisplay.module.css";
import {CurrencyDisplay} from "../common/CurrencyDisplay";
import fetcher from "../../utils/fetcher";
import {useDispatch, useSelector} from "react-redux";
import {removeOpening} from "../../redux/slices/openings";
import toast from "react-simple-toasts";

export function OpeningDisplay({opening, onlyMine}) {
    const apiKey = useSelector(state => state.apiKey.value)
    const dispatch = useDispatch()

    let increasedItems = <>
        {opening.increasedItems.map((item) => <InventoryItem item={item}/>)}
    </>;
    let reducedItems = <>
        {opening.reducedItems.map((item) => <InventoryItem item={item}/>)}
    </>;
    let increasedCurrencies = <>
        {opening.increasedCurrencies.map((currency) => <CurrencyDisplay currency={currency}/>)}
    </>;
    let reducedCurrencies = <>
        {opening.reducedCurrencies.map((currency) => <CurrencyDisplay currency={currency}/>)}
    </>;

    async function deleteOpeningClick() {
        await fetcher(`openings/${opening.id}`, {apiKey: apiKey, method: "DELETE"})
        dispatch(removeOpening({id: opening.id}))
        toast('Opening has been deleted.')
    }

    let deleteOpeningButton = <button onClick={deleteOpeningClick}>Delete opening</button>;
    return (
        <>
            Description: {opening.description !== '' && opening.description !== undefined ? opening.description : 'No description'}
            : {opening.id} opened on: {opening.openingDate} {onlyMine && apiKey !== '' ? deleteOpeningButton : ''}
            <div className={styles.container}>
                <div className={styles.result}>
                    {reducedItems}
                    {reducedCurrencies}
                </div>
                <div className={styles.opened}>
                    {increasedItems}
                    {increasedCurrencies}
                </div>
            </div>
        </>
    );
}