import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "@expo/vector-icons"
import Home from '../page/home'
import Login from '../page/login'
import Register from '../page/register'
import TodoList from '../page/todolist'
import Category from '../page/category';
import Formlist from '../page/formlist';
import { useContext, useEffect, useState } from "react";
import { API, setAuthorization } from '../config/api';
import { UserContext } from '../context/usercontext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import Detailtodo from '../page/detailtodo';
import Logout from '../components/logout';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


function TabNav() {

    return (
        <Tab.Navigator
            initialRouteName="My list"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "My list") {
                        iconName = focused ? "tasks" : "tasks"
                    } else if (route.name === "Add Todo") {
                        iconName = focused ? "calendar-plus-o" : "calendar-plus-o";
                    }
                    else if (route.name === "Category") {
                        iconName = focused ? "puzzle-piece" : "puzzle-piece"
                    }
                    else if (route.name === "Logout") {
                        iconName = focused ? "power-off" : "power-off"
                    }


                    return <FontAwesome name={iconName} size={size} color={color} />
                },

                tabBarInactiveTintColor: "gray"
            })}
        >
            <Tab.Screen name="My list" component={TodoList} />
            <Tab.Screen name="Add Todo" component={Formlist} />
            <Tab.Screen name="Category" component={Category} />
            <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
    );
}

const Router = () => {
    const [state, dispatch] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    async function checkAuth() {
        try {
            let token = await AsyncStorage.getItem("token");

            if (token) setAuthorization(token);

            await API.post("/auth/verify-token", {
                validateStatus: () => true,
            })
                .then((response) => {
                    // console.log("response yang mau dijadiin payload ini bro", response);
                    // console.log("ini data response harusnya", response);
                    if (response.status >= 400) {
                        return dispatch({
                            type: "AUTH_ERROR",
                        });
                    }

                    // console.log("ini data response pas berhasil", response);
                    const payload = response.data;
                    dispatch({
                        type: "AUTH_SUCCESS",
                        payload,
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: "AUTH_ERROR",
                    });
                    // console.log("ini state error", state);
                });
            setIsLoading(false);
        } catch (error) {
            // console.log(error);
            setIsLoading(false);
        }
    }

    async function isAsyncTokenExist() {
        await AsyncStorage.getItem("token");
        checkAuth();
    }

    useEffect(() => {
        isAsyncTokenExist();
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <Spinner size="large" visible={isLoading} textContent={'Waiting...'} overlayColor="rgba(0, 0, 0, 0.25)" />
                ) :
                    state.isLogin ? (
                        <Stack.Navigator>
                            <Stack.Screen name='todolist' component={TabNav} options={{ headerShown: false }} />
                            <Stack.Screen name='detail' component={Detailtodo} options={{ headerShown: true }} />
                        </Stack.Navigator >
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
                            < Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                            < Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
                        </Stack.Navigator >
                    )

            }

        </>
    )

}

export default Router