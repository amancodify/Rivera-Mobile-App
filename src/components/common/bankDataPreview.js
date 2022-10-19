import React from "react";
import { View, StyleSheet, Text } from "react-native";
import EditIcon from "../../assets/edit.svg";
import { getPartialViewAccountNumber } from "../../utils/helper";

const BankDataPreview = ({
    benificary_name,
    bank_account_id,
    ISFC_code,
    benificary_acc_number,
    topMargin = 30,
    showEditOption = false,
}) => {
    const styles = StyleSheet.create({
        bankPreviewCard: {
            display: "flex",
            flexDirection: "row",
            borderColor: "#797682",
            borderWidth: 1,
            minHeight: 114,
            marginTop: topMargin,
            padding: 10,
            position: "relative",
        },
        radioButton: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            width: 25,
            height: 25,
            borderColor: "#A528DD",
            borderWidth: 1,
            marginRight: 15,
        },
        radioFilled: {
            width: 15,
            height: 15,
            borderRadius: 50,
            backgroundColor: "#55ADFF",
        },
        PaymentCardContainer: {
            padding: 15,
            paddingBottom: 30,
            paddingTop: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff0f",
            borderWidth: 1,
            borderColor: "#797682",
            marginTop: 20,
        },
        riveraBankDetailsContainer: {
            padding: 15,
            backgroundColor: "#ffffff0f",
            borderWidth: 1,
            borderColor: "#797682",
            marginTop: 20,
            paddingBottom: 30,
            paddingTop: 30,
        },
    });

    return (
        <>
            <View style={styles.bankPreviewCard}>
                <View style={styles.radioButton}>
                    <View style={styles.radioFilled}></View>
                </View>
                <View>
                    <Text style={{ color: "white", fontWeight: "600", marginBottom: 10 }}>{benificary_name || ""}</Text>
                    <Text style={{ color: "white", fontWeight: "600", marginBottom: 10 }}>
                        {getPartialViewAccountNumber(benificary_acc_number) || ""}
                    </Text>
                    <Text style={{ color: "white", fontWeight: "600", marginBottom: 10 }}>{ISFC_code || ""}</Text>
                </View>
                {showEditOption ? (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            top: 15,
                            right: 15,
                        }}
                    >
                        <EditIcon />
                        <Text style={{ color: "#7479F1", marginLeft: 5 }}>Edit</Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </>
    );
};

export default BankDataPreview;
