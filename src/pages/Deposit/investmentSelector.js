import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { executeGetMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import styles from "./style";
import { getFormattedCurrency } from "../../utils/helper";
import CustomSlider from "../../components/common/customSlider";
import SliderKnob from "../../assets/knob.svg";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";

const InvestmetSelector = ({ navigation, route }) => {
    let { selectedAmount, title, strategyId } = route.params;
    let { deviceId, userToken } = useContext(AuthContext);
    const [amount, setAmount] = useState(selectedAmount);
    const [tickerData, setTickerData] = useState();
    const [usdtRate, setUsdtRate] = useState(1);
    const [banksData, setBanksData] = useState({
        benificary_name: "",
        bank_account_id: "",
        benificary_acc_number: "",
        ISFC_code: "",
    });

    const ctaClickHandler = () => {
        let dataToSend = {
            strategy: strategyId,
            ticker_id: tickerData.id,
            exchange_rate: tickerData.ask_price_b,
            usdt_amount: (amount / usdtRate).toFixed(2),
            inr_amount: amount,
            bank_account_id: banksData.id,
            benificary_name: banksData.benificary_name,
            ISFC_code: banksData.ISFC_code,
        };
        navigation.navigate("InvestmetPreview", {
            ...dataToSend,
            benificary_acc_number: banksData.benificary_acc_number,
            title,
        });
    };

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
            alert(result.message);
        }
    };

    const getUSDTRate = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod("/common/tickers?symbol=USDT/INR", headers);
        if (result.success) {
            setTickerData(result.data);
            setUsdtRate(result.data.ask_price_b);
        }
    };

    useEffect(() => {
        if (userToken) {
            if (!tickerData) {
                getUSDTRate();
            }
            getBankDetails();
        }
    }, [userToken]);

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView style={styles.homeContainer}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>

                        <Text
                            style={{
                                ...styles.title,
                                color: "#55ADFF",
                                marginTop: 10,
                                textAlign: "center",
                                marginBottom: 20,
                                textTransform: "capitalize",
                            }}
                        >
                            {title}
                        </Text>

                        <View style={styles.amountDispContainer}>
                            <ImageBackground
                                source={require("../../assets/amount-disp.png")}
                                imageStyle={{ borderRadius: 13 }}
                                style={styles.amtDisplay}
                            >
                                <Text style={styles.amountTxt}>{getFormattedCurrency(amount, 0, "INR")}</Text>
                                <Text style={styles.usdtTxt}>={(amount / usdtRate)?.toFixed(2)} USDT</Text>
                            </ImageBackground>
                            <View style={styles.sliderContainer}>
                                <Text style={{ color: "white", marginTop: 40 }}>Slide to select an amount</Text>
                                <CustomSlider
                                    onChange={(val) => setAmount(val)}
                                    ThumbIcon={<SliderKnob height={40} width={40} />}
                                    defaultAmount={amount}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>USDT exchange rate</Text>
                                <Text style={{ color: "white" }}>₹{usdtRate}</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>USDT to be invested</Text>
                                <Text style={{ color: "white" }}>{(amount / usdtRate)?.toFixed(2)} UST</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={styles.subTitle}>Fees</Text>
                                <Text style={{ color: "white" }}>₹0</Text>
                            </View>
                        </View>

                        <View>
                            <RiveraGradientBtn
                                outerCSS={styles.btnPosition}
                                onPressHandler={() => ctaClickHandler()}
                                btnText="Continue"
                            />
                        </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default InvestmetSelector;
