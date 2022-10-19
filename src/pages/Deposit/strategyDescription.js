import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import RiskMeterIcon from "../../assets/riskmeter.svg";

const styles = StyleSheet.create({
    appIntroContainer: {
        position: "relative",
        width: "100%",
    },
    title: {
        fontSize: 18,
        color: "white",
        fontFamily: "RHD_700",
    },
    desc: {
        fontSize: 14,
        color: "#A9A9A9",
        fontFamily: "RHD_500",
        marginTop: 20,
    },
    btnPosition: {
        position: "absolute",
        top: 240,
    },
    btnsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    transBtn: {
        width: "48%",
        height: 57,
        display: "flex",
        justifyContent: "center",
    },
    transBtnContent: {
        borderColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#797682",
    },
    stepGradBtn: {
        width: "48%",
    },
    rowCentered: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

const StrategyDescription = ({ ctaClickHandler, description, title }) => {
    return (
        <>
            <View style={styles.appIntroContainer}>
                <View style={styles.rowCentered}>
                    <RiskMeterIcon />
                    <Text style={{ ...styles.title, marginLeft: 15, textTransform: "capitalize" }}>{title}</Text>
                </View>
                <Text style={styles.desc}>{description}</Text>
                <Text style={styles.desc}>
                    DeFi Farming takes 15 days to activate and that’s when you start earning a full APY of 20.8%. In
                    mean time, you will be earning the lending APY of 12.8%. Learn more
                </Text>
                <RiveraGradientBtn
                    outerCSS={styles.btnPosition}
                    onPressHandler={() => ctaClickHandler()}
                    btnText="Understood"
                />
            </View>
        </>
    );
};

export default StrategyDescription;
