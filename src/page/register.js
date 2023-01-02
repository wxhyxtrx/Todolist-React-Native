import { StatusBar } from "expo-status-bar";
import { Box, Button, Image, Text, VStack, FormControl, Input } from "native-base";
import { useState } from "react";
import { API } from "../config/api";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "react-query";
const Register = ({ navigation }) => {
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        password: "",
    })


    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            if (
                form.email.trim() === "" ||
                form.email.trim() === null
            ) {
                return showMessage({
                    message: "Register gagal!",
                    description: "Email tidak boleh kosong!",
                    type: "danger",
                });
            }

            if (
                form.firstName.trim() === "" ||
                form.firstName.trim() === null
            ) {
                return showMessage({
                    message: "Register gagal!",
                    description: "Nama tidak boleh kosong!",
                    type: "danger",
                });
            }

            if (form.password === "" || form.password === null) {
                return showMessage({
                    message: "Register gagal!",
                    description: "Password tidak boleh kosong!",
                    type: "danger",
                });
            }

            // push data register pake trim biar ga disalahgunakan 😎
            const response = await API.post(
                "/auth/register",
                {
                    email: form.email.trim(),
                    firstName: form.firstName.trim(),
                    password: form.password,
                },
                {
                    validateStatus: () => true,
                }
            );

            if (response.status >= 400) {
                return showMessage({
                    message: "Register gagal!",
                    description: `${response.data.message}`,
                    type: "danger",
                });
            }

            // console.log(response);

            showMessage({
                message: "Register berhasil! Silahkan Login 😁",
                type: "success",
            });

            // berhasil register, diarahin ke login
            navigation.navigate("login");
        } catch (err) {
            // pake catch buat jaga2 aja, walaupun kayaknya ga bakal ke sini, udah pake validate status
            showMessage({
                message: "Register gagal!",
                description: `${err}`,
                type: "danger",
            });
        }
    });



    return (
        <Box bgColor="white" safeArea flex={1} justifyContent="center" alignItems="center">
            <StatusBar />
            <Box mt="16">
                <Image source={require("../../assets/register.png")} size="xl" alt="Alternate Text" margin="auto" mb="0" />
            </Box>
            <FormControl isRequired w="80">
                <Text fontSize="3xl" fontWeight="bold" color="muted.700">Register</Text>
                <VStack>
                    <FormControl.Label >Username</FormControl.Label>
                    <Input
                        type="text"
                        fontSize="lg"
                        placeholder="Username"
                        onChangeText={(value) => handleChange("firstName", value)}
                        value={form?.firstName}
                    />
                </VStack>
            </FormControl>
            <FormControl isRequired w="80">
                <VStack>
                    <FormControl.Label >Email</FormControl.Label>
                    <Input
                        type="text"
                        fontSize="lg"
                        placeholder="Email "
                        keyboardType={"email-address"}
                        onChangeText={(value) => handleChange("email", value)}
                        value={form?.email}
                    />
                </VStack>
            </FormControl>
            <FormControl isRequired w="80">
                <VStack>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" fontSize="lg" placeholder="password"
                        onChangeText={(value) => handleChange("password", value)}
                        value={form?.password}
                    />
                </VStack>
            </FormControl>
            <Button mt="10" size="lg" backgroundColor="lightBlue.800" w="80" onPress={(e) => handleSubmit.mutate(e)}>
                <Text color="white" fontSize="xl" >Register</Text>
            </Button>
            <Text mt="5" textAlign="center" fontSize="lg">I have account? <Text fontWeight="bold" color="lightBlue.600" onPress={() => navigation.navigate("login")}>Login</Text></Text>

        </Box>
    )
}

export default Register