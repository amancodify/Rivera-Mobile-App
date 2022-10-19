import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, Alert, BackHandler } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { executeGetMethod, executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import styles from "./style";
import { getFormattedCurrency, getPartialViewAccountNumber } from "../../utils/helper";
import RiveraSwipeButton from "../../components/common/swipeBtn";
import GPayIcon from "../../assets/gpay.svg";
import PhonePayIcon from "../../assets/phonepay.svg";
import PaytmIcon from "../../assets/paytm.svg";
import BankIcon from "../../assets/bank.svg";

const PaymentConfirmation = ({ navigation, route }) => {
    let { trx_id, inr_amount, benificary_acc_number } = route.params;
    let { deviceId, userToken, toast } = useContext(AuthContext);

    const ctaClickHandler = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let dataToSend = {
            trx_id,
        };

        let result = await executePostMethod("/investments/confirm", dataToSend, { headers: headers });
        if (result.success) {
            navigation.navigate("PaymentSuccess");
        } else {
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    const abortTransaction = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod(`/investments/abort?trx_id=${trx_id}`, headers);
        if (result.success) {
            navigation.navigate("Home", { reload: 'Payment confirmation Page' });
        } else {
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    const onBackClickHandler = () => {
        Alert.alert("Are You Sure you want to Abort your transaction!", "All data will be reset once aborted!", [
            {
                text: "Yes",
                onPress: async () => await abortTransaction(),
                style: "Yes",
            },
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
        ]);
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => onBackClickHandler());
        return () => backHandler.remove();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => onBackClickHandler()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>

                        <View style={styles.PaymentCardContainer}>
                            <Text style={{ color: "white" }}>
                                Use only {getPartialViewAccountNumber(benificary_acc_number)} bank account linked to
                                complete this transaction. failure to so will result in a loss of funds.
                            </Text>
                        </View>

                        <Text style={{ marginTop: 50, marginBottom: 30, color: "white", width: "75%" }}>
                            Pay exactly {getFormattedCurrency(inr_amount, 0, "INR")} to following bank account.
                        </Text>

                        <View style={styles.riveraBankDetailsContainer}>
                            <View style={{ ...styles.rowSpaceBtn, marginTop: 0 }}>
                                <Text style={styles.subTitle}>Name</Text>
                                <Text style={{ color: "white" }}>Rivera Finacials Pvt. Ltd.</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>Account No</Text>
                                <Text style={{ color: "white" }}>1234456567890</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>IFSC Code</Text>
                                <Text style={{ color: "white" }}>KKBK000012</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 60 }}>
                            <RiveraSwipeButton onSuccessHandler={ctaClickHandler} />
                        </View>

                        <View style={{ marginTop: 60 }}>
                            <Text style={{ color: "white", fontWeight: "600", marginBottom: 10 }}>How to pay?</Text>
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity style={styles.iconParent}>
                                    <View>
                                        <GPayIcon />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconParent}>
                                    <View>
                                        <PhonePayIcon />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconParent}>
                                    <View style={{ backgroundColor: "white", borderRadius: 50 }}>
                                        <PaytmIcon />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconParent}>
                                    <View>
                                        <BankIcon />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default PaymentConfirmation;
