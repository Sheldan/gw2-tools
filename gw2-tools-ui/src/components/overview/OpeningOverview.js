import {useDispatch, useSelector} from 'react-redux'
import fetcher from "../../utils/fetcher";
import {useState} from "react";
import {OpeningDisplay} from "./OpeningDisplay";
import {setOpenings} from "../../redux/slices/openings";

export function OpeningOverview() {
    const apiKey = useSelector(state => state.apiKey.value)
    const openings = useSelector(state => state.openings.value)
    const [onlyMine, setOnlyMine] = useState(true);
    const [openingsLoading, setOpeningsLoading] = useState(false);
    const dispatch = useDispatch()

    async function fetchOpenings() {
        const onlyMineParameter = onlyMine ? '?showOwnOnly=true' : ''
        const response = await fetcher(`openings${onlyMineParameter}`, {apiKey: apiKey})
        const openingsObj = await response.json()
        return parseOpenings(openingsObj);
    }

    function parseOpenings(openingsObj) {
        const openings = []
        openingsObj.openings.forEach((opening) => {
            const parsedOpening = {}
            const changedItems = []
            const increasedItems = []
            const reducedItems = []
            opening.itemChanges.forEach((changedItem) => {
                const newItem = {
                    id: changedItem.id,
                    changed: changedItem.count,
                    name: changedItem.name,
                    iconUrl: changedItem.iconUrl,
                    rarity: changedItem.rarity
                }
                changedItems.push(newItem)
                if(newItem.changed > 0) {
                    increasedItems.push(newItem)
                } else {
                    reducedItems.push(newItem)
                }
            })
            const changedCurrencies = []
            const increasedCurrencies = []
            const reducedCurrencies = []
            opening.currencyChanges.forEach((changedCurrency) => {
                const newCurrency = {
                    id: changedCurrency.id,
                    name: changedCurrency.name,
                    changed: changedCurrency.amount,
                    iconUrl: changedCurrency.iconUrl
                }
                changedCurrencies.push(newCurrency)
                if(newCurrency.changed > 0) {
                    increasedCurrencies.push(newCurrency)
                } else {
                    reducedCurrencies.push(newCurrency)
                }
            })
            parsedOpening.items = changedItems;
            parsedOpening.currencies = changedCurrencies;
            parsedOpening.increasedItems = increasedItems;
            parsedOpening.increasedCurrencies = increasedCurrencies;
            parsedOpening.reducedCurrencies = reducedCurrencies;
            parsedOpening.reducedItems = reducedItems;
            parsedOpening.openingDate = opening.openingDate;
            parsedOpening.description = opening.description;
            parsedOpening.id = opening.openingId;
            openings.push(parsedOpening)
        })
        return openings;
    }

    async function loadOpenings() {
        setOpeningsLoading(true)
        const openings = await fetchOpenings();
        dispatch(setOpenings(openings))
        setOpeningsLoading(false)
    }

    function toggleShowMine() {
        setOnlyMine(!onlyMine)
    }

    let mineFilter = <label>
        Display only mine
        <input type={"checkbox"} checked={onlyMine} onChange={toggleShowMine}/>
    </label>;
    return (
        <>
            {apiKey !== '' ? mineFilter : ''}
            <label>
                <button onClick={loadOpenings} disabled={openingsLoading}>Load openings</button>
            </label>
            <h2>Openings</h2>
            {openings.map(opening =>
                <OpeningDisplay opening={opening} onlyMine={onlyMine}/>
            )}
        </>
    );
}