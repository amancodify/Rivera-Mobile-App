import React, { useState } from 'react';
import KycPagesContainer from './kycPagesContainer';
import PanAadharOtp from '../../components/panAadharOtp';

const PanOtp = ({ route, navigation }) => {
    let { panNumber } = route.params;
    const [apiInProgress, setApiInProgress] = useState(false);

    const onOtpClickHandler = (otp) => {
        setApiInProgress(true);
        setTimeout(() => {
            setApiInProgress(false);
        }, 3000);
    };

    const onConfirmClickHandler = () => {
        navigation.navigate('Aadhar');
    };

    return (
        <KycPagesContainer navigation={navigation}>
            <PanAadharOtp
                title="Enter the OTP received via SMS"
                subTitle="OTP sent to the mobile number linked with the Pan card. OTP may take up to 1 min. "
                linkCta="Facing Issue?"
                formType="PAN"
                progressPercentage={25}
                onOtpClickHandler={(otp) => onOtpClickHandler(otp)}
                onConfirmClickHandler={() => onConfirmClickHandler()}
                isLoading={apiInProgress}
            />
        </KycPagesContainer>
    );
};

export default PanOtp;
