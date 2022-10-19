import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getFormattedCurrency, numberWithCommas } from "../../utils/helper";
import { AuthContext } from "../../authContext";
import { executeGetMethod } from "../../network/api";
import BlueChipIcon from "../../assets/bluechip.svg";
// import NutralFarming from "../../assets/nutral-farming.svg";
import styles from "./style";

const AccountPortfolio = ({ navigation }) => {
    let { userData, userToken, deviceId } = useContext(AuthContext);
    const [strategies, setStrategies] = useState({});

    // let cases = [1, 2];

    const getStrategies = async () => {
        try {
            const headers = {
                Authorization: userToken,
                "device-id": deviceId,
            };
            let result = await executeGetMethod("/investments/get_strategies", headers);

            if (result?.success) {
                let formattedData = [];

                for (let item of result.data) {
                    let data = {
                        title: item.strategy_name,
                        description: item.strategy_description,
                        totalValue: userData.strategy_a_net_balance.toFixed(2),
                        currency: "USD",
                        currentApy: item.apy,
                        safetyScore: item.safety_score,
                        maxScore: 10,
                        strategyId: item.strategy_code,
                        isActive: item.is_active,
                    };

                    formattedData.push(data);
                }
                setStrategies(formattedData[0]); // Temporarly fetching 0th index as there is only 1 staratefy
                return formattedData;
            } else {
                throw new Error(result.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        if (userToken) {
            return getStrategies();
        }
    }, [userToken]);

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <View style={styles.rowCenter}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                            </TouchableOpacity>
                            <Text style={{ color: "white", fontSize: 20, fontFamily: "RHD_600" }}>Portfolio</Text>
                        </View>
                        <View style={styles.portfolioCard}>
                            <View style={styles.iconTextWrapper}>
                                <View style={styles.accountOptionIcon}>
                                    <BlueChipIcon />
                                </View>
                                <Text style={{ ...styles.portfolioText1, paddingTop: 8, textTransform: "capitalize" }}>
                                    {strategies.title}
                                </Text>
                            </View>
                            <View style={styles.pfRowContainer}>
                                <View style={styles.pfColumnContainer}>
                                    <Text style={styles.subTitle}>Current Balance</Text>
                                    <Text style={styles.title}>
                                        {getFormattedCurrency(userData.strategy_a_net_balance, 2, "USD")}
                                    </Text>
                                </View>
                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                    <Text style={styles.subTitle}>Current APY</Text>
                                    <Text style={styles.title}>{strategies.currentApy}%</Text>
                                </View>
                            </View>
                            <View style={styles.pfRowContainer}>
                                <View style={styles.pfColumnContainer}>
                                    <Text style={styles.subTitle}>Total Return</Text>
                                    <Text style={styles.titleGreen}>
                                        {getFormattedCurrency(userData.strategy_a_total_amount_earned, 2, "USD")}
                                    </Text>
                                    <Text style={styles.titleGreen}>
                                        +{userData.total_percentage_earned.toFixed(2)}%
                                    </Text>
                                </View>
                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                    <Text style={styles.subTitle}>Yesterday’s Return</Text>
                                    <Text style={styles.titleGreen}>
                                        $ {userData?.strategy_a_yesterday_amount_earned.toFixed(2)}
                                    </Text>
                                    <Text style={styles.titleGreen}>
                                        +{userData.yesterdays_percentage_earned.toFixed(4)}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.portfolioCard}>
                            <View style={styles.iconTextWrapper}>
                                <View style={styles.accountOptionIcon}>
                                    <NutralFarming />
                                </View>
                                <Text style={{ ...styles.portfolioText1, paddingTop: 0 }}>Δ Neutral Farming</Text>
                            </View>
                            <View style={styles.pfRowContainer}>
                                <View style={styles.pfColumnContainer}>
                                    <Text style={styles.subTitle}>Current Balance</Text>
                                    <Text style={styles.title}>$14,680.12</Text>
                                </View>
                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                    <Text style={styles.subTitle}>Total Return</Text>
                                    <Text style={styles.title}>15.8%</Text>
                                </View>
                            </View>
                            <>
                                {cases.map((item, inx) => {
                                    return (
                                        <View key={`neutral_case_${inx}`}>
                                            <Divider style={{ ...styles.divider, marginTop: 30 }} />
                                            <View style={styles.pfRowContainer}>
                                                <View style={styles.pfColumnContainer}>
                                                    <Text style={styles.subTitle}>Case ID</Text>
                                                    <Text style={styles.title}>#1345</Text>
                                                </View>
                                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                                    <Text style={styles.subTitle}>Farming APY starts on</Text>
                                                    <Text style={{ ...styles.title, color: "#FF8B8B" }}>
                                                        25 - Dec - 2022
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.pfRowContainer}>
                                                <View style={styles.pfColumnContainer}>
                                                    <Text style={styles.subTitle}>Current Balance</Text>
                                                    <Text style={styles.title}>$14,680.12</Text>
                                                </View>
                                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                                    <Text style={styles.subTitle}>Total Return</Text>
                                                    <Text style={styles.title}>15.8%</Text>
                                                </View>
                                            </View>
                                            <View style={styles.pfRowContainer}>
                                                <View style={styles.pfColumnContainer}>
                                                    <Text style={styles.subTitle}>Total Return</Text>
                                                    <Text style={styles.titleGreen}>$4,688.24</Text>
                                                    <Text style={styles.titleGreen}>+36.71%</Text>
                                                </View>
                                                <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                                                    <Text style={styles.subTitle}>Yesterday’s Return</Text>
                                                    <Text style={styles.titleGreen}>$93.45</Text>
                                                    <Text style={styles.titleGreen}>+0.18%</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </>
                        </View> */}

                        <View style={styles.pfBtnsContainer}>
                            <TouchableOpacity style={styles.transBtn}>
                                <Button
                                    contentStyle={{ height: 44 }}
                                    onPress={() =>
                                        navigation.navigate("InvestmetSelector", {
                                            selectedAmount: 10000,
                                            strategyId: "a",
                                            title: "Blue Chip",
                                        })
                                    }
                                    style={{ borderRadius: 15 }}
                                    mode="contained"
                                    color="white"
                                    uppercase={false}
                                >
                                    Deposit
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.transBtn}>
                                <Button
                                    contentStyle={{ height: 44 }}
                                    onPress={() => navigation.navigate("WithdrawAmount", {title: "Blue Chip"})}
                                    style={styles.transBtnContent}
                                    mode="outlined"
                                    color="white"
                                    uppercase={false}
                                >
                                    Withdraw
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default AccountPortfolio;
