import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { executeGetMethod, executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";

const WithdrawOtp = ({ route, navigation }) => {
    let { trx_id } = route.params;
    const [otp, setOtp] = useState(null);
    const [timer, setTimer] = useState(59);
    const [isLoading, setIsLoading] = useState(false);
    const [isResendLoading, setIsResendLoading] = useState(false);

    let { deviceId, userToken, userData, toast } = useContext(AuthContext);

    let counter;
    useEffect(() => {
        counter = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(counter);
    });

    if (timer === 0) {
        clearInterval(counter);
    }

    const reSendOtp = async () => {
        setIsResendLoading(true);
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod("/common/resend_otp", headers);
        if (result.success) {
            setIsResendLoading(false);
            setTimer(59);
        } else {
            setIsResendLoading(false);
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    const handleClick = async () => {
        if (otp) {
            setIsLoading(true);
            const headers = {
                Authorization: userToken,
                "device-id": deviceId,
            };

            let dataToSend = {
                trx_id,
                otp,
            };

            let result = await executePostMethod("/investments/confirm", dataToSend, { headers: headers });
            if (result.success) {
                setIsLoading(false);
                navigation.navigate("PaymentSuccess");
            } else {
                setIsLoading(false);
                toast.show(result.message, {
                    type: "danger",
                });
            }
        } else {
            toast.show("Otp required!", {
                type: "danger",
            });
        }
    };

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
                    <Text style={{ ...styles.title, width: "70%" }}>Enter the OTP received via SMS</Text>
                    <View style={styles.otpDetailsContainer}>
                        <Text style={styles.subtitle}>OTP sent to {userData?.phone_number}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={"#797682"}
                            placeholder="123456"
                            style={styles.inputTypeStyle}
                            keyboardType="phone-pad"
                            maxLength={6}
                            autoFocus={true}
                            onChangeText={(val) => {
                                setOtp(val);
                            }}
                        />
                    </View>
                    <View style={styles.resendOtpContainer}>
                        <Text style={styles.otpSubTitle}>Didn’t get OTP?</Text>
                        {timer > 0 ? (
                            <Text style={styles.otpSubTitle2}>Resend in {timer} seconds</Text>
                        ) : (
                            <>
                                {isResendLoading ? (
                                    <View style={{marginLeft: 15}}>
                                        <Image
                                            style={{ width: 35, height: 35 }}
                                            source={require("../../assets/loading.gif")}
                                        />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={() => reSendOtp()}>
                                        <Text
                                            style={{
                                                ...styles.otpSubTitle2,
                                                color: "white",
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            Resend OTP
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </View>
                    <View style={{ bottom: "-5%" }}>
                        {isLoading ? (
                            <>
                                <View style={{ ...styles.ctaContainer, alignItems: "center" }}>
                                    <Image
                                        style={{ width: 60, height: 60 }}
                                        source={require("../../assets/loading.gif")}
                                    />
                                </View>
                            </>
                        ) : (
                            <RiveraGradientBtn
                                outerCSS={styles.btnPosition}
                                onPressHandler={() => handleClick()}
                                btnText="Continue"
                                disabled={!otp ? true : false}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default WithdrawOtp;
