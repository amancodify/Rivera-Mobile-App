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
        fontFamily: 'RHD_400',
    },
    resendOtpContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
    },
    otpSubTitle: {
        color: '#797682',
        fontSize: 12,
    },
    otpSubTitle2: {
        color: '#7479F1',
        fontSize: 12,
        marginLeft: 10,
    },
    title: {
        color: 'white',
        marginTop: 40,
        fontSize: 24,
        paddingRight: '10%',
        fontFamily: 'RHD_700',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: '90%',
        position: 'relative',
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
        fontSize: 20,
        fontFamily: 'RHD_600',
        letterSpacing: 2,
        width: '100%',
    },
    ctaContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 70,
    },
    errorText: {
        color: '#FF3333',
        marginTop: 10,
        fontSize: 15,
        position: 'absolute',
        top: 30,
    },
    subtitle: {
        color: '#797682',
        fontSize: 12,
        marginTop: 20,
        paddingRight: 50
    },
    minisubtitle: {
        color: '#797682',
        fontSize: 12,
        marginTop: 40,
    },
    arrowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bankPreviewCard: {
        padding: 11,
        backgroundColor: '#ffffff0d',
        borderStyle: 'solid',
        borderColor: '#797682',        
        borderWidth: 1,
        paddingBottom: 30,
        marginTop: 30
    },
    cardFirstRow: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bankAccountDetails: {
        marginTop: 40
    }, 
    dataRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    dataKey: {
        color: '#797682'
    },
    dataValue: {
        color: 'white',
        fontFamily: 'RHD_700',
        letterSpacing: 0.5
    },
    successCard: {
        padding: 11,
        backgroundColor: '#99cf8429',
        borderStyle: 'solid',
        borderColor: '#99CF84',        
        borderWidth: 1,
        marginBottom: 60,
        borderRadius: 11,
        paddingBottom: 20,
        paddingTop: 20,
    },
    bankSuccess: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bsText: {
        color: '#99CF84',
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '700'
    },
    bsSubText: {
        color: '#ffffff8c',
        marginLeft: 35,
        marginTop: 10,
        fontSize: 12
    }
});
