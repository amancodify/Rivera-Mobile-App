import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, View, TextInput, Image } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import RiveraRadialBtn from "../../components/common/riveraRadialBtn";
import styles from "./style";
import { AuthContext } from "../../authContext";
import { executePostMethod } from "../../network/api";

const ReferralPage = ({ route, navigation }) => {
    const [email, setEmail] = useState(null);
    const [referralCode, setReferralCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let { mobile, otp } = route.params;
    let { handleLogin, deviceId, deviceType, toast } = useContext(AuthContext);

    const handleClick = async () => {
        setIsLoading(true);
        let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isEmailValid = emailRegEx.test(email);
        if (!isEmailValid) {
            toast.show("Email invalid/ required!", {
                type: "danger",
            });
        }

        if (!referralCode) {
            toast.show("Referral code required!", {
                type: "danger",
            });
        }

        if (email && referralCode) {
            //Call API to get the Token
            let dataToSend = {
                phone_number: `+91${mobile}`,
                otp: otp,
                device_id: deviceId,
                device_type: deviceType,
                email_id: email,
                invite_id: referralCode,
            };
            let result = await executePostMethod("/common/setup_customer", dataToSend);
            if (result.data.authorization) {
                //set login
                await handleLogin(result.data.authorization);
                setIsLoading(false);
            } else {
                if (result.error_code && result.message) {
                    toast.show(result.message, {
                        type: "danger",
                    });
                }
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <SafeAreaView>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                    <View style={styles.referralContainer}>
                        <Ionicons
                            style={{ width: 50 }}
                            onPress={() => navigation.navigate("Otp", { mobile })}
                            name="arrow-back"
                            size={30}
                            color="white"
                        />
                        <Text style={styles.title}>Enter email and referral code</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email*</Text>
                            <TextInput
                                placeholderTextColor={"#797682"}
                                placeholder="abc@xyz.com"
                                style={styles.inputTypeStyle}
                                keyboardType="default"
                                autoFocus={true}
                                onChangeText={(val) => {
                                    setEmail(val);
                                }}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Referral Code*</Text>
                            <TextInput
                                placeholderTextColor={"#797682"}
                                placeholder="Entre Code"
                                autoCapitalize="none"
                                style={styles.inputTypeStyle}
                                onChangeText={(val) => {
                                    setReferralCode(val);
                                }}
                                maxLength={15}
                            />
                        </View>
                        {isLoading ? (
                            <>
                                <View style={styles.ctaContainer}>
                                    <Image
                                        style={{ width: 60, height: 60 }}
                                        source={require("../../assets/loading.gif")}
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={styles.ctaContainer}>
                                <RiveraRadialBtn progressPercentage={100} onPressHandler={handleClick} />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default ReferralPage;
