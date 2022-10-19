import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: '#201A2E',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    introContainer: {
        paddingTop: 20,
        backgroundColor: '#201A2E',
        flex: 1,
        height: Dimensions.get('screen').height,
        fontFamily: 'RHD_400',
        display: 'flex',
        alignItems: 'center',
    },
    companyNameTitle: {
        color: '#55ADFF',
        fontSize: 27,
        fontFamily: 'RHD_900',
        letterSpacing: 2,
        marginTop: 40
    },
    introDisplay: {
        width: '90%',
        height: 280,
        borderRadius: 20,
        marginTop: 60
    },
    descriptionCont: {
        width: '100%',
        marginTop: 40,
        paddingLeft: 22,
        paddingRight: '25%'
    },
    description: {
        fontFamily: 'RHD_700',
        color: 'white',
        fontSize: 26,
    },
    btnContainer: {
        width: '90%',
        marginTop: 60
    }
});
