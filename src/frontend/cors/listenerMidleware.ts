import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "./store";

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch, any>()

