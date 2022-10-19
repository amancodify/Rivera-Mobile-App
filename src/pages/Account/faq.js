import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { AuthContext } from "../../authContext";
import RiveraAccordion from '../../components/common/riveraAccordion';

const AccountFaq = ({ navigation }) => {
    const faqData = [
        {
            title: 'What is Rivera?',
            content: (
                <Text style={styles.faqSubtitle}>
                    Rivera is a global crypto investment app, which goes beyond just buying and selling coins to offer a range of passive investment
                    system
                </Text>
            ),
        },
        {
            title: 'Whao are the team members at Rivera?',
            content: (
                <Text style={styles.faqSubtitle}>
                    Rivera is a global crypto investment app, which goes beyond just buying and selling coins to offer a range of passive investment
                    system
                </Text>
            ),
        },
        {
            title: 'In which country does Rivera operate?',
            content: (
                <Text style={styles.faqSubtitle}>
                    Rivera is a global crypto investment app, which goes beyond just buying and selling coins to offer a range of passive investment
                    system
                </Text>
            ),
        },
        {
            title: 'How does Rivera make money without charging fees?',
            content: (
                <Text style={styles.faqSubtitle}>
                    Rivera is a global crypto investment app, which goes beyond just buying and selling coins to offer a range of passive investment
                    system
                </Text>
            ),
        },
    ];

    return (
        <>
            <SafeAreaView style={styles.AndriodSafeArea}>
                <View style={styles.homeContainer}>
                    <View style={styles.rowCenter}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons style={{ width: 45 }} name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'RHD_600' }}>FAQ</Text>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={styles.faqTitlePink}>About Rivera</Text>
                        <Divider style={styles.divider} />
                    </View>
                    <View>
                        <List.Section>
                            {faqData.map((item, inx) => {
                                return <RiveraAccordion key={`faqlist_${inx}`} title={item.title} children={item.content} />;
                            })}
                        </List.Section>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default AccountFaq;
