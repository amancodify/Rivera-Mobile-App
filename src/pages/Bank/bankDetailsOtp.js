import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';
import RiveraRadialBtn from '../../components/common/riveraRadialBtn';
import { executePostMethod } from '../../network/api';
import { setItem } from '../../utils/helper';
import { AuthContext } from "../../authContext";

const BankDetailsOtp = ({ route, navigation }) => {
    const [otp, setOtp] = useState(null);
    const [otpError, setOtpError] = useState('');
    let { mobile, newUser, deviceId, deviceType } = route.params;
    let { userData, setIsLoggedIn } = useContext(AuthContext);

    const handleClick = async () => {
        // if (otp) {
        //     let dataToSend = {
        //         phone_number: `+91${mobile}`,
        //         otp: otp,
        //         device_id: deviceId,
        //         device_type: deviceType,
        //     };
        //     let result = await executePostMethod('/login', dataToSend);
        //     if (result.data.authorization) {
        //         //set login
        //         setItem('userToken', result.data.authorization);
        //         setIsLoggedIn(true);
        //     } else {
        //         navigation.navigate('Referral', { mobile: mobile, deviceId: deviceId, deviceType: deviceType, otp: otp });
        //     }
        // } else {
        //     setOtpError('Otp required!');
        // }

        navigation.navigate('BankDetailsPreview');
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.loginContainer}>
                    <Ionicons style={{ width: 50 }} onPress={() => navigation.goBack()} name="arrow-back" size={30} color="white" />
                    <Text style={{...styles.title, paddingRight: 150 }}>Enter the OTP received via SMS</Text>
                    <View style={styles.otpDetailsContainer}>
                        <Text style={{...styles.subtitle, marginTop: 50}}>OTP sent to +91-{mobile}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={'#797682'}
                            placeholder="123456"
                            style={{ ...styles.inputTypeStyle, marginTop: 30 }}
                            keyboardType="phone-pad"
                            maxLength={6}
                            autoFocus={true}
                            onChangeText={(val) => {
                                setOtp(val);
                                setOtpError('');
                            }}
                        />
                        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : <></>}
                    </View>
                    <View style={styles.resendOtpContainer}>
                        <Text style={styles.otpSubTitle}>Didn’t get OTP?</Text>
                        <Text onPress={() => console.log('Resend OTP')} style={styles.otpSubTitle2}>
                            Resend in 59 seconds
                        </Text>
                    </View>
                    <View style={styles.ctaContainer}>
                        <RiveraRadialBtn progressPercentage={100} onPressHandler={handleClick} />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default BankDetailsOtp;
