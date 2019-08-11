import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from 'react-native-animatable';
import * as Keychain from 'react-native-keychain';
import Screens from '../../commons/constants/Screens';

class SettingScreen extends Component {

    logout = () => {
        Keychain.resetGenericPassword();
        this.props.navigation.navigate(Screens.auth.LoginScreen);
    }

    render() {
        return (
            <View>
                <Text>Setting Screen</Text>
                <Button onPress={this.logout} title="Logout now" />
            </View>
        );
    }
}

export default SettingScreen;
