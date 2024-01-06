import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {setTo} from "./slices/apiKey";

export const savingApiKeyMiddleware = createListenerMiddleware();
savingApiKeyMiddleware.startListening({
    matcher: isAnyOf(setTo),
    effect: (action, listenerApi) => {
        localStorage.setItem("apiKey", JSON.stringify(listenerApi.getState().apiKey.value));
    }
});