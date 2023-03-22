import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';
import { APP_NAME, BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../Theme';

// Declares Constant
const NAVIGATION_MESSAGE = 'Get Started';

// Loads Image
const icon = require('../assets/icon.png');

// WelcomeScreen Component
export default function WelcomeScreen(props) {

    // Navigatess to tab component. Landing screen is CategoreiesScreen
    const handleNavigation = () => {
        props.navigation.navigate('Main');
    }

    // Renders WelcomeScreen
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>{APP_NAME}</Text>
            <Image style={styles.icon} source={icon}></Image>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleNavigation()}>
                    <Text style={styles.buttonText}>{NAVIGATION_MESSAGE}</Text>
                </Pressable>
            </View>
        </View>
    )
}

// Declares styleSheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR,
        flex: 1,
        alignItems: 'center',
    },
    appName: {
        paddingTop: 120,
        paddingBottom: 50,
        fontSize: 40,
        color: BACKGROUND_COLOR,
        fontFamily: 'Montserrat_500Medium',
    },
    icon: {
        paddingTop: 30,
        tintColor: SECONDARY_COLOR,
        height: 541 * 0.66,
        width: 221 * 0.66,
    },
    buttonContainer: {
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: BACKGROUND_COLOR,
        borderWidth: 3
    },
    buttonText: {
        color: BACKGROUND_COLOR,
        fontSize: 14,
        padding: 8,
        fontFamily: 'Montserrat_500Medium',
    },
})