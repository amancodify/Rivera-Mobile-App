import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-paper";

const RiveraGradientBtn = ({
    outerCSS,
    btnCSS,
    disabled = false,
    onPressHandler,
    btnText = "",
    btnIcon,
    btnHeight = 58,
}) => {
    const styles = StyleSheet.create({
        riveraGradientBtnContiner: {
            width: "100%",
            minHeight: btnHeight,
            borderRadius: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        riveraGradientBtn: {
            fontFamily: "RHD_600",
            color: disabled ? "black" : "white",
            fontSize: 16,
            ...btnCSS,
        },
        btnOuterCss: {
            width: "100%",
            ...outerCSS,
        },
    });

    let gradientColors = disabled ? ["#9B9B9B", "#9B9B9B"] : ["#55ADFF", "#A528DD"];
    return (
        <>
            <TouchableOpacity disabled={disabled} style={styles.btnOuterCss} onPress={() => onPressHandler()}>
                <View>
                    <LinearGradient
                        colors={gradientColors}
                        start={[0, 1]}
                        end={[1, 0]}
                        style={styles.riveraGradientBtnContiner}
                    >
                        {btnIcon ? btnIcon : <Text style={styles.riveraGradientBtn}>{btnText}</Text>}
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default RiveraGradientBtn;
