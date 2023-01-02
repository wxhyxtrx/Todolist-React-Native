import { StatusBar } from "expo-status-bar";
import { Box, Button, Image, Text, VStack, FormControl, Input } from "native-base";
import { useState, useContext } from "react";
import { API, setAuthorization } from "../config/api";
import { UserContext } from "../context/usercontext";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "react-query";
const Login = ({ navigation }) => {
    const [state, dispatch] = useContext(UserContext);
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: "",
    });

    function handleChangeText(name, value) {
        setDataLogin({
            ...dataLogin,
            [name]: value,
        });
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            const response = await API.post("/auth/login", dataLogin);

            const payload = response.data;
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload,
                });
                showMessage({
                    message: "Login berhasil!",
                    type: "success",
                });
            }

            navigation.navigate("todolist");
        } catch (err) {
            showMessage({
                message: "Email / password salah!",
                type: "danger",
            });
        }
    });

    return (
        <Box bgColor="white" height="full" safeArea alignItems="center" justifyContent="center" >
            <StatusBar />
            <Box mt="20">
                <Image source={require("../../assets/login.png")} size="2xl" alt="Alternate Text" mb="0" />
            </Box>
            <FormControl isRequired w="80">
                <Text fontSize="3xl" fontWeight="bold" mb="5" color="muted.700">Login</Text>
                <VStack>
                    <FormControl.Label >Email / Username</FormControl.Label>
                    <Input type="text" fontSize="lg" placeholder="Email / Username"
                        keyboardType={"email-address"}
                        onChangeText={(value) => handleChangeText("email", value)}
                    />
                </VStack>
            </FormControl>
            <FormControl isRequired w="80">
                <VStack>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" fontSize="lg" placeholder="password" onChangeText={(value) => handleChangeText("password", value)} />
                </VStack>
                <Text color="lightBlue.600" mt="4" fontSize="md">Forgot Password?</Text>
            </FormControl >
            <FormControl w="80">
                <Button size="lg" mt="10" backgroundColor="lightBlue.800" onPress={(e) => handleSubmit.mutate(e)}>
                    <Text color="white" fontSize="xl" >Login</Text>
                </Button>
            </FormControl>
            <Text mt="5" textAlign="center" fontSize="lg">Don't have account? <Text fontWeight="bold" color="lightBlue.600" onPress={() => navigation.navigate("register")}>Register</Text></Text>
        </Box>
    )
}

export default Login