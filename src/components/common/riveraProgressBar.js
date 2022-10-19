import React, { useState } from "react";
import { View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

const RiveraProgressBar = ({ color, progressVal, maxRange }) => {
    let convertedValue = 0;
    if (!progressVal || progressVal > maxRange || progressVal < 0) {
        convertedValue = 0;
        progressVal = 0;
    } else if (!maxRange || maxRange < 0) {
        maxRange = 0;
        progressVal = 0;
    } else {
        convertedValue = progressVal / maxRange;
    }

    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <ProgressBar style={{ width: 100, height: 11, borderRadius: 20 }} progress={convertedValue} color={color} />
            <Text style={{ marginLeft: 8, color: color }}>{progressVal}</Text>
        </View>
    );
};

export default RiveraProgressBar;
