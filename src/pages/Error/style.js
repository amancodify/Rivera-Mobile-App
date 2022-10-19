import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: "#201A2E",
        color: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    homeContainer: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: "#201A2E",
        fontFamily: "RHD_400",
        width: "100%",
    },
    rowCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    errorVectorContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    title: {
        color: "white",
        fontWeight: "700",
        marginTop: 12,
    },
    subTitle: {
        color: "white",
        textAlign: "center",
        marginTop: 20,
        fontSize: 12,
        paddingLeft: 30,
        paddingRight: 30,
    },

    cardStyle: {
        padding: 15,
        borderStyle: "solid",
        borderColor: "#797682",
        borderWidth: 1,
        marginTop: 60,
        position: 'relative'
    },
    cardFirstRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    linkCtaStyle: {
        color: '#7479F1',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    whatsAppVector: {
        position: 'absolute',
        right: 20,
        bottom: 40
    },
    ctaContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 50,
    },
});
