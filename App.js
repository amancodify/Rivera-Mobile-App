import React, { useEffect, useState } from "react";
import { AppRegistry, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Navigation from "./src/navigation";
import {
    useFonts,
    RedHatDisplay_300Light,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
    RedHatDisplay_800ExtraBold,
    RedHatDisplay_900Black,
} from "@expo-google-fonts/red-hat-display";
import SplashScreen from "./src/components/SplashScreen";
import { ToastProvider } from "react-native-toast-notifications";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#201A2E",
    },
};

export default function App() {
    let [fontsLoaded] = useFonts({
        RHD_300: RedHatDisplay_300Light,
        RHD_400: RedHatDisplay_400Regular,
        RHD_500: RedHatDisplay_500Medium,
        RHD_600: RedHatDisplay_600SemiBold,
        RHD_700: RedHatDisplay_700Bold,
        RHD_800: RedHatDisplay_800ExtraBold,
        RHD_900: RedHatDisplay_900Black,
    });

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (fontsLoaded) {
            setIsLoading(false);
        }
    }, [fontsLoaded]);

    if (isLoading) {
        return (
            <>
                <SplashScreen />
            </>
        );
    }

    return (
        <PaperProvider theme={theme}>
            <ToastProvider offset={50} duration={3000} animationType="slide-in" placement="bottom">
                <NavigationContainer>
                    <StatusBar backgroundColor="#201A2E" animated={true} translucent={true} barStyle="light-content" />
                    <Navigation />
                </NavigationContainer>
            </ToastProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent("Rivera", () => App);
