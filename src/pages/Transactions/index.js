import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, RefreshControl, Image } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../authContext";
import styles from "./style";
import { LinearGradient } from "expo-linear-gradient";
import TransCard from "./transactionCard";
import { executeGetMethod } from "../../network/api";
import { getFormattedCurrency } from "../../utils/helper";
import { Facebook } from "react-content-loader/native";
const MyFacebookLoader = () => <Facebook width={"150%"} backgroundColor={"gray"} />;

const Transactions = ({ navigation }) => {
    let { deviceId, userToken } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(0);
    const [transactionsData, setTransactionsData] = useState();
    const [interestTransactions, setInterestTransactions] = useState();
    const [total, setTotal] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    let activeTabStyle = styles.activeTab;

    const getTransactions = async (interestType) => {
        setTransactionsData();
        setInterestTransactions();
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let url = "/investments/get_transactions?strategy=a";
        if (interestType) {
            url = "/investments/get_transactions?strategy=a&interest=true";
        }

        let result = await executeGetMethod(url, headers);
        if (result.success) {
            if (interestType) {
                setInterestTransactions(result.data.transaction);
            } else {
                setTransactionsData(result.data);
                setTotal({ total_deposit: result.data.total_deposit, total_withdrawl: result.data.total_withdrawl });
            }
            return result;
        } else {
            alert(result.message);
        }
    };

    useEffect(() => {
        setActiveTab(0);
        getTransactions();
    }, []);

    const getInterestTransactions = async () => {
        let result = await getTransactions(true);
        if (result.success) {
            setTransactionsData();
            setInterestTransactions(result.data.transaction);
        } else {
            alert(result.message);
        }
    };

    const executeRefresh = async () => {
        setRefreshing(true);
        setActiveTab(0);
        setInterestTransactions();
        setTransactionsData();
        await getTransactions();
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.AndriodSafeArea}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        tintColor={"white"}
                        progressBackgroundColor={"white"}
                        refreshing={refreshing}
                        onRefresh={executeRefresh}
                    />
                }
            >
                <View style={styles.homeContainer}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ width: "20%" }} onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 50 }} name="arrow-back" size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.title20}>Transaction History</Text>
                    </View>

                    <View style={styles.pfRowContainer}>
                        <LinearGradient
                            colors={["#8B78ED", "#262A3D"]}
                            start={[2.2, 0]}
                            end={[0.4, 1]}
                            style={styles.introDisplay}
                        >
                            <Text style={styles.subTitle}>Total Invested</Text>
                            <Text style={{ ...styles.title20, marginTop: 10 }}>
                                {getFormattedCurrency(total?.total_deposit, 2, "USD")}
                            </Text>
                        </LinearGradient>
                        <LinearGradient
                            colors={["#8B78ED", "#262A3D"]}
                            start={[2.2, 0]}
                            end={[0.4, 1]}
                            style={styles.introDisplay}
                        >
                            <Text style={styles.subTitle}>Total withdrawn</Text>
                            <Text style={{ ...styles.title20, marginTop: 10 }}>
                                {getFormattedCurrency(total?.total_withdrawl, 2, "USD")}
                            </Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setActiveTab(0);
                                getTransactions();
                            }}
                            style={
                                activeTab === 0 ? { ...styles.tabContainer, ...activeTabStyle } : styles.tabContainer
                            }
                        >
                            <Text style={activeTab === 0 ? { ...styles.subTitle, ...activeTabStyle } : styles.subTitle}>
                                Transactions
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setActiveTab(1);
                                getInterestTransactions();
                            }}
                            style={
                                activeTab === 1 ? { ...styles.tabContainer, ...activeTabStyle } : styles.tabContainer
                            }
                        >
                            <Text style={activeTab === 1 ? { ...styles.subTitle, ...activeTabStyle } : styles.subTitle}>
                                Intrest
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView nestedScrollEnabled={true}>
                        {activeTab === 0 ? (
                            <>
                                {transactionsData?.transaction ? (
                                    transactionsData.transaction.map((item, inx) => {
                                        return <TransCard data={item} key={`trans_card${inx}`} />;
                                    })
                                ) : (
                                    <>
                                        <View style={{ padding: 20, width: "80%" }}>
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                        </View>
                                    </>
                                )}
                                {transactionsData?.transaction && transactionsData?.transaction.length <= 0 ? (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={require("../../assets/no-transactions.png")}
                                            style={{ height: 330, width: 330 }}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 28,
                                                letterSpacing: 1,
                                                fontWeight: "700",
                                            }}
                                        >
                                            No Transactions!
                                        </Text>
                                    </View>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <></>
                        )}

                        {activeTab === 1 ? (
                            <>
                                {interestTransactions ? (
                                    <>
                                        {interestTransactions.map((item, inx) => {
                                            return <TransCard data={item} key={`interestcard_${inx}`} />;
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <View style={{ padding: 20, width: "80%" }}>
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                            <MyFacebookLoader />
                                        </View>
                                    </>
                                )}
                                {interestTransactions && interestTransactions.length <= 0 ? (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={require("../../assets/no-transactions.png")}
                                            style={{ height: 330, width: 330 }}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 28,
                                                letterSpacing: 1,
                                                fontWeight: "700",
                                            }}
                                        >
                                            No Transactions!
                                        </Text>
                                    </View>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Transactions;
