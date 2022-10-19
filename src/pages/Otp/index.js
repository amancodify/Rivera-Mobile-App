import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, TextInput, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import RiveraRadialBtn from "../../components/common/riveraRadialBtn";
import { executePostMethod } from "../../network/api";
import { setItem } from "../../utils/helper";
import { AuthContext } from "../../authContext";

const OtpPage = ({ route, navigation }) => {
    const [otp, setOtp] = useState(null);
    const [timer, setTimer] = useState(59);
    const [isLoading, setIsLoading] = useState(false);
    const [isResendLoading, setIsResendLoading] = useState(false);

    let { mobile, newUser } = route.params;
    let { handleLogin, deviceId, deviceType, toast, pushNotificationToken } = useContext(AuthContext);
    
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
        let dataToSend = {
            device_id: deviceId,
            phone_number: `+91${mobile}`,
        };

        let result = await executePostMethod("/common/login_request", dataToSend);
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
        setIsLoading(true);
        if (newUser) {
            await setItem("firstTimeUser", "YES");
        }
        if (otp) {
            let dataToSend = {
                phone_number: `+91${mobile}`,
                otp: otp,
                device_id: deviceId,
                device_type: deviceType,
                push_notification_token: pushNotificationToken
            };
            let result = await executePostMethod("/common/login", dataToSend);
            if (result.success) {
                if (result.data.authorization) {
                    //set login
                    await handleLogin(result.data.authorization);
                    setIsLoading(false);
                } else {
                    navigation.navigate("Referral", {
                        mobile: mobile,
                        deviceId: deviceId,
                        deviceType: deviceType,
                        otp: otp,
                    });
                    setIsLoading(false);
                }
            } else {
                toast.show(result.message, {
                    type: "danger",
                });
            }
            setIsLoading(false);
        } else {
            toast.show("Otp required!", {
                type: "danger",
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.otpContainer}>
                    <Ionicons
                        style={{ width: 50 }}
                        onPress={() => navigation.navigate("Login")}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.title}>Enter the OTP received via SMS</Text>
                    <View style={styles.otpDetailsContainer}>
                        <Text style={styles.subtitle}>OTP sent to +91-{mobile}</Text>
                        <Text onPress={() => navigation.navigate("Login")} style={styles.subtitle2}>
                            edit
                        </Text>
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
                            <TouchableOpacity onPress={() => reSendOtp()}>
                                <Text
                                    style={{ ...styles.otpSubTitle2, color: "white", textDecorationLine: "underline" }}
                                >
                                    {isResendLoading ? (
                                        <>
                                            <Image
                                                style={{ width: 30, height: 30 }}
                                                source={require("../../assets/loading.gif")}
                                            />
                                        </>
                                    ) : (
                                        <>Resend OTP</>
                                    )}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {isLoading ? (
                        <>
                            <View style={styles.ctaContainer}>
                                <Image style={{ width: 60, height: 60 }} source={require("../../assets/loading.gif")} />
                            </View>
                        </>
                    ) : (
                        <View style={styles.ctaContainer}>
                            <RiveraRadialBtn progressPercentage={75} onPressHandler={handleClick} />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

export default OtpPage;
