import React from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, withTheme, Button } from "react-native-paper";
import styles from "./style";
import ErrorVector from "../../assets/error-vector.svg";
import { Ionicons } from "@expo/vector-icons";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import { openWhatsApp } from "../../utils/helper";

const ErrorPage = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <ScrollView>
                    <View style={styles.homeContainer}>
                        <View style={styles.rowCenter}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.errorVectorContainer}>
                            <ErrorVector />
                        </View>
                        <Text style={{ ...styles.title, textAlign: "center", marginTop: 40, fontSize: 18 }}>Error</Text>
                        <Text style={styles.subTitle}>
                            Opps. Something went wrong during the application process. Please contact our team or try
                            again later.
                        </Text>

                        <View style={styles.cardStyle}>
                            <Text style={{ ...styles.title, fontSize: 18 }}>WhatsApp Support</Text>
                            <Text style={{ color: "white", fontSize: 12, width: "75%", marginTop: 15 }}>
                                Message the team on WhatsApp or read our FAQ’s if you’ve any questions.
                            </Text>
                            <TouchableOpacity onPress={async () => await openWhatsApp("", "")}>
                                <Text style={{ ...styles.linkCtaStyle, fontSize: 12, marginTop: 35, marginBottom: 35 }}>
                                    WhatsApp Support
                                </Text>
                            </TouchableOpacity>
                            <Ionicons name="md-logo-whatsapp" size={70} color="gray" style={styles.whatsAppVector} />
                        </View>

                        <View style={styles.ctaContainer}>
                            <RiveraGradientBtn
                                outerCSS={styles.stepGradBtn}
                                onPressHandler={() => navigation.navigate("Home")}
                                btnText="Return to home screen"
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default ErrorPage;
