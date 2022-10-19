import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const InitialIcon = ({ initials, handleAction }) => {
    return (
        <TouchableOpacity
            onPress={() => handleAction()}
            style={{
                backgroundColor: "#201A2E",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                borderColor: "#3F3B48",
                borderWidth: 1.5,
                width: 42,
                height: 42,
            }}
        >
            {initials ? (
                <Text style={{ color: "#7679F3", fontSize: 16, fontWeight: '600' }}>{initials}</Text>
            ) : (
                <AntDesign name="user" size={22} color="white" />
            )}
        </TouchableOpacity>
    );
};

export default InitialIcon;
