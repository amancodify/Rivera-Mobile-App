import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: '#201A2E',
        color: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    homeContainer: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 100,
        backgroundColor: '#201A2E',
        flex: 1,
        height: Dimensions.get('screen').height,
        fontFamily: 'RHD_400',
    },
    accTranContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#3F3B48',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    tranText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    kycContainer: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff0f',
        borderWidth: 1,
        borderColor: '#797682',
        marginTop: 50,
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '88%',
    },
    kycDescContainer: {
        width: '65%',
    },
    kycTitle: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'RHD_700',
        marginBottom: 5,
    },
    kycDesc: {
        fontSize: 10,
        color: 'white',
        lineHeight: 13,
    },
    amountDispContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        width: '100%'
    },
    amtDisplay: {
        backgroundColor: '#A528DD',
        borderRadius: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        padding: 20,
    },
    descTxt: {
        color: 'white',
        fontSize: 16,
        marginBottom: 15,
    },
    amountTxt: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'RHD_700',
        marginBottom: 15,
    },
    usdtTxt: {
        color: 'white',
        opacity: 0.3,
        fontSize: 16,
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    investBtn: {
        width: '100%',
        marginTop: 40,
        borderRadius: 12,
        height: 47,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    introDisplay: {
        position: 'relative',
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 20,
        marginTop: 30,
    },
    makeCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'RHD_700',
    },
    subtitle: {
        fontSize: 12,
        lineHeight: 16,
        color: 'white',
        marginTop: 20,
        width: '85%',
    },
    linkCta: {
        color: '#7479F1',
        fontSize: 12,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
    whatsappIcon: {
        opacity: 0.27,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    footer: {
        marginTop: 40,
        marginBottom: 80,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    coinsImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 0,
        right: 0
    },
    portfolioHoldingsContainer: {
        backgroundColor: "#262A3D",
        borderRadius: 25,
        marginTop: 40
    },
    phImageBg: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    amt2Display: {
        width: '100%',
        height: 125,
    },
    phMain: {
        padding: 20,
        position: 'relative'
    },
    arrowRightIcon: {
        position: 'absolute',
        top: 45,
        right: 20
    },
    phDescContainer: {
        padding: 20
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    phMainTitle: {
        color: '#FFFFFF',
        fontSize: 14
    },
    phMainAmount: {
        color: '#FFFFFF',
        fontSize: 26,
        fontFamily: 'RHD_700',
        marginTop: 10,

    },
    amtPercent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 15
    },
    returnAmount: {
        color: "#99CF84",
        fontSize: 16,
        fontFamily: 'RHD_600'
    },
    returnPercent: {
        color: "#99CF84",
        marginLeft: 5,
        fontSize: 13
    },
    phDesc: {
        color: '#61667D',
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        padding: 20
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    transBtn: {
        width: '48%',
        height: 57,
        display: 'flex',
        justifyContent: 'center',
    },
    transBtnContent: {
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
    },
    
});
