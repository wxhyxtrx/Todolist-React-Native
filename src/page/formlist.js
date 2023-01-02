import React from 'react'
import { Box, FormControl, Input, Text, Select, Pressable, TextArea, Button } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/header';
import { API } from '../config/api';
import { useMutation, useQuery } from 'react-query';
import { showMessage } from 'react-native-flash-message';
import { Alert } from 'react-native';

const Formlist = () => {

    const [select, setSelect] = React.useState({
        value: ""
    });
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('Date')
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('Choose Date')
    const [data, setData] = React.useState({
        name: "",
        description: "",
        status: 0,
    });

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false)
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear()
        setText(fDate)
    }

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const changeSelect = (name, value) => {
        setSelect({
            ...select,
            [name]: value,
        });
    };

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            if (data.name.trim() == "") {
                return showMessage({
                    message: "Nama tidak boleh kosong",
                    type: "danger",
                })
            }
            if (data.description.trim() == "") {
                return showMessage({
                    message: "Nama tidak boleh kosong",
                    type: "danger",
                })
            }
            const listData = {
                name: data.name,
                description: data.description,
                date: date,
                category: select.value,
                status: data.status
            }
            // return Alert.alert("Data Todolist", `${listData.name} , ${listData.category} , ${listData.description} , ${listData.date}, ${listData.status}`)

            const result = await API.post("/Todolist", listData)
            listRefetch()
            setData({
                name: "",
                description: "",
                status: 0
            })
            setText("Chosee Date")
            setSelect({ value: "" })
            return Alert.alert("Success", `Berhasil membuat Todolist ${result.data.name}`)
        } catch (error) {
            return Alert.alert("Info", "Gagal membuat list")
        }
    })
    let { data: listCategory } = useQuery(
        "categoryCache", async () => {
            let response = await API.get("/Categories")
            return response.data
        }
    )

    let { data: listData, refetch: listRefetch } = useQuery(
        "listCaches",
        async () => {
            let listResponse = await API.get("/Todolist");
            return listResponse.data;
        }
    );
    return (
        <Box justifyContent={"center"}>
            <Header listCount={listData} />
            <Text m={5} mt={10} fontWeight={"extrabold"} fontSize={"4xl"}>
                Add List
            </Text>
            <FormControl mb={2} w={"95%"} mx="2.5">
                <Input placeholder='Name List' color="darkBlue.300" fontSize={"xl"}
                    onChangeText={(value) => handleChange("name", value)}
                    value={data?.name}
                />
            </FormControl>
            <Select mb={2} w={"100%"} mx="2.5" color="darkBlue.300" fontSize="xl" minWidth="100" width="full"
                accessibilityLabel="Choose Service"
                placeholder="Click Here"
                _selectedItem={{
                    bg: "teal.600"
                }} mt={1}
                onValueChange={(value) => changeSelect("value", value)}>

                {
                    listCategory?.map((item, i) => (
                        <Select.Item key={i} label={item?.name} value={item?.name} />
                    ))
                }
            </Select>
            <Pressable
                mb={3} w={"95%"} mx="2.5"
                title="DatePicker"
                onPress={() => showMode('date')}
                justifyContent="center"
                borderColor="muted.300"
                borderWidth={1} px={2}
                borderRadius={5}
                height="46"
                mt={1}
            >
                <Text style={{ textAlign: "left" }}
                    color="darkBlue.300" fontSize="xl">{text}{" "}</Text>
            </Pressable>
            <TextArea mb={2} w={"95%"} mx="2.5" color="darkBlue.300" placeholder='Description' fontSize={"xl"}
                onChangeText={(value) => handleChange("description", value)}
                value={data?.description}
            ></TextArea>
            <Button colorScheme="darkBlue" w={"95%"} mx="2.5" h="12" mt="3" justifyContent={"center"} onPress={(e) => handleSubmit.mutate(e)}>
                <Text fontSize={"xl"} color="white">Add List</Text>
            </Button>
            {
                show && (<DateTimePicker
                    testID='datetimepicker'
                    value={date}
                    mode={mode}
                    is24Hours={true}
                    display='default'
                    onChange={onChangeDate}
                />)
            }
        </Box>
    )
}

export default Formlist