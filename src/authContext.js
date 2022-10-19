import React, { createContext, useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Application from "expo-application";
import { Platform } from "react-native";
import { getItem, setItem, deleteItem } from "./utils/helper";
import { executeGetMethod } from "./network/api";
import * as NavigationBar from "expo-navigation-bar";
import { useToast } from "react-native-toast-notifications";
import * as Notifications from "expo-notifications";

export const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
    const toast = useToast();
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [deviceId, setDeviceId] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [userToken, setUserToken] = useState("");
    const [pushNotificationToken, setPushNotificationToken] = useState("");

    async function getIosId() {
        let id = await Application.getIosIdForVendorAsync();
        setDeviceId(id);
        return id;
    }

    useEffect(() => {
        let deviceTypeData = "";
        if (Platform.OS === "android") {
            let uniqueId = Application.androidId;
            deviceTypeData = `android-${Device.modelName.replace(/ /g, "")}`;
            setDeviceId(uniqueId);
            NavigationBar.setBackgroundColorAsync("#201A2E");
        } else if (Platform.OS === "ios") {
            getIosId();
            deviceTypeData = `ios-${Device.modelName.replace(/ /g, "")}`;
        }
        setDeviceType(deviceTypeData);
    }, []);

    const fetchUserData = async (userToken) => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };
        let result = await executeGetMethod("/common/get_user_details", headers);
        if (result.success && result.data) {
            setUserData(result.data);
            return result.data;
        } else {
            return null;
        }
    };

    const handleLogin = async (token) => {
        setUserToken(token);
        let fetchedUserData = await fetchUserData(token);
        if (fetchedUserData) {
            setIsLoggedIn(true);
            setUserData(fetchedUserData);
            await setItem("userToken", token);
        } else {
            await deleteItem("userToken");
        }
        if (isLoading) {
            setIsLoading(false);
        }
        return true;
    };

    const initiateLogin = async () => {
        setIsLoading(true);
        const token = await getItem("userToken");
        if (token && deviceId) {
            await handleLogin(token);
        } else {
            setIsLoading(false);
        }
        return token;
    };

    useEffect(() => {
        return initiateLogin();
    }, [deviceId]);

    const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setPushNotificationToken(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
    };

    // useEffect(() => {
    //     registerForPushNotificationsAsync();
    // }, [0]);

    return (
        <AuthContext.Provider
            {...props}
            value={{
                userData,
                userToken,
                isLoggedIn,
                setIsLoggedIn,
                isLoading,
                setIsLoading,
                deviceId,
                deviceType,
                fetchUserData,
                handleLogin,
                toast,
                pushNotificationToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
