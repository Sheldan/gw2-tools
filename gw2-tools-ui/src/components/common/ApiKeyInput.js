import {useSelector, useDispatch } from 'react-redux'
import {setTo} from "../../redux/slices/apiKey";

export function ApiKeyInput() {
    const apiKey = useSelector(state => state.apiKey.value)
    const loadingState = useSelector(state => state.loadingState.value)
    const dispatch = useDispatch()
    return (
        <>
            <label>
                API Key: <input name="apiKey" value={apiKey} disabled={loadingState} onChange={(event) => {
                dispatch(setTo(event.target.value))
            }}/>
            </label>
        </>
    );
}