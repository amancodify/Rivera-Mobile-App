import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
    title: {
        color: 'white',
        marginTop: 30,
        fontSize: 30,
        paddingRight: '25%',
        fontFamily: 'RHD_700',
    },
    detailsTitle: {
        color: 'white',
        fontSize: 24,
        paddingRight: '25%',
        fontWeight: '700'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        width: '90%',
        position: 'relative',
    },
    inputTypeStyle: {
        backgroundColor: '#201A2E',
        color: 'white',
        fontSize: 26,
        fontFamily: 'RHD_600',
        letterSpacing: 2,
        width: '100%',
    },
    ctaContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 30,
    },
    otpDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    subtitle: {
        color: '#797682',
        fontSize: 16,
    },
    subtitle2: {
        color: '#7479F1',
        fontSize: 16,
        marginLeft: 10,
    },
    resendOtpContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    otpSubTitle: {
        color: '#797682',
        fontSize: 16,
    },
    otpSubTitle2: {
        color: '#7479F1',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: '#FF3333',
        marginTop: 10,
        fontSize: 15,
        position: 'absolute',
        top: 30,
    },
    modalLoadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'RHD_700',
        marginTop: 80,
        textAlign: 'center',
        width: 300
    },
    modalCtaPan: {
        position: 'absolute',
        bottom: '-140%'
    },
    modalCtaAadhar: {
        position: 'absolute',
        bottom: '-28%'
    },
    panDetails: {
        marginTop: 30
    },
    panTitle: {
        fontSize: 12,
        color: '#797682'
    },
    panName: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 5
    }
});
