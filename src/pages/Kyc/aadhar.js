import React, { useContext, useState } from "react";
import KycPagesContainer from "./kycPagesContainer";
import PanAadharForm from "../../components/panAadharForm";
import { executePostMethod } from "../../network/api";
import { AuthContext } from "../../authContext";
import { getItem } from "../../utils/helper";

const Aadhar = ({ navigation }) => {
    let { deviceId, userToken, toast } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (aadharNumber) => {
        var adharcardTwelveDigit = /^\d{12}$/;
        let isValid = aadharNumber.match(adharcardTwelveDigit);
        if (isValid) {
            setIsLoading(true);
            //API call
            let dataToSend = {
                aadhar_number: aadharNumber,
            };
            const headers = {
                Authorization: await getItem("userToken"),
                "device-id": deviceId,
            };
            let result = await executePostMethod("/kyc/request_aadhar_verification", dataToSend, { headers: headers });
            if (result.success) {
                setIsLoading(false);
                if (result.data) {
                    navigation.navigate("AadharOtp", { aadharNumber: aadharNumber, requestId: result.data.requestId });
                }
            } else {
                toast.show(result.message, {
                    type: "danger",
                });
                setIsLoading(false);
            }
        } else {
            toast.show("Invalid Aadhar Number!", {
                type: "danger",
            });
        }
    };
    return (
        <KycPagesContainer formType="AADHAR" navigation={navigation}>
            <PanAadharForm
                title="Enter your Aadhar number"
                subTitle="To be securely matched  with the government records."
                inputPlaceHolder="1234567890123"
                linkCta="Don’t have Aadhar?"
                description=""
                formType="AADHAR"
                progressPercentage={50}
                onPressHandler={(val) => handleClick(val)}
                isLoading={isLoading}
            />
        </KycPagesContainer>
    );
};

export default Aadhar;
