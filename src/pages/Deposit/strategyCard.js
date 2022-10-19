import React, { useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { Text, Divider } from "react-native-paper";
import styles from "./style";
import { AntDesign } from "@expo/vector-icons";
import BlueChipIcon from "../../assets/bluechip.svg";
import RiveraProgressBar from "../../components/common/riveraProgressBar";
import { Feather } from "@expo/vector-icons";
import { numberWithCommas } from "../../utils/helper";
import RiveraMoadl from "../../components/common/riveraModal";
import StrategyDescription from "./strategyDescription";

const StrategyCard = ({ data, handleRoute, userData }) => {
    const [showStrategyModal, setShowStrategyModal] = useState(false);

    let { title, totalValue, currency, currentApy, safetyScore, maxScore, description, strategyId, isActive } = data;
    let currencySumbol = currency === "USD" ? "$" : "₹";

    let splittedTotalValue = totalValue.toString().split(".");
    let mainAmount = numberWithCommas(splittedTotalValue[0]);
    let decimalAmount;
    if (splittedTotalValue[1]) {
        decimalAmount = splittedTotalValue[1];
    }

    const onStrategyClick = () => {
        setShowStrategyModal(true);
    };

    return (
        <>
            <View style={styles.strgyCardContainer}>
                <TouchableOpacity disabled={!isActive} onPress={() => onStrategyClick()}>
                    <View style={styles.rowSpaceBtn}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 50 }}>
                                <BlueChipIcon />
                            </View>
                            <Text
                                style={{
                                    textTransform: "capitalize",
                                    fontSize: 18,
                                    color: isActive ? "white" : "gray",
                                    fontWeight: "700",
                                    paddingTop: 8,
                                }}
                            >
                                {title}
                            </Text>
                        </View>
                        <View style={{ paddingTop: 8 }}>
                            <AntDesign name="right" size={24} color={isActive ? "white" : "gray"} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.pfRowContainer}>
                    <View style={styles.pfColumnContainer}>
                        <Text style={styles.subTitle}>Total Value</Text>
                        <Text style={styles.cardTitle}>
                            {currencySumbol}
                            {mainAmount}
                            {decimalAmount ? (
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
                                    .{decimalAmount}
                                </Text>
                            ) : (
                                <></>
                            )}
                        </Text>
                    </View>
                    <View style={{ ...styles.pfColumnContainer, alignItems: "flex-end" }}>
                        <Text style={styles.subTitle}>Current APY</Text>
                        <Text style={styles.titleGreen}>{currentApy}%</Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
                <Text style={{ ...styles.subTitle, marginTop: 20 }}>Safety Score</Text>
                <View style={styles.cardFooter}>
                    <View style={styles.safetyScore}>
                        <RiveraProgressBar progressVal={safetyScore} maxRange={maxScore} color="#99CF84" />
                    </View>
                    <TouchableOpacity style={styles.howItWorks}>
                        <Feather name="help-circle" size={18} color="#7479F1" />
                        <Text style={{ marginLeft: 5, color: "#7479F1", textDecorationLine: "underline" }}>
                            How it works?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showStrategyModal ? (
                <RiveraMoadl
                    setModalVisible={(val) => setShowStrategyModal(val)}
                    modalVisible={showStrategyModal}
                    modalHeight={Platform.OS === "ios" ? "45%" : "50%"}
                    children={
                        <StrategyDescription
                            ctaClickHandler={() => {
                                setShowStrategyModal(false);
                                handleRoute(strategyId, title);
                            }}
                            description={description}
                            title={title}
                        />
                    }
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default StrategyCard;
