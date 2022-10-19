import React from "react";
import { StatusBar, View, Dimensions, Image } from "react-native";
import { Text } from "react-native-paper";

const SplashScreen = () => {
    return (
        <>
            <StatusBar backgroundColor="#201A2E" animated={true} translucent={true} barStyle="light-content" />
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#201A2E",
                    height: Dimensions.get("screen").height,
                }}
            >
                <View style={{ width: 80, height: 80 }}>
                    <Image style={{ width: "100%", height: "100%" }} source={require("../../assets/eth.png")} />
                </View>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "600", marginTop: 30 }}>Rivera Money</Text>
            </View>
        </>
    );
};

export default SplashScreen;
