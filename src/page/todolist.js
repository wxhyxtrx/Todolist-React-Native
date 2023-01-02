import { StatusBar } from "expo-status-bar";
import { Box, FlatList, FormControl, Input, Select, HStack, Pressable, Text } from "native-base";
import Header from "../components/header";
import React, { useState } from 'react'
import List from "../components/list";
import DateTimePicker from '@react-native-community/datetimepicker'
import { FontAwesome } from "@expo/vector-icons";

const TodoList = (navigation) => {
    const [service, setService] = React.useState("");

    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('Date')
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('Choose Date')

    const [filter, setFilter] = useState({
        search: ""
    })

    const handleChange = (name, value) => {
        setFilter({
            ...filter,
            [name]: value,
        });
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false)
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear()
        setText(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    return (
        <Box alignItems="center">
            <StatusBar />
            <Header />
            <FormControl w="full" color="black" justifyContent={"center"} borderBottomWidth={2} borderBottomColor="blue.300">
                <HStack alignItems="center">
                    <Input
                        w={"90%"}
                        variant="unstyled"
                        placeholder='Search list ...'
                        p={3}
                        pl={4}
                        fontSize="xl"
                        color="black"
                        onChangeText={(value) => handleChange("search", value)}
                    />
                    <FontAwesome name="search" size={20} color="#a3a3a3" />
                </HStack>
            </FormControl>

            <FlatList
                mt={"2"}
                showsVerticalScrollIndicator={false}
                // data={}
                ListHeaderComponent={<List root={navigation} search={filter.search} />}
                style={{ height: 510 }}
                keyExtractor={() => index}
                numColumns={2}
                renderItem={() => {
                    return <List />;
                }}
            />
        </Box>
    )
}
export default TodoList