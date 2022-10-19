import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: '#201A2E',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    loginContainer: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#201A2E',
        flex: 1,
        height: Dimensions.get('screen').height,
        position: 'relative',
        fontFamily: 'RHD_400'
    },
    title: {
        color: 'white',
        marginTop: 40,
        fontSize: 30,
        paddingRight: '25%',
        fontFamily: 'RHD_700',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        width: '90%',
        position: 'relative'
    },
    countryCodeLabel: {
        color: 'white',
        fontSize: 26,
        marginRight: 10,
        fontFamily: 'RHD_600',
    },
    inputTypeStyle: {
        backgroundColor: '#201A2E',
        color: 'white',
        fontSize: 26,
        fontFamily: 'RHD_600',
        letterSpacing: 2,
        width: '100%'
    },
    ctaContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 70
    },
    errorText: {
        color: '#FF3333',
        marginTop: 10,
        fontSize: 15,
        position: 'absolute',
        top: 30
    }
});
