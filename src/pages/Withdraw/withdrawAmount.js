import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../authContext";
import styles from "./style";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import RiveraMoadl from "../../components/common/riveraModal";
import BankDataPreview from "../../components/common/bankDataPreview";
import { executeGetMethod } from "../../network/api";
import { getFormattedCurrency } from "../../utils/helper";

const WithdrawAmount = ({ navigation, route }) => {
    let { deviceId, userToken, userData, toast } = useContext(AuthContext);
    let { title, strategyId } = route.params;
    const [amount, setAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState();
    const [showStrategyModal, setShowStrategyModal] = useState(false);
    const [tickerData, setTickerData] = useState({});
    const [usdtRate, setUsdtRate] = useState(1);
    const [banksData, setBanksData] = useState({
        benificary_name: "",
        bank_account_id: "",
        benificary_acc_number: "",
        ISFC_code: "",
    });

    const ctaClickHandler = () => {
        if (amount > maxAmount) {
            toast.show("Amount can't be more than available balance amount!", {
                type: "danger",
            });
        } else if (!amount || amount <= 0) {
            toast.show("Amount can't be 0 or empty!", {
                type: "danger",
            });
        } else {
            setShowStrategyModal(true);
        }
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
            toast.show(result.message, {
                type: "danger",
            });
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
            setUsdtRate(result.data.bid_price_b);
        } else {
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    useEffect(() => {
        setMaxAmount(userData.strategy_a_net_balance);
        getBankDetails();
        getUSDTRate();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Withdrawing from {title}</Text>
                        <Text style={{ ...styles.subTitle, marginTop: 28 }}>Amount available to withdraw</Text>
                        <Text style={{ ...styles.title, marginTop: 28, fontSize: 34 }}>
                            {getFormattedCurrency(maxAmount, 2)}
                        </Text>
                        <Text style={{ ...styles.subTitle, marginTop: 40 }}>Enter amount to withdraw</Text>
                        <View style={styles.rowCenter}>
                            <TextInput
                                style={{
                                    color: "white",
                                    borderRadius: 0,
                                    fontSize: 32,
                                    fontWeight: "700",
                                    marginTop: 10,
                                    width: "75%",
                                }}
                                activeOutlineColor="#797682"
                                outlineColor="white"
                                mode="outlined"
                                selectionColor="white"
                                placeholderTextColor={"#797682"}
                                placeholder="$ 0"
                                keyboardType="numeric"
                                theme={{ colors: { text: "white" } }}
                                value={amount.toString()}
                                onChangeText={(val) => setAmount(val)}
                            />
                            <TouchableOpacity
                                onPress={() => setAmount(maxAmount)}
                                style={{
                                    ...styles.rowCenter,
                                    transform: [{ translateX: -2 }],
                                    marginTop: 16,
                                    backgroundColor: "white",
                                    height: "78%",
                                    width: "25%",
                                }}
                            >
                                <Text>Max</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 60 }}>
                            {/* <View style={styles.rowSpaceBtn}>
                                <Text style={{ ...styles.subTitle, fontSize: 14 }}>Your average UST buying price</Text>
                                <Text style={styles.title14}>$79.71</Text>
                            </View> */}
                            <View style={styles.rowSpaceBtn}>
                                <Text style={{ ...styles.subTitle, fontSize: 14 }}>Current withdrawl price of UST</Text>
                                <Text style={styles.title14}>{getFormattedCurrency(usdtRate, 0, "INR")}</Text>
                            </View>
                            <View style={styles.rowSpaceBtn}>
                                <Text style={{ ...styles.subTitle, fontSize: 14 }}>Fees</Text>
                                <Text style={styles.title14}>₹0</Text>
                            </View>
                        </View>
                        <View style={{ bottom: "-10%" }}>
                            <RiveraGradientBtn
                                outerCSS={styles.btnPosition}
                                onPressHandler={() => ctaClickHandler()}
                                btnText="Continue"
                            />
                        </View>
                    </View>
                    {showStrategyModal ? (
                        <RiveraMoadl
                            setModalVisible={(val) => setShowStrategyModal(val)}
                            modalVisible={showStrategyModal}
                            showClose={true}
                            children={
                                <>
                                    <Text style={styles.title} onPress={() => setShowStrategyModal(false)}>
                                        Select bank account
                                    </Text>
                                    <BankDataPreview
                                        benificary_name={banksData.benificary_name}
                                        bank_account_id={banksData.benificary_account_id}
                                        benificary_acc_number={banksData.benificary_acc_number}
                                        ISFC_code={banksData.ISFC_code}
                                        topMargin={30}
                                        showEditOption={false}
                                    />
                                    <RiveraGradientBtn
                                        outerCSS={styles.btnPosition}
                                        onPressHandler={() => {
                                            navigation.navigate("WithdrawReason", { amount, usdtRate, tickerData });
                                            setShowStrategyModal(false);
                                        }}
                                        btnText="Continue"
                                    />
                                </>
                            }
                        />
                    ) : (
                        <></>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default WithdrawAmount;
