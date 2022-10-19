import React, { useState, useContext } from "react";
import { SafeAreaView, View, TextInput, Image } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import RiveraRadialBtn from "../../components/common/riveraRadialBtn";
import { executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";

const Login = ({ navigation }) => {
    let { deviceId, deviceType, toast } = useContext(AuthContext);
    const [number, setNumber] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        const regexExp = /^[6-9]\d{9}$/gi;
        let isValid = regexExp.test(`${number}`);
        if (number.length !== 10 || !isValid) {
            setHasError(true);
        } else {
            setIsLoading(true);
            let dataToSend = {
                device_id: deviceId,
                phone_number: `+91${number}`,
            };
            let result = await executePostMethod("/common/login_request", dataToSend);
            if (result.success) {
                navigation.navigate("Otp", {
                    mobile: number,
                    newUser: result.data.new_customer_flag,
                    deviceId: deviceId,
                    deviceType: deviceType,
                });
                setIsLoading(false);
            } else {
                toast.show(result.message, {
                    type: "danger",
                });
                setIsLoading(false);
            }

            if (isLoading) {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.loginContainer}>
                    <Ionicons
                        style={{ width: 50 }}
                        onPress={() => navigation.navigate("Intro")}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.title}>Enter your phone number</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.countryCodeLabel}>+91</Text>
                        <TextInput
                            editable={!isLoading}
                            placeholderTextColor={"#797682"}
                            placeholder="9876543210"
                            style={styles.inputTypeStyle}
                            keyboardType="phone-pad"
                            maxLength={10}
                            autoFocus={true}
                            onChangeText={(val) => {
                                setNumber(val);
                                setHasError(false);
                            }}
                        />
                        {hasError ? (
                            <Text style={styles.errorText}>Please enter 10 digit valid mobile number!</Text>
                        ) : (
                            <></>
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
                            <RiveraRadialBtn progressPercentage={50} onPressHandler={handleClick} />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

export default Login;
