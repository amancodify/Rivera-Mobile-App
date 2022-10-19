import React, { useState } from "react";
import { View } from "react-native";
import RiveraGradientBtn from "./riveraGradientBtn";
import { AntDesign } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button";

const Thumb = ({ swipped }) => {
    let rightArrowNode = <></>;
    if (swipped) {
        rightArrowNode = <AntDesign name="check" size={24} color="#8B55E9" />;
    } else {
        rightArrowNode = <AntDesign name="arrowright" size={24} color="white" />;
    }

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                backgroundColor: "blue",
                borderRadius: 15,
                margin: 4,
                height: 50,
            }}
        >
            {swipped ? (
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 15,
                        width: "100%",
                        height: 58,
                    }}
                    uppercase={false}
                >
                    {rightArrowNode}
                </View>
            ) : (
                <RiveraGradientBtn btnCSS={{}} onPressHandler={() => {}} btnIcon={rightArrowNode} btnHeight={50} />
            )}
        </View>
    );
};

const RiveraSwipeButton = (props) => {
    const [railPlaceholder, setRailPlaceholder] = useState("Slide to confirm");
    const [swipped, setSwipped] = useState(false);

    const handleSwipeSuccess = () => {
        setRailPlaceholder("Confirmed");
        setSwipped(true);
        props.onSuccessHandler();
    };

    return (
        <View>
            <SwipeButton
                title={railPlaceholder}
                titleColor="#FFFFFF"
                titleStyles={{ opacity: swipped ? 0.8 : 0.35 }}
                titleFontSize={16}
                containerStyles={{ borderRadius: 15, padding: 3 }}
                thumbIconComponent={() => <Thumb swipped={swipped} />}
                thumbIconStyles={{ borderRadius: 15 }}
                thumbIconBorderColor="#ffffff00"
                thumbIconWidth={66}
                railStyles={{ borderRadius: 15, maxWidth: "99.5%" }}
                railBackgroundColor="rgba(255,255,255,0.19)"
                railFillBackgroundColor="none"
                railFillBorderColor="none"
                onSwipeSuccess={handleSwipeSuccess}
                onSwipeFail={() => {
                    setRailPlaceholder("Slide to confirm");
                    setSwipped(false);
                }}
                swipeSuccessThreshold={65}
            />
        </View>
    );
};

export default RiveraSwipeButton;
