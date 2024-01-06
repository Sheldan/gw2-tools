import {useSelector, useDispatch } from 'react-redux'
import {toggleLocked} from "../../redux/slices/config";

export function LockStateInput() {
    const loadingState = useSelector(state => state.loadingState.value)
    const config = useSelector(state => state.config.value)
    const dispatch = useDispatch()
    function toggleState() {
        dispatch(toggleLocked())
    }
    return (
        <>
            <label>
                Locked
                <input type={"checkbox"} checked={config.locked} disabled={loadingState} onChange={toggleState}/>
            </label>
        </>
    );
}