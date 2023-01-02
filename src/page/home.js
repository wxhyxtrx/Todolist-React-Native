import { StatusBar } from "expo-status-bar";
import { Box, Button, HStack, Image, Text, VStack } from "native-base";

const Home = ({ navigation }) => {
    return (
        <Box bg="white" height="full" safeArea >
            <StatusBar />
            <Box alignItems="center" marginTop="20">
                <Image source={require("../../assets/banner.png")} alt="Alternate Text" size="xl" />
            </Box>
            <Box alignItems="center">
                <HStack marginTop={5}>
                    <Text fontSize="4xl" fontWeight="semibold" color="muted.600">
                        Ways
                        <Text fontWeight="extrabold" color="lightBlue.400"> To
                            <Text color="lightBlue.900">DO</Text>
                        </Text>
                    </Text>
                </HStack>
                <Text w="56" textAlign="center" fontSize="lg" color="muted.400">
                    Write your activity and finish your activity.
                    Fast, Simple and Easy to Use
                </Text>
            </Box>
            <Box>
                <VStack space={2} alignItems="center" marginTop="20">
                    <Button backgroundColor="lightBlue.800" w="80" size="lg" onPress={() => navigation.navigate("login")}>
                        <Text fontSize="lg" color="white">Login</Text>
                    </Button>
                    <Button backgroundColor="lightBlue.500" w="80" size="lg" onPress={() => navigation.navigate("register")}>
                        <Text fontSize="lg" color="white">Register</Text>
                    </Button>
                </VStack>
            </Box>
        </Box >
    )
}
export default Home