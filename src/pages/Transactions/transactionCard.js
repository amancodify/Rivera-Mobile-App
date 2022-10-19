import React from "react";
import moment from "moment";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import UploadIcon from "../../assets/greenupload.svg";
import DownloadIcon from "../../assets/greendownload.svg";
import ProcessingIcon from "../../assets/clock.svg";
import FailedIcon from "../../assets/alert-triangle.svg";
import DollerIcon from "../../assets/dollar-sign.svg";

const TransCard = ({ data }) => {
    let { symbol_amount, status, transaction_type, created_at, id } = data || {
        symbol_amount: 0,
        status: "",
        transaction_type: "",
        created_at: "",
        id: "",
    };

    let textColor = "",
        title = "",
        desc = "",
        icon;

    switch (status) {
        case "User_confirmed":
        case "Admin_confirmed":
            textColor = "#99CF84";
            break;
        case "User initiated":
            textColor = "#FF8B8B";
            break;
        default:
            textColor = "#FF8B8B";
    }

    if (transaction_type === "Interest") {
        textColor = "#7479F1";
    }

    if (status === "User_confirmed" && transaction_type === "Deposit") {
        title = "Deposit Inprogress";
        icon = <DownloadIcon width="100%" height="100%" />;
    } else if (status === "Admin_confirmed" && transaction_type === "Withdraw") {
        title = "Withdraw Successfull";
        icon = <UploadIcon width="100%" height="100%" />;
    } else if (status === "User_confirmed" && transaction_type === "Withdraw") {
        title = "Withdraw Inprogress";
        icon = <UploadIcon width="100%" height="100%" />;
    } else if (status === "Admin_confirmed" && transaction_type === "Deposit") {
        title = "Investment Successfull";
        icon = <UploadIcon width="100%" height="100%" />;
    } else if (status === "User_initiated" && transaction_type === "Deposit") {
        title = "Processing Deposit";
        icon = <ProcessingIcon width="100%" height="100%" />;
        desc = "Your payment will be processed within 24 hours from the time of transaction.";
    } else if (status === "User_initiated" && transaction_type === "Withdraw") {
        title = "Processing Withdrawal";
        icon = <ProcessingIcon width="100%" height="100%" />;
        desc = "Your payment will be processed within 24 hours from the time of transaction.";
    } else if (status === "Failed") {
        title = "Payment Expired";
        icon = <FailedIcon width="90%" height="90%" />;
        desc = "If any amount was deducted then it would be automatically refunded to your linked bank account within 72 hours.";
    } else if (transaction_type === "Interest") {
        title = "Interest credited";
        icon = <DollerIcon width="100%" height="100%" />;
    } else {
        title = status, icon = <FailedIcon width="90%" height="90%" />;
    }

    const getFormattedDate = (timestamp) => {
        let time = moment(timestamp).format("LT");
        let date = moment(timestamp).format("D MMM");
        let formattedDate = `${time}, ${date}`;
        return formattedDate;
    };

    return (
        <View style={styles.transactionCard}>
            <View style={styles.iconContainer}>{icon}</View>
            <View style={styles.contentContainer}>
                <View style={{ ...styles.rowSpaceBtn, marginTop: 0, marginBottom: 20 }}>
                    <View>
                        <Text style={{ color: textColor, fontWeight: "600", fontSize: 16 }}>{title}</Text>
                        <Text style={{ ...styles.subTitle, marginTop: 5 }}>{getFormattedDate(created_at)}</Text>
                    </View>
                    <Text style={{ color: textColor, fontWeight: "700", fontSize: 16 }}>
                        ${symbol_amount.toFixed(2)}
                    </Text>
                </View>

                <View style={{ ...styles.rowSpaceBtn, marginTop: 0 }}>
                    <View>
                        <Text style={styles.subTitle}>Strategy</Text>
                        <Text style={{ ...styles.title20, fontSize: 14, fontWeight: "700", marginTop: 5 }}>
                            Bluechip Lending
                        </Text>
                    </View>
                    <View style={{ display: "flex", alignItems: "flex-end" }}>
                        <Text style={styles.subTitle}>Case Id</Text>
                        <Text style={{ ...styles.title20, fontSize: 14, fontWeight: "700", marginTop: 5 }}>#{id}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 13 }}>
                    <Text style={{ ...styles.subTitle, color: textColor }}>{desc}</Text>
                </View>
            </View>
        </View>
    );
};

export default TransCard;
