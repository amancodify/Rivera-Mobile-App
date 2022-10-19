import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const RiveraAccordion = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    const styles = StyleSheet.create({
        accordionContainer: {
            color: 'white',
            padding: 0,
        },
    });

    return (
        <>
            <List.Accordion
                title={title}
                expanded={expanded}
                onPress={handlePress}
                style={styles.accordionContainer}
                titleStyle={styles.accordionContainer}
                theme={{ colors: { text: 'white' } }}
                titleNumberOfLines={2}
            >
                <View style={{ paddingLeft: 10, marginBottom: 10 }}>{children}</View>
            </List.Accordion>
        </>
    );
};

export default RiveraAccordion;
