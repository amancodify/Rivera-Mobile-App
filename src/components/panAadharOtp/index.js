import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import styles from "./style";
import RiveraRadialBtn from "../common/riveraRadialBtn";
import RiveraMoadl from "../../components/common/riveraModal";
import RiveraGradientBtn from "../common/riveraGradientBtn";

const PanAadharOtp = ({
    title,
    subTitle,
    linkCta,
    formType,
    progressPercentage,
    onOtpClickHandler,
    onConfirmClickHandler,
    isLoading,
}) => {
    const [otp, setOtp] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [aadharData, setAadhardata] = useState({});

    const handleOtpClick = async () => {
        if (otp) {
            setModalVisible(true);
            let result = await onOtpClickHandler(otp);
            if (result) {
                setAadhardata(result);
            }
        }
    };

    const getAadharAddress = (address) => {
        let { country, dist, loc, state, street, landmark } = address || {
            country: "",
            dist: "",
            loc: "",
            state: "",
            street: "",
            landmark: "",
        };
        let fullAddress = `${loc}, ${street}, ${landmark}, ${dist}, ${state}, ${country}`;
        return fullAddress;
    };

    const ModalContent = () => {
        return (
            <>
                {isLoading ? (
                    <View style={styles.modalLoadingContainer}>
                        <Image
                            source={require("../../assets/loading.gif")}
                            style={{ height: 80, width: 80 }}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                        <Text style={styles.loadingText}>
                            Fetching your {formType} details from the government deatabae
                        </Text>
                    </View>
                ) : (
                    <View>
                        {formType === "PAN" ? (
                            <>
                                <Text style={styles.detailsTitle}>Provided PAN is of person</Text>
                                <View style={styles.panDetails}>
                                    <Text style={styles.panTitle}>Full name</Text>
                                    <Text style={styles.panName}>AMAN RAJ</Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.detailsTitle}>Confirm yout Aadhar details</Text>
                                <Text style={{ ...styles.panTitle, marginTop: 10 }}>
                                    Please confirm if the following details fetched from the government records belong
                                    to you
                                </Text>
                                <View style={styles.panDetails}>
                                    <Text style={styles.panTitle}>Full name</Text>
                                    <Text style={styles.panName}>{aadharData?.full_name || ""}</Text>
                                </View>
                                <View style={styles.panDetails}>
                                    <Text style={styles.panTitle}>Date of birth</Text>
                                    <Text style={styles.panName}>{aadharData?.dob || ""}</Text>
                                </View>
                                <View style={styles.panDetails}>
                                    <Text style={styles.panTitle}>Address</Text>
                                    <Text style={styles.panName}>{getAadharAddress(aadharData?.address)}</Text>
                                </View>
                            </>
                        )}
                        <RiveraGradientBtn
                            outerCSS={formType === "PAN" ? styles.modalCtaPan : styles.modalCtaAadhar}
                            onPressHandler={() => {
                                onConfirmClickHandler();
                                setModalVisible(false);
                            }}
                            btnText="I Confirm"
                        />
                    </View>
                )}
            </>
        );
    };

    return (
        <>
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.otpDetailsContainer}>
                    <Text style={styles.subtitle}>{subTitle}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholderTextColor={"#797682"}
                        placeholder="123456"
                        style={styles.inputTypeStyle}
                        keyboardType="phone-pad"
                        maxLength={6}
                        autoFocus={true}
                        onChangeText={(val) => {
                            setOtp(val);
                            setErrorTxt("");
                        }}
                    />
                    {errorTxt ? <Text style={styles.errorText}>{errorTxt}</Text> : <></>}
                </View>
                <View style={styles.resendOtpContainer}>
                    <Text onPress={() => console.log("Resend OTP")} style={styles.otpSubTitle2}>
                        {linkCta}
                    </Text>
                </View>
                <View style={styles.ctaContainer}>
                    <RiveraRadialBtn progressPercentage={progressPercentage} onPressHandler={() => handleOtpClick()} />
                </View>
            </View>
            {modalVisible ? (
                <RiveraMoadl
                    setModalVisible={(val) => setModalVisible(val)}
                    modalVisible={modalVisible}
                    modalHeight={formType === "AADHAR" ? "68%" : "50%"}
                    modalContainerPadding={20}
                    children={
                        <>
                            <ModalContent />
                        </>
                    }
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default PanAadharOtp;
