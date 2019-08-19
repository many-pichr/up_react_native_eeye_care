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
import PatientScreen from './screens/main/PatientScreen';
import AddPatient from './screens/main/AddPatient';
import SettingScreen from './screens/main/SettingScreen';
import CustomMainDrawer from './components/Sidebar/CustomMainDrawer';
import EditPatient from "./screens/main/EditPatient";

/**
 * Full Navigation Document
 * https://reactnavigation.org/docs/en/getting-started.html
 */

const AuthStack = createStackNavigator({
    [Screens.auth.LoginScreen]: {
        screen: LoginScreen,
        navigationOptions:{header:null}
    },
    [Screens.auth.RegisterScreen]: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Create New Account',
            headerStyle: {
                backgroundColor: '#0767DB',
                
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'white'
              },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="arrow-back" color='white' size={30} />
                </TouchableOpacity>
            )
        })
    }
});

const MainStack = createStackNavigator({
    [Screens.main.HomeScreen]: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerStyle: {
                backgroundColor: '#2d358e',
                
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'white'
              },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="menu" color='white' size={30} />
                </TouchableOpacity>
            )
        })
    },
});
const PatientStack = createStackNavigator({
    [Screens.patien.PatientScreen]: {
        screen: PatientScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Patient List',
            headerStyle: {
                backgroundColor: '#2d358e',

            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color:'white'
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="menu" color='white' size={30} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => { navigation.navigate(Screens.patien.AddPatient) }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="person-add" color='white' size={30} />
                </TouchableOpacity>
            )
        })
    },
    [Screens.patien.AddPatient]: {
        screen: AddPatient,
        navigationOptions: ({ navigation }) => ({
            title: 'Add New Patient',
            headerStyle: {
                backgroundColor: '#2d358e',

            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color:'white'
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="arrow-back" color='white' size={30} />
                </TouchableOpacity>
            )
        })
    },
    [Screens.patien.EditPatient]: {
        screen: EditPatient,
        navigationOptions: ({ navigation }) => ({
            title: 'Edit Patient',
            headerStyle: {
                backgroundColor: '#2d358e',

            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color:'white'
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ paddingHorizontal: 15 }}>
                    <MaterialIcons name="arrow-back" color='white' size={30} />
                </TouchableOpacity>
            )
        })
    }
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
    PatientScreen: {
        screen: PatientStack,
        navigationOptions: {
            drawerLabel: 'Patients',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="people" size={20} />)
        }
    },
    DotorScreen: {
        screen: MainStack,
        navigationOptions: {
            drawerLabel: 'Doctors',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="person-add" size={20} />)
        }
    },
    SchedulerScreen: {
        screen: MainStack,
        navigationOptions: {
            drawerLabel: 'SCHEDULER',
            drawerIcon: ({ focused, tintColor }) => (<MaterialIcons color={tintColor} name="today" size={20} />)
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