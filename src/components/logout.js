import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { UserContext } from '../context/usercontext';

const Logout = () => {
    const [state, dispatch] = React.useContext(UserContext);
    useEffect(() => {
        AsyncStorage.removeItem("token")
        dispatch({
            type: "LOGOUT_SUCCESS",
        })
    }, [])
    return
}

export default Logout