import React, { useState, useContext } from "react";
import KycPagesContainer from "./kycPagesContainer";
import PanAadharOtp from "../../components/panAadharOtp";
import { executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import { getItem } from "../../utils/helper";

const AadharOtp = ({ route, navigation }) => {
    let { aadharNumber, requestId } = route.params;
    let { deviceId, userData, toast } = useContext(AuthContext);
    const [apiInProgress, setApiInProgress] = useState(false);
    const [aadharData, setAadhardata] = useState({});

    const onOtpClickHandler = async (otp) => {
        setApiInProgress(true);

        let dataToSend = {
            request_id: requestId,
            otp: otp,
        };
        const headers = {
            Authorization: await getItem("userToken"),
            "device-id": deviceId,
        };
        let result = await executePostMethod("/kyc/verify_aadhar", dataToSend, { headers: headers });
        if (result.success) {
            setApiInProgress(false);
            setAadhardata(result.data);
            return result.data;
        } else {
            setApiInProgress(false);
            toast.show(result.message, {
                type: "danger",
            });
        }

        return null;
    };

    const onConfirmClickHandler = () => {
        if (userData?.bank_verified) {
            navigation.navigate("Home", { reload: 'Aadhar otp page' });
        } else {
            navigation.navigate("BankDetails");
        }
    };

    return (
        <KycPagesContainer navigation={navigation}>
            <PanAadharOtp
                title="Enter the OTP received via SMS"
                subTitle="OTP sent to the mobile number linked with the Aadhar card. OTP may take up to 1 min. "
                linkCta="Facing Issue?"
                formType="AADHAR"
                progressPercentage={75}
                onOtpClickHandler={(otp) => onOtpClickHandler(otp)}
                onConfirmClickHandler={() => onConfirmClickHandler()}
                isLoading={apiInProgress}
                aadharData={aadharData}
            />
        </KycPagesContainer>
    );
};

export default AadharOtp;
