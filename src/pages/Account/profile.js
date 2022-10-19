import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styles from "./style";
import { getItem, deleteItem } from "../../utils/helper";
import { AuthContext } from "../../authContext";
import { Ionicons } from "@expo/vector-icons";
import EditIcon from "../../assets/edit.svg";
import TrashIcon from "../../assets/trash2.svg";
import TrashPinkIcon from "../../assets/pinktrash.svg";
import LogoutIcon from "../../assets/logout.svg";
import LogoutIconPink from "../../assets/pinklogout.svg";
import RiveraMoadl from "../../components/common/riveraModal";
import RiveraGradientBtn from "../../components/common/riveraGradientBtn";
import { executeGetMethod } from "../../network/api";
import { Facebook } from "react-content-loader/native";
const MyFacebookLoader = () => <Facebook width={"150%"} backgroundColor={"gray"} />;

const AccountProfile = ({ navigation }) => {
    let { setIsLoggedIn, deviceId, fetchUserData, userToken } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalView, setModalView] = useState("DELETE");
    const [userData, setUserData] = useState();

    const handleLogout = () => {
        deleteItem("userToken");
        setIsLoggedIn(false);
    };

    const deactivateAccount = async () => {
        const headers = {
            Authorization: userToken,
            "device-id": deviceId,
        };

        let result = await executeGetMethod("/common/deactivate", headers);
        if (result.success) {
            handleLogout();
        } else {
            alert(result.message);
        }
    };

    const handleModalView = (view) => {
        setModalView(view);
        setModalVisible(true);
    };

    const getUserData = async () => {
        let token = await getItem("userToken");
        let result = await fetchUserData(token);
        if (result?.email) {
            let data = {
                name: result.aadhar_name,
                email: result.email,
                phone: result.phone_number,
            };
            setUserData(data);
        }
    };

    useEffect(() => {
        getUserData();
    }, [deviceId]);

    const getModalView = () => {
        let modalViewNode = <></>;
        switch (modalView) {
            case "DELETE":
                modalViewNode = (
                    <View>
                        <TrashPinkIcon />
                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, width: "70%", fontWeight: "700" }}>
                            Do you wish to permanently delete your Rivera account?
                        </Text>
                        <Text style={styles.subTitle2}>
                            To proceed with account deletion, please write to us at support@rivera.money and our team
                            will take this forward.
                        </Text>
                        <View style={{ ...styles.btnPosition, ...styles.btnsContainer }}>
                            <TouchableOpacity style={styles.transBtn}>
                                <Button
                                    contentStyle={{ height: 57 }}
                                    style={styles.transBtnContent}
                                    mode="outlined"
                                    color="white"
                                    uppercase={false}
                                    onPress={() => deactivateAccount()}
                                >
                                    Delete
                                </Button>
                            </TouchableOpacity>
                            <RiveraGradientBtn
                                onPressHandler={() => setModalVisible(false)}
                                outerCSS={styles.stepGradBtn}
                                btnText="Go Back"
                            />
                        </View>
                    </View>
                );
                break;
            case "EDIT":
                modalViewNode = (
                    <View>
                        <TrashPinkIcon />
                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, width: "85%", fontWeight: "700" }}>
                            Do you wish to permanently delete your Rivera account?
                        </Text>
                        <Text style={styles.subTitle2}>
                            To proceed with account deletion, please write to us at support@rivera.money and our team
                            will take this forward.
                        </Text>
                        <RiveraGradientBtn
                            onPressHandler={() => setModalVisible(false)}
                            outerCSS={{ marginTop: 50 }}
                            btnText="Edit"
                        />
                    </View>
                );
                break;
            case "LOGOUT":
                modalViewNode = (
                    <View>
                        <LogoutIconPink />
                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, width: "70%", fontWeight: "700" }}>
                            Please confirm if you want to logout
                        </Text>
                        <View style={{ ...styles.btnPosition, ...styles.btnsContainer }}>
                            <TouchableOpacity style={styles.transBtn}>
                                <Button
                                    contentStyle={{ height: 57 }}
                                    style={styles.transBtnContent}
                                    mode="outlined"
                                    color="white"
                                    uppercase={false}
                                    onPress={() => handleLogout()}
                                >
                                    Logout
                                </Button>
                            </TouchableOpacity>
                            <RiveraGradientBtn
                                onPressHandler={() => setModalVisible(false)}
                                outerCSS={styles.stepGradBtn}
                                btnText="Go Back"
                            />
                        </View>
                    </View>
                );
                break;
        }

        return modalViewNode;
    };

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 20, fontFamily: "RHD_600" }}>Profile</Text>
                    </View>
                    {userData ? (
                        <View style={styles.bankPreviewCard}>
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.rowStretched}>
                                    <Text style={styles.subTitle}>Name</Text>
                                    {/* <TouchableOpacity style={styles.profileEditCta} onPress={() => handleModalView("EDIT")}>
                                    <EditIcon />
                                    <Text style={{ color: "#7479F1", marginLeft: 5 }}>Edit</Text>
                                </TouchableOpacity> */}
                                </View>
                                <Text style={styles.title}>{userData.name}</Text>
                            </View>
                            <View style={{ marginTop: 40 }}>
                                <Text style={styles.subTitle}>Phone</Text>
                                <Text style={styles.title}>{userData.phone}</Text>
                            </View>
                            <View style={{ marginTop: 40 }}>
                                <Text style={styles.subTitle}>Email</Text>
                                <Text style={styles.title}>{userData.email}</Text>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={{ padding: 20, width: "80%" }}>
                                <MyFacebookLoader />
                                <MyFacebookLoader />
                                <MyFacebookLoader />
                            </View>
                        </>
                    )}

                    <View style={styles.profileActionsContainer}>
                        <TouchableOpacity style={styles.rowCenter} onPress={() => handleModalView("LOGOUT")}>
                            <LogoutIcon />
                            <Text style={{ ...styles.subTitle, fontSize: 12, marginLeft: 10 }}>Logout from Rivera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.rowCenter, marginTop: 20 }}
                            onPress={() => handleModalView("DELETE")}
                        >
                            <TrashIcon />
                            <Text style={{ ...styles.subTitle, fontSize: 12, marginLeft: 10 }}>
                                Delete Rivera account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {modalVisible ? (
                        <RiveraMoadl
                            setModalVisible={(val) => setModalVisible(val)}
                            modalVisible={modalVisible}
                            modalContainerPadding={20}
                            modalHeight={modalView === "LOGOUT" ? "36%" : "45%"}
                            children={getModalView()}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};

export default AccountProfile;
