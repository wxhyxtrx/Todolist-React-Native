import React from 'react'
import { Box, HStack, Alert, Text, VStack, IconButton, Icon } from 'native-base'
// import { FontAwesome } from '@expo/vector-icons'
// import { API } from '../config/api'
// import { useQuery } from 'react-query'

const Categorylist = ({ data }) => {
    // const handleDelete = async (id) => {
    //     await API.delete("/Categories/" + id)
    // }
    return (
        <Box>
            {
                data?.map((item, i) => {
                    return (
                        <Alert key={i} w="100%" mb={2} variant="subtle" colorScheme="success" status="info">
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                    <HStack space={2} flexShrink={1} alignItems="center">
                                        <Alert.Icon />
                                        <Text fontSize="xl" color="info.600">
                                            {item?.name}
                                        </Text>
                                    </HStack>
                                    {/* <IconButton onPress={() => handleDelete(item._id)} variant="unstyled" _focus={{
                                        borderWidth: 0
                                    }} icon={<Icon as={FontAwesome} name="close" size="md" />} _icon={{
                                        color: "coolGray.600"
                                    }} /> */}
                                </HStack>
                            </VStack>
                        </Alert>
                    )
                })
            }

        </Box>
    )
}

export default Categorylist