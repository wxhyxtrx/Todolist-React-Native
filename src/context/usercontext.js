import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
    isLogin: false,
    data: {},
};

function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case "AUTH_SUCCESS":
        case "LOGIN_SUCCESS":
            AsyncStorage.setItem("token", payload?.token);
            return {
                isLogin: true,
                data: payload,
            };
        case "AUTH_ERROR":
        case "LOGOUT_SUCCESS":
            AsyncStorage.removeItem("token");
            return {
                isLogin: false,
                data: {},
            };
        default:
            throw new Error();
    }
}

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
}