import {useSelector, useDispatch } from 'react-redux'
import {toggleMocking, toggleShowChangedOnly} from "../../redux/slices/config";
import {LockStateInput} from "./LockStateInput";

export function Settings() {
    const config = useSelector(state => state.config.value)
    const dispatch = useDispatch()

    function handleMocking() {
        dispatch(toggleMocking());
    }

    function handleToggleChangedOnly() {
        dispatch(toggleShowChangedOnly())
    }

    return (
        <>
            <div>
                <LockStateInput />
                <label>
                    Mocking
                    <input type={"checkbox"} checked={config.mocking} onChange={handleMocking}/>
                </label>
                <label>
                    Display changed only
                    <input type={"checkbox"} checked={config.showChangedOnly} onChange={handleToggleChangedOnly}/>
                </label>
            </div>
        </>
    );
}