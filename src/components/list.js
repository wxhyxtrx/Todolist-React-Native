
import { Box, HStack, Text, Badge, VStack, Button, View } from 'native-base'
import React from 'react'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import moment from 'moment'
import { FontAwesome } from "@expo/vector-icons"
import { Pressable } from 'react-native';

const List = ({ root, search }) => {
    const itsDone = async (id, count) => {
        try {
            let done = 0
            count === 0 ? done = 1 : done = 0
            await API.patch(`/Todolist/${id}`, { status: done })
            refTodo()
        } catch (err) {
            alert("gagal update")
        }
        console.log("status update");
    }

    const description = (string) => {
        let text = string
        let desc = string.length
        desc > 120 ? text = text.substring(0, 100) + "..." : text
        return text
    }

    let { data: todolist, refetch: refTodo } = useQuery(
        "listCaches",
        async () => {
            let listResponse = await API.get("/Todolist");
            return listResponse.data;
        }
    );
    return (
        <Box>
            {
                todolist?.map((item, i) => {
                    if (!!search === true) {
                        if (item.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <Pressable key={i} onPress={() => root.navigation.navigate("detail", { id: item?._id, })}>
                                    <HStack p={3} mt="3" bgColor="lightBlue.100" borderRadius={7} >
                                        <VStack w={"64"}>
                                            {
                                                item?.status == 0 ? (
                                                    <Box>
                                                        <Text fontSize="2xl" fontWeight="extrabold" >{item?.name}</Text>
                                                        <Text color="muted.400" fontSize={"md"}>
                                                            {description(item?.description)}
                                                        </Text>
                                                    </Box>
                                                ) : (
                                                    <Box>
                                                        <Text strikeThrough fontSize="2xl" fontWeight="extrabold" >{item?.name}</Text>
                                                        <Text strikeThrough color="muted.400" fontSize={"md"}>
                                                            {description(item?.description)}
                                                        </Text>
                                                    </Box>
                                                )
                                            }
                                            <HStack alignItems={"center"} space="3" mt={2}>
                                                <FontAwesome name='calendar' size={16} />
                                                <Text>
                                                    {
                                                        moment(item?.date).format("dddd, DD MMMM YYYY")
                                                    }
                                                </Text>
                                            </HStack>
                                        </VStack>
                                        <VStack alignItems="center" space={"15px"} w={"24"}>
                                            <Badge colorScheme="success" alignSelf="center" variant="subtle" borderRadius={5}>
                                                <Text>{item?.category}</Text>
                                            </Badge>
                                            <Button variant={"unstyled"} onPress={() => itsDone(item?._id, item?.status)}>
                                                {
                                                    item?.status == 0 ? (
                                                        <FontAwesome name="circle-o" size={36} color="#0369a1" />
                                                    ) : (
                                                        <FontAwesome name="check-circle" size={36} color="#22c55e" />
                                                    )
                                                }
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </Pressable>
                            )
                        }
                    } else {
                        return (
                            <Pressable key={i} onPress={() => root.navigation.navigate("detail", { id: item?._id, })}>
                                <HStack p={3} mt="3" bgColor="lightBlue.100" borderRadius={7} >
                                    <VStack w={"64"}>
                                        {
                                            item?.status == 0 ? (
                                                <Box>
                                                    <Text fontSize="2xl" fontWeight="extrabold" >{item?.name}</Text>
                                                    <Text color="muted.400" fontSize={"md"}>
                                                        {description(item?.description)}
                                                    </Text>
                                                </Box>
                                            ) : (
                                                <Box>
                                                    <Text strikeThrough fontSize="2xl" fontWeight="extrabold" >{item?.name}</Text>
                                                    <Text strikeThrough color="muted.400" fontSize={"md"}>
                                                        {description(item?.description)}
                                                    </Text>
                                                </Box>
                                            )
                                        }
                                        <HStack alignItems={"center"} space="3" mt={2}>
                                            <FontAwesome name='calendar' size={16} />
                                            <Text>
                                                {
                                                    moment(item?.date).format("dddd, DD MMMM YYYY")
                                                }
                                            </Text>
                                        </HStack>
                                    </VStack>
                                    <VStack alignItems="center" space={"15px"} w={"24"}>
                                        <Badge colorScheme="success" alignSelf="center" variant="subtle" borderRadius={5}>
                                            <Text>{item?.category}</Text>
                                        </Badge>
                                        <Button variant={"unstyled"} onPress={() => itsDone(item?._id, item?.status)}>
                                            {
                                                item?.status == 0 ? (
                                                    <FontAwesome name="circle-o" size={36} color="#0369a1" />
                                                ) : (
                                                    <FontAwesome name="check-circle" size={36} color="#22c55e" />
                                                )
                                            }
                                        </Button>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        )
                    }
                })
            }
        </Box >
    )
}

export default List