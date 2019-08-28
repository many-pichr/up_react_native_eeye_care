import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Image,Dimensions
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Screens from '../commons/constants/Screens';
import Assets from '../assets/Assets';
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
            console.log(credentials)
            if (credentials) {
                // TODO: Validate user, and password (can be token) against server
                setTimeout(() => {
                    this.navigate(Screens.main.HomeScreen);
                }, 1500);
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
               <Image source={Assets.loading} style={{width: width / 3,height: width / 3}}/>
            </View>
        );
    }
}
const logoWidth = 207
const logoHeight = 55;
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:-200
    },
    wrapper1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: { height: width / 1 * 65 / logoWidth, width: width / 2, alignSelf: 'center', marginTop: '20%', marginBottom: '5%' },
})

export default StartScreen;
