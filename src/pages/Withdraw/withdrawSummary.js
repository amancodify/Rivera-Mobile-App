import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../authContext";
import styles from "./style";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import BankDataPreview from "../../components/common/bankDataPreview";
import { executeGetMethod, executePostMethod } from "../../network/api";
import { getFormattedCurrency } from "../../utils/helper";

const WithdrawSummary = ({ navigation, route }) => {
    let { amount, reason, usdtRate, tickerData } = route.params;
    let { deviceId, userToken, toast } = useContext(AuthContext);
    const [banksData, setBanksData] = useState({
        benificary_name: "",
        id: "",
        benificary_acc_number: "",
        ISFC_code: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const getBankDetails = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod("/kyc/get_bank_accounts", headers);
        if (result.success) {
            if (result.data.length > 0) {
                setBanksData(result.data[0]);
            }
        } else {
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    useEffect(() => {
        getBankDetails();
    }, []);

    const handleCtaClick = async () => {
        setIsLoading(true);
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let dataToSend = {
            strategy: "a",
            ticker_id: tickerData.id,
            exchange_rate: tickerData.bid_price_b,
            usdt_amount: parseFloat(amount),
            inr_amount: amount * usdtRate,
            bank_account_id: banksData.id,
        };

        let result = await executePostMethod("/investments/withdraw", dataToSend, { headers: headers });

        if (result.success) {
            setIsLoading(false);
            navigation.navigate("WithdrawOtp", { trx_id: result.data.trx_id });
        } else {
            toast.show(result.message, {
                type: "danger",
            });
            setIsLoading(false);
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
                        <Text style={styles.title}>Withdrawal summary</Text>
                        <View style={styles.WithdrawSummaryAmoutCont}>
                            <Text style={{ ...styles.subTitle }}>Withdraw Amount</Text>
                            <Text
                                style={{
                                    ...styles.title20,
                                    fontSize: 34,
                                    fontWeight: "700",
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            >
                                {getFormattedCurrency(parseFloat(amount), 2)}
                            </Text>
                            <Text style={{ ...styles.title20, fontSize: 16 }}>
                                ≈ {getFormattedCurrency(parseFloat(amount) * parseFloat(usdtRate), 2, "INR")}
                            </Text>
                        </View>
                        <BankDataPreview
                            benificary_name={banksData.benificary_name}
                            bank_account_id={banksData.benificary_account_id}
                            benificary_acc_number={banksData.benificary_acc_number}
                            ISFC_code={banksData.ISFC_code}
                            topMargin={50}
                            showEditOption={false}
                        />

                        <View style={{ bottom: "-18%" }}>
                            {isLoading ? (
                                <>
                                    <View style={{...styles.ctaContainer, alignItems: 'center'}}>
                                        <Image
                                            style={{ width: 60, height: 60 }}
                                            source={require("../../assets/loading.gif")}
                                        />
                                    </View>
                                </>
                            ) : (
                                <RiveraGradientBtn
                                    outerCSS={styles.btnPosition}
                                    onPressHandler={() => handleCtaClick()}
                                    btnText="Continue"
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default WithdrawSummary;
