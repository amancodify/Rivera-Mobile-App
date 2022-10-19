import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TextInput, Image } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { executePostMethod } from "../../network/api";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import { AuthContext } from "../../authContext";
import { getItem } from "../../utils/helper";

const BankDetailsInput = ({ route, navigation }) => {
    let { deviceId, userToken, toast } = useContext(AuthContext);
    const [accountNumber, setAccountNumber] = useState("");
    const [holderName, setHolderName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let { action, banksData } = route.params || { action: "", banksData: null };

    useEffect(() => {
        if (action === "UPDATE" && banksData) {
            setAccountNumber(banksData.benificary_acc_number);
            setHolderName(banksData.benificary_name);
            setIfscCode(banksData.ISFC_code);
        }
    }, [action, banksData]);

    const handleClick = async () => {
        setIsLoading(true);
        let isValidAccountNumber = accountNumber.length > 9 ? true : false;
        if (isValidAccountNumber && holderName && ifscCode) {
            let dataToSend = {
                benificary_name: holderName,
                benificary_acc_no: accountNumber,
                ISFC_code: ifscCode,
            };
            const headers = {
                Authorization: await getItem("userToken"),
                "device-id": deviceId,
            };
            let result = await executePostMethod("/kyc/verify_bank_account", dataToSend, { headers: headers });
            if (result.success) {
                setIsLoading(false);
                navigation.navigate("BankDetailsPreview", { newBankAdded: true, action });
            } else {
                setIsLoading(false);
                toast.show(result.message, {
                    type: "danger",
                });
            }
        } else {
            setIsLoading(false);
            toast.show("Fill your complete and valid bank details!", {
                type: "danger",
            });
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.loginContainer}>
                    <Ionicons
                        style={{ width: 50 }}
                        onPress={() => navigation.navigate("Home", { reload: 'Bank Details Page' })}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.title}>
                        {action === "UPDATE" ? "Update" : "Enter"} your bank account details
                    </Text>
                    <Text style={styles.subtitle}>
                        Please enter the bank account details you will be using to invest
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={"#797682"}
                            placeholder="Account number"
                            style={styles.inputTypeStyle}
                            autoFocus={true}
                            defaultValue={`${accountNumber}`}
                            onChangeText={(val) => {
                                setAccountNumber(val);
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={"#797682"}
                            placeholder="Holder Name"
                            defaultValue={holderName}
                            style={styles.inputTypeStyle}
                            onChangeText={(val) => {
                                setHolderName(val);
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoCapitalize="characters"
                            placeholderTextColor={"#797682"}
                            placeholder="IFSC Code"
                            defaultValue={ifscCode}
                            style={styles.inputTypeStyle}
                            onChangeText={(val) => {
                                setIfscCode(val);
                            }}
                        />
                    </View>
                    {isLoading ? (
                        <>
                            <View style={styles.ctaContainer}>
                                <Image style={{ width: 60, height: 60 }} source={require("../../assets/loading.gif")} />
                            </View>
                        </>
                    ) : (
                        <View style={styles.ctaContainer}>
                            <RiveraGradientBtn
                                outerCSS={styles.stepGradBtn}
                                onPressHandler={() => handleClick()}
                                btnText={action === "UPDATE" ? "Update" : "Submit"}
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

export default BankDetailsInput;
