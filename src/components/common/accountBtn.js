import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AccountBtn = ({ btnCSS, onPressHandler, btnText = '' }) => {
    const styles = StyleSheet.create({
        accountBtnContainer: {
            width: 45,
            height: 45,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            borderWidth: 2,
            borderColor: '#3F3B48',
            ...btnCSS
        },
    });
    return (
        <>
            <TouchableOpacity style={styles.accountBtnContainer} onPress={() => onPressHandler()}>
                <AntDesign name="user" size={22} color="white" />
            </TouchableOpacity>
        </>
    );
};

export default AccountBtn;
