import React from 'react'
import { Badge, Box, Button, FlatList, Heading, HStack, Stack, Text, VStack } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import moment from 'moment'

const Detailtodo = ({ navigation, route }) => {
    let { id } = route.params

    let { data: todo } = useQuery(
        "detail",
        async () => {
            let listResponse = await API.get(`/Todolist/${id}`);
            return listResponse.data;
        }
    );

    return (
        <Box maxH={"82%"}>
            <Stack m={"3"} w={"93%"} rounded="sm" bgColor={"darkBlue.50"} pb={5}>
                <HStack justifyContent={"space-between"} p="3" pb={0}>
                    <Box justifyContent={"center"} w={"70%"}>
                        {
                            todo?.status > 0 ? (
                                <Text strikeThrough fontSize={"4xl"} fontWeight="bold">{todo?.name}</Text>
                            ) : (
                                <Text fontSize={"4xl"} fontWeight="bold">{todo?.name}</Text>
                            )
                        }
                        <Text>{moment(todo?.date).format("dddd, DD MMMM YYYY")}</Text>
                    </Box>
                    <VStack mt={"3"} space="3">
                        <Badge variant={"subtle"} bgColor="red.300" rounded={"md"}>
                            <Text fontSize={"xl"}>
                                {todo?.category}
                            </Text>
                        </Badge>
                        <Button variant={"unstyled"}>
                            {
                                todo?.status > 0 ? (
                                    <FontAwesome name='check-circle' size={46} color={"#22c55e"} />
                                ) : (
                                    <FontAwesome name='circle-o' size={46} color={"#0369a1"} />
                                )
                            }
                        </Button>
                    </VStack>
                </HStack>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Text fontSize={"xl"} m="3" color={"gray.600"}>
                        {todo?.description}
                    </Text>}
                    renderItem={() => {
                        todo?.description
                    }}

                />
                {/* <Text fontSize={"xl"} m="3" color={"gray.600"}>
                    {todo?.description}
                </Text> */}
            </Stack>
        </Box >
    )
}

export default Detailtodo