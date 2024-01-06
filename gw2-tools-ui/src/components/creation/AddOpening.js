import {ApiKeyInput} from "../common/ApiKeyInput";
import {Settings} from "./Settings";
import {OpeningSubmission} from "./OpeningSubmission";
import {ItemDifference} from "./ItemDifference";
import styles from "./AddOpening.module.css";

export function AddOpening() {
    return (
        <>
            <div className={styles.openingConfig}>
                <ApiKeyInput/>
                <Settings/>
                <OpeningSubmission/>
                <ItemDifference/>
            </div>
        </>
    );
}