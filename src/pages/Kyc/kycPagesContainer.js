import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, BackHandler } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: "#201A2E",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    homeContainer: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: "#201A2E",
        flex: 1,
        height: Dimensions.get("screen").height,
        fontFamily: "RHD_400",
    },
    accTranContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    transBtnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    tranText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
    },
});

const KycPagesContainer = ({ navigation, children, formType }) => {
    useEffect(() => {
        const backAction = () => {
            navigation.navigate("Home", { reload: `KYCPAGE_${formType}` });
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <View style={styles.accTranContainer}>
                        <Ionicons
                            style={{ width: 50 }}
                            onPress={() => navigation.navigate("Home", { reload: 'Kyc container Page ' })}
                            name="arrow-back"
                            size={30}
                            color="white"
                        />
                        <TouchableOpacity
                            style={styles.transBtnContainer}
                            onPress={() => navigation.navigate("AccountFaq")}
                        >
                            <Feather name="help-circle" size={24} color="white" />
                            <Text style={styles.tranText}>Help</Text>
                        </TouchableOpacity>
                    </View>
                    <View>{children}</View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default KycPagesContainer;
