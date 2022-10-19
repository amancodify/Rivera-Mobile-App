import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { openWhatsApp } from "../../utils/helper";
import { Ionicons } from "@expo/vector-icons";
import GreaterGreyIcon from "../../assets/greaterGreyIcon.svg";
import BriefcasePinkIcon from "../../assets/briefcase_pink.svg";
import TransactionIcon from "../../assets/transaction_pink.svg";
import InviteIcon from "../../assets/share.svg";
import UserIcon from "../../assets/pinkuser.svg";
import WhatsappIcon from "../../assets/pinkwhatsapp.svg";
import FaqIcon from "../../assets/help-circle.svg";
import AboutIcon from "../../assets/alert-circle.svg";

const Account = ({ navigation }) => {
    const accountOptions = [
        {
            icon: <BriefcasePinkIcon />,
            text: "Portfolio",
            action: "AccountPortfolio",
        },
        {
            icon: <TransactionIcon />,
            text: "Transactions",
            action: "Transactions",
        },
        {
            icon: <TransactionIcon />,
            text: "Banks Accounts",
            action: "BankDetailsPreview",
        },
        {
            icon: <InviteIcon />,
            text: "Invite a friend",
            action: "AccountInvite",
        },
        {
            icon: <UserIcon />,
            text: "Profile",
            action: "AccountProfile",
        },
        {
            icon: <WhatsappIcon />,
            text: "Support",
            action: "Support",
        },
        {
            icon: <FaqIcon />,
            text: "FAQ",
            action: "AccountFaq",
        },
        {
            icon: <AboutIcon />,
            text: "About",
            action: "AccountAbout",
        },
    ];

    const handleActions = async (action) => {
        switch (action) {
            case "AccountProfile":
                navigation.navigate("AccountProfile");
                break;
            case "AccountPortfolio":
                navigation.navigate("AccountPortfolio");
                break;
            case "Transactions":
                navigation.navigate("Transactions");
                break;
            case "AccountFaq":
                navigation.navigate("AccountFaq");
                break;
            case "AccountAbout":
                navigation.navigate("AccountAbout");
                break;
            case "AccountInvite":
                navigation.navigate("AccountInvite");
                break;
            case "BankDetailsPreview":
                navigation.navigate("BankDetailsPreview");
                break;
            case "Support":
                await openWhatsApp("I need support for Rivera Money!", "8451823771");
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 20, fontFamily: "RHD_600" }}>Account</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        {accountOptions.map((item, inx) => {
                            return (
                                <TouchableOpacity
                                    onPress={async () => await handleActions(item.action)}
                                    key={`account_key_${inx}`}
                                    style={{ ...styles.rowCenter, justifyContent: "space-between", marginBottom: 40 }}
                                >
                                    <View style={styles.iconTextWrapper}>
                                        <View style={styles.accountOptionIcon}>{item.icon}</View>
                                        <Text style={styles.text}>{item.text}</Text>
                                    </View>
                                    <GreaterGreyIcon />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Account;
