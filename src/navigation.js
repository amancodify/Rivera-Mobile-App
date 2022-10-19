import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { AuthContextProvider, AuthContext } from "./authContext";
import SplashScreen from "./components/SplashScreen";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Intro from "./pages/Intro";
import Otp from "./pages/Otp";
import ReferralPage from "./pages/Referral";
import Home from "./pages/Home";
import PanPage from "./pages/Kyc/pan";
import PanOtp from "./pages/Kyc/panOtp";
import Aadhar from "./pages/Kyc/aadhar";
import AadharOtp from "./pages/Kyc/aadharOtp";
import BankDetails from "./pages/Bank/bankDetails";
import BankDetailsOtp from "./pages/Bank/bankDetailsOtp";
import BankDetailsPreview from "./pages/Bank/bankDetailsPreview";
import Account from "./pages/Account";
import AccountProfile from "./pages/Account/profile";
import AccountFaq from "./pages/Account/faq";
import AccountAbout from "./pages/Account/about";
import AccountInvite from "./pages/Account/invite";
import AccountPortfolio from "./pages/Account/portfolio";
import Deposit from "./pages/Deposit";
import InvestmetSelector from "./pages/Deposit/investmentSelector";
import InvestmetPreview from "./pages/Deposit/investmentPreview";
import PaymentConfirmation from "./pages/Deposit/paymentConfirmation";
import PaymentSuccess from "./pages/Deposit/paymentsSuccess";
import Withdraw from "./pages/Withdraw";
import WithdrawAmount from "./pages/Withdraw/withdrawAmount";
import WithdrawReason from "./pages/Withdraw/withdrawReason";
import WithdrawOtp from "./pages/Withdraw/withdrawOtp";
import WithdrawSummary from "./pages/Withdraw/withdrawSummary";
import Transactions from "./pages/Transactions";

function AppNavigation() {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator initialRouteName={"Intro"} screenOptions={{ headerShown: false }}>
            {!isLoggedIn && !isLoading ? (
                <>
                    <Stack.Screen name="Intro" component={Intro} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Otp" component={Otp} />
                    <Stack.Screen name="Referral" component={ReferralPage} />
                    <Stack.Screen name="Error" component={ErrorPage} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Pan" component={PanPage} />
                    <Stack.Screen name="PanOtp" component={PanOtp} />
                    <Stack.Screen name="Aadhar" component={Aadhar} />
                    <Stack.Screen name="AadharOtp" component={AadharOtp} />
                    <Stack.Screen name="BankDetails" component={BankDetails} />
                    <Stack.Screen name="BankDetailsOtp" component={BankDetailsOtp} />
                    <Stack.Screen name="BankDetailsPreview" component={BankDetailsPreview} />
                    <Stack.Screen name="Account" component={Account} />
                    <Stack.Screen name="AccountProfile" component={AccountProfile} />
                    <Stack.Screen name="AccountFaq" component={AccountFaq} />
                    <Stack.Screen name="AccountAbout" component={AccountAbout} />
                    <Stack.Screen name="AccountInvite" component={AccountInvite} />
                    <Stack.Screen name="AccountPortfolio" component={AccountPortfolio} />
                    <Stack.Screen name="Error" component={ErrorPage} />

                    <Stack.Screen name="Deposit" component={Deposit} />
                    <Stack.Screen name="InvestmetSelector" component={InvestmetSelector} />
                    <Stack.Screen name="InvestmetPreview" component={InvestmetPreview} />
                    <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
                    <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />

                    <Stack.Screen name="Withdraw" component={Withdraw} />
                    <Stack.Screen name="WithdrawAmount" component={WithdrawAmount} />
                    <Stack.Screen name="WithdrawReason" component={WithdrawReason} />
                    <Stack.Screen name="WithdrawOtp" component={WithdrawOtp} />
                    <Stack.Screen name="WithdrawSummary" component={WithdrawSummary} />
                    <Stack.Screen name="Transactions" component={Transactions} />
                </>
            )}
        </Stack.Navigator>
    );
}

const Navigation = () => {
    return (
        <AuthContextProvider>
            <AppNavigation />
        </AuthContextProvider>
    );
};

export default Navigation;
