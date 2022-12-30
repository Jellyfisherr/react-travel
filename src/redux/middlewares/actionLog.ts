import { Middleware } from "redux";

export const actionLog = (store) => (next) => (action) => {
    console.log("state current", store.getState());
    console.log("fire action", action);
    next(action)
    console.log("state update", store.getState());
}
