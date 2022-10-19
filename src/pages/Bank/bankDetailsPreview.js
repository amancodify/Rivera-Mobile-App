import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, BackHandler } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import EditIcon from "../../assets/edit.svg";
import CheckCircleIcon from "../../assets/check-circle.svg";
import { AuthContext } from "../../authContext";
import { executeGetMethod } from "../../network/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BankDetailsPreview = ({ route, navigation }) => {
    let { deviceId, userToken, fetchUserData } = useContext(AuthContext);
    let { newBankAdded, action } = route.params || { newBankAdded: false, action: "" };
    const [banksData, setBanksData] = useState({
        benificary_name: "",
        benificary_acc_number: "",
        ISFC_code: "",
    });
    const [userData, setUserData] = useState();

    const getBankDetails = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod("/kyc/get_bank_accounts", headers);
        if (result.success) {
            if (result.data.length > 0) {
                setBanksData(result.data[0]);
            }
        } else {
            toast.show(result.message, {
                type: "danger",
            });
        }
    };

    const fetchUserDetails = async (userToken) => {
        let data = await fetchUserData(userToken);
        setUserData(data);
    };

    useEffect(() => {
        if (userToken) {
            getBankDetails();
            fetchUserDetails(userToken);
        }
    }, [userToken]);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("Home", { reload: "BANK_PREVIEW_PAGE" });
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    const handleBankEdit = () => {
        navigation.navigate("BankDetails", { action: "UPDATE", banksData });
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.loginContainer}>
                    <View style={styles.arrowContainer}>
                        <Ionicons
                            style={{ width: 45 }}
                            onPress={() => navigation.navigate("Home", { reload: "BANK_PREVIEW_PAGE" })}
                            name="arrow-back"
                            size={28}
                            color="white"
                        />
                        <Text style={{ color: "white", fontSize: 16, fontFamily: "RHD_600" }}>Bank Account</Text>
                    </View>
                    <Text style={styles.minisubtitle}>This bank account will be used for all your transactions.</Text>
                    <View style={styles.bankPreviewCard}>
                        <View style={styles.cardFirstRow}>
                            <Text style={{ color: "white", fontSize: 18 }}>Bank account</Text>
                            {userData ? (
                                <>
                                    {userData?.bank_verified_status === "verified" ? (
                                        <>
                                            {/* <TouchableOpacity
                                        onPress={handleBankEdit}
                                        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                                    >
                                        <EditIcon />
                                        <Text style={{ color: "#7479F1", marginLeft: 5 }}>Edit</Text>
                                    </TouchableOpacity> */}
                                        </>
                                    ) : (
                                        <View style={styles.bankSuccess}>
                                            <MaterialCommunityIcons name="progress-clock" size={22} color="#FF8B8B" />
                                            <Text style={{ color: "#FF8B8B", marginLeft: 5 }}>
                                                Verification in progress
                                            </Text>
                                        </View>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                        <View style={styles.bankAccountDetails}>
                            <View style={styles.dataRow}>
                                <Text style={styles.dataKey}>Account number</Text>
                                <Text style={styles.dataValue}>{banksData.benificary_acc_number}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.dataKey}>Holder Name</Text>
                                <Text style={styles.dataValue}>{banksData.benificary_name}</Text>
                            </View>
                            <View style={styles.dataRow}>
                                <Text style={styles.dataKey}>IFSC Code</Text>
                                <Text style={styles.dataValue}>{banksData.ISFC_code}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ position: "absolute", width: "100%", bottom: "6%", left: "5.5%" }}>
                        {newBankAdded ? (
                            <View style={styles.successCard}>
                                <View style={styles.bankSuccess}>
                                    <CheckCircleIcon />
                                    <Text style={styles.bsText}>
                                        Bank account {action === "UPDATE" ? "updated" : "added"} successfully
                                    </Text>
                                </View>
                                <Text style={styles.bsSubText}>
                                    Your bank account {action === "UPDATE" ? "updated" : "added"} successfully{" "}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                        <RiveraGradientBtn
                            outerCSS={styles.stepGradBtn}
                            onPressHandler={() => navigation.navigate("Home", { reload: "Bank Previre Page" })}
                            btnText="Return to home screen"
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default BankDetailsPreview;
