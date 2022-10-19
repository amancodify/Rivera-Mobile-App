import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { executeGetMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import styles from "./style";
import StrategyCard from "../Deposit/strategyCard";

const Withdraw = ({ navigation }) => {
    let { deviceId, userToken, userData } = useContext(AuthContext);
    const [strategies, setStrategies] = useState([]);

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
                        isActive: item.is_active
                    };

                    formattedData.push(data);
                }
                setStrategies(formattedData);
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

    const handleRoute = (strategyId, title) => {
        navigation.navigate("WithdrawAmount", { strategyId, title });
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Select strategy for your stablecoin investment</Text>
                        <View style={styles.strategiesContainer}>
                            {strategies.length > 0 ? (
                                <>
                                    {strategies.map((item, inx) => {
                                        return (
                                            <StrategyCard
                                                handleRoute={() => handleRoute(item.strategyId, item.title)}
                                                data={item}
                                                userData={userData}
                                                key={`strategyCard_${inx}`}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Withdraw;
