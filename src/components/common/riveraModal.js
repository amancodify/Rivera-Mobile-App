import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RiveraMoadl = ({ modalVisible, setModalVisible, children, modalHeight, modalContainerPadding }) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            position: 'relative'
        },
        modalView: {
            margin: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderRadius: 20,
            padding: modalContainerPadding ? modalContainerPadding : 35,
            paddingTop: 20,
            width: '100%',
            height: modalHeight ? modalHeight : '50%',
            position: 'absolute',
            bottom: -10,
        },
    });

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <LinearGradient style={styles.modalView} colors={['#8B78ED', '#262A3D']} start={[2.2, 0]} end={[0.4, 1]}>
                        {/* <Button onPress={() => setModalVisible(false)}>
                            <Text> Hide Modal</Text>
                        </Button> */}
                        {children}
                    </LinearGradient>
                </View>
            </Modal>
        </>
    );
};

export default RiveraMoadl;
