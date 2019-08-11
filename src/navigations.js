import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    DrawerActions
} from "react-navigation";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/main/HomeScreen";
import Screens from "./commons/constants/Screens";
import UserProfileScreen from './screens/main/UserProfileScreen';
import SettingScreen from './screens/main/SettingScreen';
import CustomMainDrawer from './components/Sidebar/CustomMainDrawer';

/**
 * Full Navigation Document
 * https://reactnavigation.org/docs/en/getting-started.html
 */

const AuthStack = createStackNavigator({
    [Screens.auth.LoginScreen]: {
        screen: LoginScreen,
    },
    [Screens.auth.RegisterScreen]: {
        screen: RegisterScreen,
    }
}, { defaultNavigationOptions: { header: null } });

const MainStack = createStackNavigator({
    [Screens.main.HomeScreen]: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="menu" size={20} />
                </TouchableOpacity>
            )
        })
    },
});
const UserProfileStack = createStackNavigator({
    UserProfileScreen: {
        screen: UserProfileScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'User Profile',
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="menu" size={20} />
                </TouchableOpacity>
            )
        })
    },
});
const SettingStack = createStackNavigator({
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Settings',
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="menu" size={20} />
                </TouchableOpacity>
            )
        })
    },
});
const DrawerNav = createDrawerNavigator({
    HomeScreen: {
        screen: MainStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="dashboard" size={20} />)
        }
    },
    UserProfileScreen: {
        screen: UserProfileStack,
        navigationOptions: {
            drawerLabel: 'Profile',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="person" size={23} />)
        }
    },
    SettingScreen: {
        screen: SettingStack,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="settings" size={23} />)
        }
    }
}, {
        contentComponent: CustomMainDrawer,
        contentOptions: {
            activeTintColor: '#0767DB',
            activeBackgroundColor: 'white',
            itemStyle: { marginHorizontal: 15, marginVertical: 5, borderRadius: 4, },
            iconContainerStyle: { borderColor: 'transparent' }
        }
    })

const RootNavigation = createSwitchNavigator({
    StartScreen,
    AuthStack,
    DrawerNav,
}, {

    })

export default RootNavigation;