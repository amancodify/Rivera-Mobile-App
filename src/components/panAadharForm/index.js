import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";
import RiveraRadialBtn from "../../components/common/riveraRadialBtn";

const PanAadharForm = ({
    title,
    subTitle,
    inputPlaceHolder,
    linkCta,
    description,
    formType,
    progressPercentage,
    onPressHandler,
    isLoading,
}) => {
    const [number, setNumber] = useState("");
    const [errorTxt, setErrorTxt] = useState("");

    const handleClick = () => {
        let regexExp = "";
        if (formType === "PAN") {
            regexExp = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        } else {
            regexExp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
        }
        // let isValid = regexExp.test(number);
        let isValid = true;
        if (!isValid) {
            let errTxt = formType === "PAN" ? "Invalid PAN!" : "Invalid Aadhar!";
            setErrorTxt(errTxt);
        } else {
            onPressHandler(number);
        }
    };

    return (
        <>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subTitle}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholderTextColor={"#797682"}
                        placeholder={inputPlaceHolder}
                        style={styles.inputTypeStyle}
                        maxLength={formType === "PAN" ? 10 : 12}
                        autoFocus={true}
                        autoCapitalize="characters"
                        onChangeText={(val) => {
                            setNumber(val);
                            setErrorTxt("");
                        }}
                    />
                    {errorTxt ? <Text style={styles.errorText}>{errorTxt}</Text> : <></>}
                </View>
                {description ? <Text style={styles.subtitle}>{description}</Text> : <></>}
                <Text style={styles.linkCta}>{linkCta}</Text>
                {isLoading ? (
                    <>
                        <View style={styles.ctaContainer}>
                            <Image style={{ width: 60, height: 60 }} source={require("../../assets/loading.gif")} />
                        </View>
                    </>
                ) : (
                    <View style={styles.ctaContainer}>
                        <RiveraRadialBtn progressPercentage={progressPercentage} onPressHandler={handleClick} />
                    </View>
                )}
            </View>
        </>
    );
};

export default PanAadharForm;
