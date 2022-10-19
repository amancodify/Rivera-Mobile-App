import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import EngineVector from "../../assets/enginefired.svg";
import style from "./style";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";

const PaymentSuccess = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <View style={{ height: "65%", display: "flex", justifyContent: "center" }}>
                            <View style={styles.vectorContainer}>
                                <EngineVector />
                            </View>
                            <Text
                                style={{
                                    ...style.title,
                                    paddingRight: 0,
                                    textAlign: "center",
                                    marginTop: 40,
                                    fontSize: 20,
                                }}
                            >
                                All engines fired up!
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    marginTop: 20,
                                    paddingLeft: 40,
                                    paddingRight: 40,
                                }}
                            >
                                Please wait while we confirm your payment, it may take upto 24 hours to reflect funds in
                                your account.
                            </Text>
                            <View style={styles.ctaContainer}>
                                <RiveraGradientBtn
                                    onPressHandler={() => navigation.navigate("Home", { reload: "SUCCESS" })}
                                    btnText="Return to home screen"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default PaymentSuccess;
