import React, { useContext, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../authContext";
import InviteVector from "../../assets/inviteGirlVector.svg";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import CopyIcon from "../../assets/copy.svg";
import { openWhatsApp, onShare } from "../../utils/helper";
import styles from "./style";

const Invite = ({ navigation }) => {
    let { userData } = useContext(AuthContext);
    const referralCode = userData?.invitation_code || "";

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView style={styles.homeContainer}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 20, fontFamily: "RHD_600" }}>Invite a Friend</Text>
                    </View>
                    <View style={{ ...styles.centralize, marginTop: 30, marginBottom: 100 }}>
                        <View style={styles.inviteVector}>
                            <InviteVector />
                        </View>
                        <Text style={{ ...styles.title20, marginTop: 40 }}>Earn upto $1000</Text>
                        <Text style={{ ...styles.subTitle, marginTop: 20, width: "80%", textAlign: "center" }}>
                            Invite a friend and get SHELL token worth $10 when they make a successful investment.
                        </Text>
                        <View style={styles.referalContainer}>
                            <Text style={{ ...styles.subTitle }}>Your Referral Code</Text>
                            <TouchableOpacity
                                onPress={() => Clipboard.setString(referralCode)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ marginRight: 5, color: "white", fontWeight: "700", marginLeft: 8 }}>{referralCode}</Text>
                                <CopyIcon />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", marginTop: 40 }}>
                            <RiveraGradientBtn
                                btnText="Invite via WhatsApp"
                                onPressHandler={async () => await openWhatsApp()}
                            />
                            <Button
                                contentStyle={{ height: 58 }}
                                mode="outlined"
                                color="white"
                                style={styles.investBtn}
                                onPress={async () =>
                                    await onShare(
                                        "",
                                        `Hi! Let's use Rivera Money for your crypto journey. Use this Refferral Code "${referralCode}" while installing the App and Earn`,
                                        "",
                                    )
                                }
                                uppercase={false}
                            >
                                Share with Friends
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Invite;
