import React, { useState } from "react";
import { SafeAreaView, View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";

const WithdrawReason = ({ route, navigation }) => {
    const [reason, setReason] = useState();
    let { amount, usdtRate, tickerData } = route.params;
    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <Ionicons
                        style={{ width: 50 }}
                        onPress={() => navigation.goBack()}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.title}>Please write the reason for your withdrawal</Text>
                    <Text style={{ ...styles.subTitle2, marginTop: 20 }}>
                        This will not impact the withdrawl limit and experience.
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={"#797682"}
                            placeholder="Write here"
                            style={styles.inputTypeStyle}
                            autoFocus={true}
                            multiline={true}
                            onChangeText={(val) => setReason(val)}
                        />
                    </View>

                    <View style={{ bottom: "-5%" }}>
                        <RiveraGradientBtn
                            outerCSS={styles.btnPosition}
                            onPressHandler={() => {
                                navigation.navigate("WithdrawSummary", { reason, amount, usdtRate, tickerData });
                            }}
                            btnText="Continue"
                            disabled={!reason ? true : false}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default WithdrawReason;
