import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RiveraRadialBtn = ({ outerCSS, innerCSS, onPressHandler, innerBtnDiameter = 60, progressPercentage = 0 }) => {
    let borderColorConfigs = {};
    if (Platform.OS === 'ios') {
        borderColorConfigs = {
            borderTopColor: progressPercentage > 0 ? '#7F67ED' : '#262A3D',
            borderRightColor: progressPercentage >= 50 ? '#7F67ED' : '#262A3D',
            borderBottomColor: progressPercentage >= 75 ? '#7F67ED' : '#262A3D',
            borderLeftColor: progressPercentage >= 100 ? '#7F67ED' : '#262A3D',
        };
    } else {
        borderColorConfigs = {
            borderColor: '#7F67ED'
        }
    }

    const styles = StyleSheet.create({
        outerContainer: {
            width: 80,
            height: 80,
            borderRadius: 50,
            borderWidth: 2,
            padding: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '45deg' }],
            ...borderColorConfigs,
            ...outerCSS,
        },
        innerContainer: {
            width: innerBtnDiameter,
            height: innerBtnDiameter,
            borderRadius: innerBtnDiameter / 2,
            borderColor: 'transparent',
            borderWidth: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '-45deg' }],
            ...innerCSS,
        },
    });
    return (
        <>
            <TouchableOpacity onPress={() => onPressHandler()}>
                <View style={styles.outerContainer}>
                    <LinearGradient start={[0.6, 0]} end={[0.1, 0]} colors={['#7F67ED', '#678FF7']} style={styles.innerContainer}>
                        <AntDesign name="arrowright" size={30} color="white" />
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default RiveraRadialBtn;
