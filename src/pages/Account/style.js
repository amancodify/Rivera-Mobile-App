import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";

export default StyleSheet.create({
    AndriodSafeArea: {
        flex: 1,
        backgroundColor: "#201A2E",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    homeContainer: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 100,
        backgroundColor: "#201A2E",
        flex: 1,
        fontFamily: "RHD_400",
        position: "relative",
    },
    pfBtnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
        marginBottom: 10
    },
    centralize: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    rowCenter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    rowStretched: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    optionsContainer: {
        marginTop: 70,
    },
    iconTextWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    accountOptionIcon: {
        width: 20,
    },
    text: {
        marginLeft: 20,
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
    bankPreviewCard: {
        padding: 11,
        backgroundColor: "#ffffff0d",
        borderStyle: "solid",
        borderColor: "#797682",
        borderWidth: 1,
        paddingBottom: 30,
        marginTop: 73,
        position: "relative",
    },
    profileEditCta: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontWeight: "700",
        marginTop: 12,
    },
    titleGreen: {
        fontWeight: "700",
        marginTop: 12,
        color: "#99CF84",
    },
    title20: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    },
    subTitle: {
        color: "#797682",
    },
    subTitle2: {
        color: "#A9A9A9",
        marginTop: 10,
        width: "85%",
    },
    faqSubtitle: {
        color: "#827F8A",
        fontSize: 12,
        width: "90%",
    },
    profileActionsContainer: {
        position: "absolute",
        bottom: "10%",
        left: 20,
    },
    btnPosition: {
        marginTop: 40,
    },
    btnsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    transBtn: {
        width: "48%",
        height: 57,
        display: "flex",
        justifyContent: "center",
    },
    transBtnContent: {
        borderColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#797682",
    },
    stepGradBtn: {
        width: "48%",
    },
    faqTitlePink: {
        color: "#A528DD",
        fontWeight: "500",
    },
    divider: {
        backgroundColor: "white",
        marginTop: 10,
    },
    accordionContainer: {
        color: "white",
        padding: 0,
        margin: 0,
    },
    inviteVector: {
        paddingRight: 40,
    },
    investBtn: {
        width: "100%",
        marginTop: 20,
        borderRadius: 12,
        height: 58,
        display: "flex",
        justifyContent: "center",
        borderColor: "white",
    },
    referalContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
    },
    portfolioCard: {
        padding: 15,
        backgroundColor: "#ffffff0d",
        borderStyle: "solid",
        borderColor: "#797682",
        borderWidth: 1,
        paddingBottom: 30,
        marginTop: 40,
        position: "relative",
        borderRadius: 15,
        minHeight: 250,
    },
    portfolioText1: {
        marginLeft: 30,
        fontSize: 18,
        color: "white",
        fontWeight: "700"
    },
    pfColumnContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
    },
    pfRowContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
