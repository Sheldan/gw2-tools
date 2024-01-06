import fetcher from "../../utils/fetcher";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setItemRates} from "../../redux/slices/itemRates";
import {ItemRateDisplay} from "./ItemRateDisplay";

export function ItemRates() {

    const [itemRatesLoading, setItemRatesLoading] = useState(false);
    const [relativeRate, setRelativeRate] = useState(false);
    const itemRates = useSelector(state => state.itemRates.value)
    const apiKey = useSelector(state => state.apiKey.value)

    const dispatch = useDispatch()


    function parseItemRates(itemRatesObj) {
        const itemRates = []
        itemRatesObj.itemRates.forEach((itemRate) => {
            const item = itemRate.item;
            const newItem = {
                id: item.id,
                changed: item.count,
                name: item.name,
                iconUrl: item.iconUrl,
                rarity: item.rarity
            }
            const receivedItems = []
            itemRate.receivedItems.forEach((receivedItem) => {
                const newReceivedItem = {
                    id: receivedItem.id,
                    count: receivedItem.count, // we use count for display
                    name: receivedItem.name,
                    iconUrl: receivedItem.iconUrl,
                    rarity: receivedItem.rarity,
                    per: +(receivedItem.count / Math.abs(item.count)).toFixed(2)
                }
                receivedItems.push(newReceivedItem)
            })
            const receivedCurrencies = []
            itemRate.receivedCurrencies.forEach((receivedCurrency) => {
                const newReceivedCurrency = {
                    id: receivedCurrency.id,
                    amount: receivedCurrency.amount, // we use count for display
                    name: receivedCurrency.name,
                    iconUrl: receivedCurrency.iconUrl,
                    rarity: receivedCurrency.rarity,
                    per: +(receivedCurrency.amount / Math.abs(item.count)).toFixed(2)
                }
                receivedCurrencies.push(newReceivedCurrency)
            })
            const itemRateObj = {
                item: newItem,
                receivedItems: receivedItems,
                receivedCurrencies: receivedCurrencies
            }
            itemRates.push(itemRateObj)
        })
        return itemRates;
    }

    async function fetchItemRates() {
        const response = await fetcher(`itemRates`, {apiKey: apiKey})
        const itemRatesObj = await response.json()
        return parseItemRates(itemRatesObj);
    }

    async function loadItemRates() {
        setItemRatesLoading(true)
        const fetchedItemRates = await fetchItemRates()
        dispatch(setItemRates(fetchedItemRates))
        setItemRatesLoading(false)
    }


    function toggleRelativeRate() {
        setRelativeRate(!relativeRate)
    }

    return (
        <>
            <label>
                <button onClick={loadItemRates} disabled={itemRatesLoading}>Load item rates</button>
                <label>
                    Show relative rate
                    <input type={"checkbox"} checked={relativeRate} onChange={toggleRelativeRate}/>
                </label>
            </label>
            <h2>Item rates</h2>
            {itemRates.map(item =>
                <ItemRateDisplay item={item} showRelative={relativeRate}/>
            )}
        </>
    );
}