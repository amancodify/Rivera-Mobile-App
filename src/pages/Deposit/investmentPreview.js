import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import styles from "./style";
import { getFormattedCurrency } from "../../utils/helper";
import EditIcon from "../../assets/edit.svg";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import BankDataPreview from "../../components/common/bankDataPreview";

const InvestmetPreview = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);

    let {
        strategy,
        ticker_id,
        exchange_rate,
        usdt_amount,
        inr_amount,
        bank_account_id,
        benificary_acc_number,
        benificary_name,
        ISFC_code,
        title,
    } = route.params;
    let { deviceId, userToken, userData, toast } = useContext(AuthContext);

    const depostAmount = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let dataToSend = {
            strategy: "a",
            ticker_id,
            exchange_rate,
            usdt_amount: parseFloat(usdt_amount),
            inr_amount,
            bank_account_id,
        };

        let result = await executePostMethod("/investments/deposit", dataToSend, { headers: headers });
        return result;
    };

    const ctaClickHandler = async () => {
        setIsLoading(true);
        let amountDeposited = await depostAmount();
        if (amountDeposited.success) {
            setIsLoading(false);
            navigation.navigate("PaymentConfirmation", {
                inr_amount,
                trx_id: amountDeposited.data.trx_id,
                benificary_acc_number,
            });
        } else {
            setIsLoading(false);
            toast.show(amountDeposited.message, {
                type: "danger",
            });
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>

                        <Text
                            style={{
                                color: "#55ADFF",
                                marginTop: 10,
                                textAlign: "center",
                                marginBottom: 20,
                                fontSize: 24,
                                fontWeight: "700",
                                textTransform: "capitalize",
                            }}
                        >
                            {title}
                        </Text>

                        <View
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}
                        >
                            <Text style={{ color: "white" }}>Investment Amount</Text>
                            <Text
                                style={{
                                    color: "#55ADFF",
                                    fontWeight: "700",
                                    marginTop: 10,
                                    marginBottom: 20,
                                    fontSize: 34,
                                }}
                            >
                                {getFormattedCurrency(inr_amount, 0, "INR")}
                            </Text>
                        </View>

                        <View style={{ marginTop: 60 }}>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>USDT exchange rate</Text>
                                <Text style={{ color: "white" }}>₹{exchange_rate}</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>USDT to be invested</Text>
                                <Text style={{ color: "white" }}>{(inr_amount / exchange_rate)?.toFixed(2)} USDT</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>Fees</Text>
                                <Text style={{ color: "white" }}>₹0</Text>
                            </View>
                        </View>

                        <BankDataPreview
                            benificary_name={benificary_name}
                            benificary_acc_number={benificary_acc_number}
                            ISFC_code={ISFC_code}
                            topMargin={100}
                            showEditOption={true}
                        />

                        <View style={{ bottom: "-2%" }}>
                            {isLoading ? (
                                <View style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
                                    <Image
                                        style={{ width: 60, height: 60 }}
                                        source={require("../../assets/loading.gif")}
                                    />
                                </View>
                            ) : (
                                <RiveraGradientBtn
                                    outerCSS={styles.btnPosition}
                                    onPressHandler={ctaClickHandler}
                                    btnText="Pay Now"
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default InvestmetPreview;
