import { Box, FormControl, HStack, Text, Select, Pressable, Input } from 'native-base'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const Searchbar = () => {
    const [service, setService] = useState("");
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('Date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('Choose Date')

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
        <Box bgColor="gray.100" >
            <FormControl w="full" color="black">
                <Input w="80" variant="underlined" placeholder='Search list ...' p={3} fontSize="xl" size="xl" color="black" borderBottomColor="darkBlue.400" />
            </FormControl>
            <HStack space={3} mt="2" py="3">
                <Pressable
                    title="DatePicker"
                    onPress={() => showMode('date')}
                    alignItems="center"
                    justifyContent="center"
                    borderColor="muted.300"
                    borderWidth={1} px={2}
                    borderRadius={5}
                    height="46"
                    mt={1}
                >
                    <HStack justifyContent="center">
                        <Text color="darkBlue.600" fontSize="md">{text}{" "}</Text>
                    </HStack>
                </Pressable>
                <Select color="darkBlue.600" fontSize="md" minWidth="100" accessibilityLabel="Choose Service" placeholder="Here"
                    _selectedItem={{
                        bg: "teal.600"
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="UX Research" value="ux" />
                    <Select.Item label="Web Development" value="web" />
                    <Select.Item label="Cross Platform Development" value="cross" />
                    <Select.Item label="UI Designing" value="ui" />
                    <Select.Item label="Backend Development" value="backend" />
                </Select>
                <Select color="darkBlue.600" fontSize="md" minWidth="100" accessibilityLabel="Choose Service" placeholder="Here"
                    _selectedItem={{
                        bg: "teal.600"
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                    <Select.Item label="UX Research" value="ux" />
                    <Select.Item label="Web Development" value="web" />
                    <Select.Item label="Cross Platform Development" value="cross" />
                    <Select.Item label="UI Designing" value="ui" />
                    <Select.Item label="Backend Development" value="backend" />
                </Select>
            </HStack>
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

export default Searchbar