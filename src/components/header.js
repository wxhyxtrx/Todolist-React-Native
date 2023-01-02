import React from 'react'
import { HStack, VStack, Avatar, Box, Text } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import { UserContext } from '../context/usercontext'
import { useQuery } from 'react-query'
import { API } from '../config/api'

const Header = ({ listCount }) => {
    const [state, dispatch] = React.useContext(UserContext);

    let { data: listData } = useQuery(
        "listCaches",
        async () => {
            let listResponse = await API.get("/Todolist");
            return listResponse.data;
        }
    );

    let count = 0
    listCount ? count = listCount.length : listData?.length > 0 ? count = listData?.length : null
    return (
        <Box w="full" safeArea>
            <StatusBar />
            <HStack alignContent="flex-end" justifyContent={"space-between"} mx={"5"} py="5">
                <VStack >
                    <Text fontSize="2xl" fontWeight="extrabold">Hi,{state?.data?.user?.firstName}</Text>
                    <Text fontSize="lg" color="lightBlue.600"> {count} List{count > 1 ? "s" : null} Todo</Text>
                </VStack>
                <Avatar ml="5" bg="green.500" alignSelf="center" size="md" source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }}></Avatar>
            </HStack>
        </Box>
    )
}

export default Header