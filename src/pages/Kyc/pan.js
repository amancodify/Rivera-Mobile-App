import React, { useContext, useState } from 'react';
import KycPagesContainer from './kycPagesContainer';
import { Text, View, Image } from 'react-native';
import PanAadharForm from '../../components/panAadharForm';
import { executePostMethod } from '../../network/api';
import { AuthContext } from "../../authContext";
import styles from '../../components/panAadharOtp/style';
import RiveraMoadl from '../../components/common/riveraModal';
import RiveraGradientBtn from '../../components/common/riveraGradientBtn';
import { getItem } from '../../utils/helper';

const Pan = ({ navigation }) => {
    let { deviceId, toast } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [panData, setPanData] = useState({ name: '' });

    const handleClick = async (panNumber) => {
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        let isValid = regex.test(panNumber);
        if(isValid){
            setIsLoading(true);
            setModalVisible(true);
            //API call
            let dataToSend = {
                pan_id: panNumber,
            };
            const headers = {
                Authorization: await getItem('userToken'),
                'device-id': deviceId,
            };
            let result = await executePostMethod('/kyc/fetch_pan', dataToSend, { headers: headers });
            if (result.success) {
                setPanData(result.data);
                setIsLoading(false);
            } else {
                toast.show(result.message, {
                    type: "danger",
                });
                setIsLoading(false);
                setModalVisible(false);
            }
        } else {
            toast.show("Invalid PAN!", {
                type: "danger",
            });
        }
    };

    const onConfirmClickHandler = () => {
        navigation.navigate('Aadhar');
    };

    const ModalContent = () => {
        return (
            <>
                {isLoading ? (
                    <View style={styles.modalLoadingContainer}>
                        <Image
                            source={require('../../assets/loading.gif')}
                            style={{ height: 80, width: 80 }}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                        <Text style={styles.loadingText}>Fetching your PAN details from the government deatabae</Text>
                    </View>
                ) : (
                    <View>
                        <>
                            <Text style={styles.detailsTitle}>Provided PAN is of person</Text>
                            <View style={styles.panDetails}>
                                <Text style={styles.panTitle}>Full name</Text>
                                <Text style={styles.panName}>{panData.name}</Text>
                            </View>
                        </>
                        <Text style={{ color: 'red', textAlign: 'center' }}>{errMsg}</Text>
                        <RiveraGradientBtn
                            outerCSS={styles.modalCtaPan}
                            onPressHandler={() => {
                                onConfirmClickHandler();
                                setModalVisible(false);
                            }}
                            btnText="I Confirm"
                        />
                    </View>
                )}
            </>
        );
    };

    return (
        <KycPagesContainer navigation={navigation} formType="PAN">
            <PanAadharForm
                title="Enter your PAN"
                subTitle="To be securely matched  with the government records."
                inputPlaceHolder="ABCD1234Z"
                linkCta="Not an Indian citizen?"
                description=""
                formType="PAN"
                progressPercentage={25}
                onPressHandler={(val) => handleClick(val)}
                isLoading={isLoading}
            />
            {modalVisible ? (
                <RiveraMoadl
                    setModalVisible={(val) => setModalVisible(val)}
                    modalVisible={modalVisible}
                    modalHeight={'60%'}
                    modalContainerPadding={20}
                    children={
                        <>
                            <ModalContent />
                        </>
                    }
                />
            ) : (
                <></>
            )}
        </KycPagesContainer>
    );
};

export default Pan;
