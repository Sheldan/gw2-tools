import {useSelector } from 'react-redux'
import {CurrencyDisplay} from "../common/CurrencyDisplay";

export function Wallet() {
    const wallet = useSelector(state => state.wallet.value)
    return (
        <>
            <h2>Wallet</h2>
            {wallet.currencies.map(currency => <CurrencyDisplay currency={currency}/>)}
            {wallet.addedCurrencies.map(currency => <CurrencyDisplay currency={currency}/>)}
        </>
    );
}