import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
// import { LogBox } from "react-native";
import Router from './src/router';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./src/context/usercontext";

// LogBox.ignoreAllLogs();
export default function App() {
  const client = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={client}>
        <NativeBaseProvider>
          <UserContextProvider>
            <Router />
          </UserContextProvider>
        </NativeBaseProvider>
      </QueryClientProvider >
    </NavigationContainer>
  );
}
