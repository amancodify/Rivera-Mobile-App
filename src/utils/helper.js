import * as SecureStore from "expo-secure-store";
import { Linking, Share } from "react-native";

export const setItem = async (key, value) => {
    let result = await SecureStore.setItemAsync(key, value).then;
    return result;
};

export const getItem = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
};

export const deleteItem = async (key) => {
    let result = await SecureStore.deleteItemAsync(key);
    return result;
};

export const getFormattedCurrency = (amount = 0, toFixedDigit = 0, currency = "USD") => {
    let data =
        `${currency === "USD" ? "$ " : "₹ "}` + amount?.toFixed(toFixedDigit).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return data;
};

export const getNameInitials = (name) => {
    let initials = "";
    if (name) {
        let parts = name.split(" ");
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== "") {
                initials += parts[i][0];
            }
        }
    }
    return initials.toUpperCase();
};

export const openWhatsApp = async (msg = "", mobile = "") => {
    let url = "http://api.whatsapp.com/send?text=Rivera Money\n\n";
    if (msg) {
        url = "http://api.whatsapp.com/send?text=Rivera Money\n\n" + msg;
    }

    if (mobile) {
        url = url + `&phone=91${mobile}`;
    }

    let canOpenWhatsApp = await Linking.canOpenURL("whatsapp://send");
    if (canOpenWhatsApp) {
        Linking.openURL(url)
            .then((data) => {})
            .catch((err) => {
                alert(err);
            });
    } else {
        alert("Make sure WhatsApp installed on your device");
    }
};

export const onShare = async (title = "", message = "", url = "") => {
    try {
        const result = await Share.share({
            message,
            title,
            url,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

export function numberWithCommas(n = 0) {
    return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const getPartialViewAccountNumber = (accNumber) => {
    let first4Digits = accNumber.toString().slice(0, 4);
    let last4Digits = accNumber.toString().slice(accNumber.length - 4, accNumber.length);

    return `${first4Digits}***********${last4Digits}`;
};
