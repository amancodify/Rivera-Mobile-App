import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: '#201A2E',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    referralContainer: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#201A2E',
        flex: 1,
        height: Dimensions.get('screen').height,
        position: 'relative',
        fontFamily: 'RHD_400',
    },
    title: {
        color: 'white',
        marginTop: 30,
        fontSize: 30,
        paddingRight: '25%',
        fontFamily: 'RHD_700',
    },
    inputContainer: {
        position: 'relative',
        marginTop: 40,
        width: '90%',
    },
    inputLabel: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
    },
    inputTypeStyle: {
        backgroundColor: '#201A2E',
        color: 'white',
        fontSize: 20,
        fontFamily: 'RHD_600',
        letterSpacing: 2,
        width: '100%',
    },
    ctaContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '50%',
        position: 'absolute',
        bottom: -10,
    },
    errorText: {
        color: '#FF3333',
        marginTop: 10,
        fontSize: 15,
        position: 'absolute',
        top: 60
    }
});
