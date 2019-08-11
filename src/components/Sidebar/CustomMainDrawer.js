import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import Screens from '../../commons/constants/Screens';
class CustomMainDrawer extends Component {

    constructor(props){
        super(props)
    }
    Logout =()=>{
        Keychain.resetGenericPassword();
        this.props.navigation.navigate(Screens.auth.LoginScreen);

    }
    
    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.separator} />

                    <Image style={styles.profile} source={{ uri: 'https://icon-library.net/images/avatar-icon-images/avatar-icon-images-4.jpg', cache: 'force-cache' }} />
                    <Text style={[styles.profileName, styles.textCenter]}>Many Diamond</Text>
                    <Text style={[styles.profilePosition, styles.textCenter]}>Mobile Developer</Text>
                    <View style={styles.separator} />

                    <DrawerItems {...this.props} />

                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.itemIcon}>
                            <MaterialIcons name="error-outline" size={25} color="red" />
                        </View>
                        <Text onPress={this.Logout} style={styles.itemLabel}>Logout</Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </ScrollView>
        );
    }
}
const logoHeight = 55 * 0.7, logoWidth = 207 * 0.7;
const profileSize = 90;
const styles = StyleSheet.create({
    container: { flex: 1, },
    logo: { width: logoWidth, height: logoHeight, alignSelf: 'center' },
    profile: { height: profileSize, width: profileSize, borderRadius: profileSize / 2, alignSelf: 'center', marginVertical: 15, },
    textCenter: { textAlign: 'center' },
    profileName: { fontSize: 17 },
    profilePosition: { color: '#888', marginBottom: 15 },
    separator: { height: 1, backgroundColor: '#CCC', marginVertical: 10, marginHorizontal: 5 },
    item: { flexDirection: 'row', marginVertical: 10, alignItems: 'center', marginHorizontal: 15 },
    itemIcon: { marginLeft: 15, width: 60 },
    itemLabel: { fontWeight: 'bold', color:'red' }

});
export default CustomMainDrawer;
