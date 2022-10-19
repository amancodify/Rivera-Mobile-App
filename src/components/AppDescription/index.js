import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import RiveraGradientBtn from "../common/riveraGradientBtn";
import { setItem } from "../../utils/helper";
import SmartContractIcon from "../../assets/smartcontract.svg";
import TarazooIcon from "../../assets/tarazoo.svg";
import CreditRiskIcon from "../../assets/creditrisk.svg";

const styles = StyleSheet.create({
    appIntroContainer: {
        position: "relative",
        width: "100%",
    },
    title: {
        fontSize: 22,
        color: "white",
        fontFamily: "RHD_700",
        marginTop: 20,
    },
    despTitle: {
        fontSize: 22,
        color: "white",
        fontWeight: "700",
        marginLeft: 10,
    },
    desc: {
        fontSize: 14,
        color: "#A9A9A9",
        fontFamily: "RHD_500",
        marginTop: 17,
    },
    btnPosition: {
        position: "absolute",
        top: 370,
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
});

const DescStep1 = ({ setStep }) => {
    return (
        <>
            <View style={styles.appIntroContainer}>
                <Text style={styles.title}>How it works</Text>
                <View style={{ marginTop: 32, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <SmartContractIcon />
                    <Text style={styles.despTitle}>Generating returns on UST</Text>
                </View>
                <Text style={styles.desc}>
                    To earn intrest on your UST, Rivera works with secure lending partners and finds the best rates
                    available for your funds.
                </Text>
                <Text style={{ ...styles.desc, marginTop: 30 }}>
                    The funds lend out by our lending partners are backed by sufficient collaterals to ensure fund
                    recovery in case of defaults.
                </Text>
                <RiveraGradientBtn outerCSS={styles.btnPosition} onPressHandler={() => setStep(2)} btnText="Continue" />
            </View>
        </>
    );
};

const DescStep2 = ({ setStep }) => {
    return (
        <>
            <View style={styles.appIntroContainer}>
                <Text style={styles.title}>Risk in Investment</Text>
                <View style={{ marginTop: 32, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TarazooIcon />
                    <Text style={styles.despTitle}>Regulatory risk</Text>
                </View>
                <Text style={styles.desc}>
                    If the government imposes a ban, Rivera will safely return all your funds with intrest.
                </Text>
                <View style={{ marginTop: 32, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <CreditRiskIcon />
                    <Text style={styles.despTitle}>Credit risk</Text>
                </View>
                <Text style={styles.desc}>
                    Credit risk means that if our lending partner goes bankcupt or defaults, it will be principal loss.
                    To mitigate this, Rivera works with multiple lending partners and also diversifies a portion of the
                    fund towards DeFi protocols.
                </Text>
                <View style={{ ...styles.btnPosition, ...styles.btnsContainer }}>
                    <TouchableOpacity style={styles.transBtn}>
                        <Button
                            contentStyle={{ height: 57 }}
                            onPress={() => setStep(1)}
                            style={styles.transBtnContent}
                            mode="outlined"
                            color="white"
                            uppercase={false}
                        >
                            Go Back
                        </Button>
                    </TouchableOpacity>
                    <RiveraGradientBtn
                        outerCSS={styles.stepGradBtn}
                        onPressHandler={() => setStep(3)}
                        btnText="Continue"
                    />
                </View>
            </View>
        </>
    );
};

const DescStep3 = ({ setStep, setModalVisible }) => {
    return (
        <>
            <View style={styles.appIntroContainer}>
                <Text style={styles.title}>Risk in Investment</Text>
                <View style={{ marginTop: 32, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TarazooIcon />
                    <Text style={styles.despTitle}>Smart contract risk</Text>
                </View>
                <Text style={styles.desc}>
                    While only a small portion of your funds is deployed in DeFi protocols, they are prone to hacks
                    resulting in loss of funds. Rivera only works with properly audited and attack-tested DeFi protocols
                    to mitigate this.
                </Text>
                <View style={{ marginTop: 32, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <CreditRiskIcon />
                    <Text style={styles.despTitle}>UST de-pegging risk</Text>
                </View>
                <Text style={styles.desc}>
                    USDT might lose its peg in a rare event, and its price might not remain stable at $1.
                </Text>
                <View style={{ ...styles.btnPosition, ...styles.btnsContainer }}>
                    <TouchableOpacity style={styles.transBtn}>
                        <Button
                            contentStyle={{ height: 57 }}
                            onPress={() => setStep(2)}
                            style={styles.transBtnContent}
                            mode="outlined"
                            color="white"
                            uppercase={false}
                        >
                            Go Back
                        </Button>
                    </TouchableOpacity>
                    <RiveraGradientBtn
                        outerCSS={styles.stepGradBtn}
                        onPressHandler={() => {
                            setStep(null);
                            setModalVisible(false);
                            setItem("firstTimeUser", "NO");
                        }}
                        btnText="Done"
                    />
                </View>
            </View>
        </>
    );
};

const AppDescription = ({ setModalVisible }) => {
    const [step, setStep] = useState(1);
    let renderHtml = <></>;

    switch (step) {
        case 1:
            renderHtml = <DescStep1 setStep={setStep} />;
            break;
        case 2:
            renderHtml = <DescStep2 setStep={setStep} />;
            break;
        case 3:
            renderHtml = <DescStep3 setStep={setStep} setModalVisible={() => setModalVisible()} />;
            break;
    }
    return renderHtml;
};

export default AppDescription;
