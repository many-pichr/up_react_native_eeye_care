import React, { Component } from 'react';
import {
    View, StyleSheet, Text, ActivityIndicator,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Screens from '../commons/constants/Screens';

class StartScreen extends Component {

    componentDidMount() {
        this.checkLoginStatus()
    }

    checkLoginStatus = async () => {
        /**
         * Validate previous login session
         */
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                // TODO: Validate user, and password (can be token) against server
                this.navigate(Screens.main.HomeScreen);
            }
            else {
                setTimeout(() => {
                    this.navigate(Screens.auth.LoginScreen);
                    // this.navigate(Screens.main.HomeScreen);
                }, 1000);
            }
        }
        catch (error) {
            this.navigateToLogin();
            console.log('Keychain couldn\'t be accessed!', error);
        }
    }

    navigate = (screenName) => {
        this.props.navigation.navigate(screenName)
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator animating />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default StartScreen;
