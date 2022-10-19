import React, { useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { AuthContext } from "../../authContext";
import { Ionicons } from '@expo/vector-icons';
import GreaterGreyIcon from '../../assets/greaterGreyIcon.svg';
import PrivacyIcon from '../../assets/privacy.svg';
import LockIcon from '../../assets/lock.svg';
import ListIcon from '../../assets/list.svg';

const About = ({ navigation }) => {
    let { userData, setIsLoggedIn } = useContext(AuthContext);

    const accountOptions = [
        {
            icon: <ListIcon />,
            text: 'Terms and conditions',
            action: 'TAC',
        },
        {
            icon: <PrivacyIcon />,
            text: 'Prvacy policy',
            action: 'PrivacyPolicy',
        },
        {
            icon: <LockIcon />,
            text: 'AML Policy',
            action: 'AMLPolicy',
        },
    ];

    const handleActions = (action) => {
        switch (action) {
            case 'TAC':
                navigation.navigate('AccountAbout');
                break;
            case 'PrivacyPolicy':
                navigation.navigate('AccountAbout');
                break;
            case 'AMLPolicy':
                navigation.navigate('AccountAbout');
        }
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'RHD_600' }}>About</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        {accountOptions.map((item, inx) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => handleActions(item.action)}
                                    key={`account_key_${inx}`}
                                    style={{ ...styles.rowCenter, justifyContent: 'space-between', marginBottom: 40 }}
                                >
                                    <View style={styles.iconTextWrapper}>
                                        <View style={styles.accountOptionIcon}>{item.icon}</View>
                                        <Text style={styles.text}>{item.text}</Text>
                                    </View>
                                    <GreaterGreyIcon />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default About;
