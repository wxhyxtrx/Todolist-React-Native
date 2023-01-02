import { StatusBar } from 'expo-status-bar'
import { Badge, Box, Button, FlatList, FormControl, Input, Text } from 'native-base'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useMutation, useQuery } from 'react-query'
import Categorylist from '../components/categorylist'
import Header from '../components/header'
import { API } from '../config/api'

const Category = () => {
    const [form, setForm] = useState({
        name: "",
    })

    let { data: dataCategory, refetch: categoryRefetch } = useQuery(
        "categoryCache", async () => {
            let response = await API.get("/Categories")
            return response.data
        }
    )

    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = useMutation(async () => {
        try {
            if (form.name.trim() == "") {
                return showMessage({
                    message: "Silakan isi nama Category",
                    type: "warning",
                });
            }
            await API.post("/Categories", form)
            showMessage({
                message: "Category berhasil ditambahkan",
                type: 'success',
            })
            setForm({ name: "" })
            categoryRefetch()
        } catch (err) {
            return Alert.alert("Information", "Gagal membuat category")
        }
    })

    return (
        <Box w={"100%"} flex={1}>
            <Header />
            <FormControl mx={5} w={"90%"}>
                <Text fontSize="2xl" fontWeight="extrabold" mx={2} my={3}>Add Category</Text>
                <Input fontSize="xl" mb="4" placeholder='Name' py={3}
                    value={form.name}
                    onChangeText={(value) => handleChange("name", value)}
                />
                <Button size={"lg"} variant="solid" colorScheme="darkBlue" onPress={(e) => handleSubmit.mutate(e)}>
                    <Text fontSize="xl" fontWeight="bold" color="white">Add Category</Text>
                </Button>
            </FormControl>
            <Text m={5} fontSize="xl" fontWeight={"bold"}>List Category</Text>
            <FlatList
                mx={5}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Categorylist data={dataCategory} />}
                style={{ height: 510, width: "90%" }}
                keyExtractor={() => index}
                numColumns={2}
                renderItem={() => {
                    return <Categorylist />
                }}
            />
        </Box>
    )
}

export default Category