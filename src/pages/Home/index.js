import React, { useContext, useState, useEffect } from "react";
import {
    SafeAreaView,
    RefreshControl,
    View,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    Platform,
} from "react-native";
import { Text, withTheme, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../authContext";
import { getItem, numberWithCommas, openWhatsApp } from "../../utils/helper";
import { getFormattedCurrency, getNameInitials } from "../../utils/helper";
import { executeGetMethod } from "../../network/api";
import styles from "./style";
import CustomSlider from "../../components/common/customSlider";
import RiveraMoadl from "../../components/common/riveraModal";
import AppDescription from "../../components/AppDescription";
import TransLogo from "../../assets/transaction.svg";
import MagnifyingManLogo from "../../assets/magnifyingMan.svg";
import RightArrowCircleLogo from "../../assets/rightArrowCircle.svg";
import SliderKnob from "../../assets/knob.svg";
import TelegramLogo from "../../assets/telegram.svg";
import InitialIcon from "../../components/common/initialsIcon";
import { Facebook } from "react-content-loader/native";
const MyFacebookLoader = () => <Facebook width={"150%"} backgroundColor={"gray"} />;

const Home = ({ navigation, route }) => {
    let { reload } = route.params || false;
    let { userToken, deviceId, userData, fetchUserData, toast } = useContext(AuthContext);
    const [amount, setAmount] = useState(10000);
    const [modalVisible, setModalVisible] = useState(false);
    const [invested, setInvested] = useState(false);
    const [kycDone, setKycDone] = useState(true);
    const [bankVerified, setBankVerified] = useState(true);
    const [tickerData, setTickerData] = useState({});
    const [usdtRate, setUsdtRate] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleHomePageLoad = async () => {
        if (amount !== 10000) {
            setAmount(10000);
        }
        if (!userToken) {
            userToken = await getItem("userToken");
        }
        if (userToken) {
            let fettchedUserData = await fetchUserData(userToken);
            if (fettchedUserData) {
                if (fettchedUserData.strategy_a_net_balance > 0) {
                    setInvested(true);
                }
                setIsLoading(false);
                setKycDone(fettchedUserData.kyc_verified);
                setBankVerified(fettchedUserData.bank_verified);
                let isFirstTimeUser = await getItem("firstTimeUser");
                if (isFirstTimeUser === "YES") {
                    setModalVisible(true);
                }
                await getUSDTRate();
                return fettchedUserData;
            } else {
                setIsLoading(false);
            }
        }

        return null;
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
            return result;
        } else {
            alert(result.message);
            return null;
        }
    };

    useEffect(() => {
        return handleHomePageLoad();
    }, [userToken, reload]);

    const handleKycRoute = () => {
        if (!userData.pan_verified) {
            navigation.navigate("Pan");
        } else if (!userData.aadhar_verified) {
            navigation.navigate("Aadhar");
        } else if (!userData.bank_verified) {
            navigation.navigate("BankDetails");
        }
    };

    const handleDepositeClick = () => {
        if (userData.kyc_verified && userData.bank_verified) {
            navigation.navigate("Deposit", { selectedAmount: amount });
        } else {
            handleKycRoute();
        }
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await handleHomePageLoad();
        setRefreshing(false);
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView
                    style={styles.homeContainer}
                    refreshControl={
                        <RefreshControl
                            tintColor={"white"}
                            progressBackgroundColor={"white"}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.accTranContainer}>
                        <InitialIcon
                            initials={getNameInitials(userData.aadhar_name)}
                            handleAction={() => navigation.navigate("Account")}
                        />
                        <TouchableOpacity
                            style={styles.transBtnContainer}
                            onPress={() => navigation.navigate("Transactions")}
                        >
                            <TransLogo height={22} width={22} fill="#ffffff" />
                            <Text style={styles.tranText}>Transactions</Text>
                        </TouchableOpacity>
                    </View>
                    {kycDone && bankVerified ? (
                        <></>
                    ) : (
                        <TouchableOpacity style={styles.kycContainer} onPress={() => handleKycRoute()}>
                            <View style={{ marginRight: 20, width: "12%" }}>
                                <MagnifyingManLogo height={40} width={40} />
                            </View>
                            <View style={styles.rightContainer}>
                                <View style={styles.kycDescContainer}>
                                    <Text style={styles.kycTitle}>
                                        Complete your {kycDone && !bankVerified ? "Bank Details" : "KYC"}
                                    </Text>
                                    <Text style={styles.kycDesc}>
                                        Complete your {kycDone && !bankVerified ? "Bank Details" : "KYC"} to start
                                        earing 20% stable intrest
                                    </Text>
                                </View>
                                <View style={{ marginRight: 20, width: "12%" }}>
                                    <AntDesign name="arrowright" size={24} color="#7F7C87" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}

                    {isLoading ? (
                        <View style={{ padding: 20, width: "80%" }}>
                            <MyFacebookLoader />
                        </View>
                    ) : (
                        <>
                            {invested ? (
                                <View style={styles.portfolioHoldingsContainer}>
                                    <ImageBackground
                                        imageStyle={styles.phImageBg}
                                        source={require("../../assets/gradientpinkbg.png")}
                                        style={styles.amt2Display}
                                    >
                                        <View style={styles.phMain}>
                                            <Text style={styles.phMainTitle}>Your Portfolio Holdings</Text>
                                            <Text style={styles.phMainAmount}>
                                                $ {numberWithCommas(userData.strategy_a_net_balance.toFixed(2))}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("AccountPortfolio")}
                                                style={styles.arrowRightIcon}
                                            >
                                                <RightArrowCircleLogo height={40} width={40} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.phDescContainer}>
                                        <View style={styles.textContainer}>
                                            <View style={styles.overallReturns}>
                                                <Text style={{ color: "white" }}>Overall Returns</Text>
                                                <View style={{ ...styles.amtPercent, justifyContent: "flex-start" }}>
                                                    <Text style={styles.returnAmount}>
                                                        ${" "}
                                                        {numberWithCommas(
                                                            userData.strategy_a_total_amount_earned.toFixed(2),
                                                        )}
                                                    </Text>
                                                    <Text style={styles.returnPercent}>
                                                        +{userData.total_percentage_earned.toFixed(2)}%
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.overallReturns}>
                                                <Text style={{ color: "white" }}>Yesterday’s Returns</Text>
                                                <View style={styles.amtPercent}>
                                                    <Text style={styles.returnAmount}>
                                                        {getFormattedCurrency(
                                                            userData?.strategy_a_yesterday_amount_earned,
                                                            2,
                                                            "USD",
                                                        )}
                                                    </Text>
                                                    <Text style={styles.returnPercent}>
                                                        +{userData?.yesterdays_percentage_earned.toFixed(4)}%
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.phDesc}>
                                            Please note that all returns are being generated on UST, a stablecoin pegged
                                            with USD.
                                        </Text>
                                        <View style={{ ...styles.btnPosition, ...styles.btnsContainer }}>
                                            <TouchableOpacity style={styles.transBtn}>
                                                <Button
                                                    contentStyle={{ height: 44 }}
                                                    onPress={() => handleDepositeClick()}
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
                                                    onPress={() => navigation.navigate("Withdraw")}
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
                                </View>
                            ) : (
                                <View style={styles.amountDispContainer}>
                                    <ImageBackground
                                        source={require("../../assets/amount-disp.png")}
                                        imageStyle={{ borderRadius: 13 }}
                                        style={styles.amtDisplay}
                                    >
                                        <Text style={styles.descTxt}>Earn 20% stable returns</Text>
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
                                    <Button
                                        contentStyle={{ height: 47 }}
                                        mode="contained"
                                        color="white"
                                        style={styles.investBtn}
                                        onPress={() => handleDepositeClick()}
                                        uppercase={false}
                                    >
                                        Invest now
                                    </Button>
                                </View>
                            )}
                        </>
                    )}

                    <LinearGradient
                        colors={["#8B78ED", "#262A3D"]}
                        start={[2.2, 0]}
                        end={[0.4, 1]}
                        style={styles.introDisplay}
                    >
                        <Text style={styles.title}>New to crypto investing?</Text>
                        <Text style={styles.subtitle}>
                            Start with stablecoins. Shielded from market volatility, grow your money the easy way.
                        </Text>
                        <Text onPress={() => {}} style={styles.linkCta}>
                            Learn More
                        </Text>
                        <Image source={require("../../assets/coins.png")} style={styles.coinsImage} />
                    </LinearGradient>
                    <View style={{ marginTop: 40, position: "relative" }}>
                        <Text style={styles.title}>WhatsApp Support</Text>
                        <Text style={styles.subtitle}>
                            Message the team on WhatsApp or read our FAQ’s if you’ve any questions.
                        </Text>
                        <TouchableOpacity
                            onPress={async () => await openWhatsApp("I need support for Rivera Money!", "8451823771")}
                        >
                            <Text style={styles.linkCta}>WhatsApp Support</Text>
                        </TouchableOpacity>
                        <Ionicons name="md-logo-whatsapp" size={70} color="white" style={styles.whatsappIcon} />
                    </View>
                    <LinearGradient
                        colors={["#8B78ED", "#262A3D"]}
                        start={[2.2, 0]}
                        end={[0.4, 1]}
                        style={{ ...styles.introDisplay, ...styles.makeCenter }}
                    >
                        <View style={{ marginRight: 20, paddingTop: 20 }}>
                            <TelegramLogo height={64} width={64} />
                        </View>
                        <View>
                            <Text style={styles.title}>Join the Rivera Family</Text>
                            <Text style={{ ...styles.subtitle, width: "60%" }}>
                                Get early access to the latest investment strategies and trending DeFi protocols.
                            </Text>
                            <Text style={{ ...styles.linkCta, marginTop: 20 }}>Join Now</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.footer}>
                        <Text style={styles.title}>Got questions?</Text>
                        <Text style={{ ...styles.subtitle, textAlign: "center", width: "60%" }}>
                            Being curious is a valuable skill. You will find what you seek below.
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AccountFaq")}>
                            <Text style={styles.linkCta}>Read FAQ</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {modalVisible ? (
                    <RiveraMoadl
                        modalHeight={Platform.OS === "ios" ? "59%" : "65%"}
                        setModalVisible={(val) => setModalVisible(val)}
                        modalVisible={modalVisible}
                        children={<AppDescription setModalVisible={setModalVisible} />}
                    />
                ) : (
                    <></>
                )}
            </SafeAreaView>
        </>
    );
};

export default withTheme(Home);
