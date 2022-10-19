import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, withTheme } from "react-native-paper";
import styles from "./style";
import { LinearGradient } from "expo-linear-gradient";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";

const Intro = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.introContainer}>
                        <Text style={styles.companyNameTitle}>RIVERA</Text>
                        <LinearGradient
                            colors={["#8B78ED", "#262A3D"]}
                            start={[2.2, 0]}
                            end={[0.4, 1]}
                            style={styles.introDisplay}
                        ></LinearGradient>
                        <View style={styles.descriptionCont}>
                            <Text style={styles.description}>
                                Withdraw your funds anytime,instantly. No fees charged.
                            </Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <RiveraGradientBtn
                                btnText="Get Started"
                                onPressHandler={() => {
                                    navigation.navigate("Login");
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default withTheme(Intro);
