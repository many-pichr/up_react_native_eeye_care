import React, { Component } from 'react';
import {
    StyleSheet, Image, Text, TextInput,
    TouchableOpacity, View, SafeAreaView, Dimensions,
    KeyboardAvoidingView, Platform,Alert,ActivityIndicator,AsyncStorage
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Assets from '../../assets/Assets';
import request from '../../apis/UserAPI';
import Screens from '../../commons/constants/Screens';
const validate = require("validate.js");
const constrain = {
    username: {
    presence: { allowEmpty: false, message: 'is required' },
        length: {
        maximum: 128,
        minimum:4
    }
},
password: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
        maximum: 128,
        minimum: 6
    }
}
}
class LoginScreen extends Component {

    state = {
        validUsername: true,
        loading:false,
        error:[],
        username: '',
        password: '',
    }

    validateUsername = {

    }

    handleLoginPress = async() => {
        const { username, password } = this.state;
        const validator = await validate({username:username,password:password},constrain);
        this.setState({error:validator})
        console.log(validator)
        if (validator) {
           alert(true)
        }
        else {
            this.SignIn()
        }
    }
    async SignIn(){
        this.setState({loading:true})
        const {username,password} = this.state;
        try {
       const {data} = await request.SignIn(this.state).then((response) => {
            return response;
        })
        if(data){
            const rs = await request.getUserInfo(data.accessToken).then((response) => response.data)
                .then((responseData) => {
                    return responseData;
                }).catch((error)=>{
                    return {status:false}
                })
            this.setState({loading:false})
            this._storeData(JSON.stringify(rs))
            Keychain.setGenericPassword("", JSON.stringify(data));
            this.navigateToHomeScreen();
        }else{
            this.setState({loading:false})
            Alert.alert(
                'Login Failed!',
                'Invalid Username and Password',
                [
                    {
                        text: 'Try Again',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                ],
                {cancelable: false},
              );
    
        }}
        catch (error) {
            this.setState({loading:false})
            Alert.alert(
                'Login Failed!',
                'Invalid Username and Password',
                [
                    {
                        text: 'Try Again',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                ],
                {cancelable: false},
              );
        }
     }
    _storeData = async (user) => {
        try {
            await AsyncStorage.setItem('@userinfo', user);
        } catch (error) {
            alert("False to save data")
        }
    };
    navigateToHomeScreen = () => {
        this.props.navigation.navigate(Screens.main.HomeScreen);
    }
    navigateToRegisterScreen = () => {
        this.props.navigation.navigate(Screens.auth.RegisterScreen);
    }

    render() {
        const {
            error,
            username, password,loading
        } = this.state;

        return (
            <SafeAreaView stle={styles.wrapper}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}>
                    <Image style={styles.background} source={Assets.upbg} />
                    <Image source={Assets.LOGO} style={styles.logo} />
                    <Text style={styles.header}>Login with Username and Password</Text>
                    <View style={styles.container}>
                    <View style={styles.SectionStyle}>
                         <MaterialIcons style={styles.ImageStyle} name="person" size={30} color="gray"/>
                        <TextInput
                            value={username}
                            placeholder="Username"
                            onChangeText={username => this.setState({ username })}
                            style={styles.input}
                            autoCompleteType="off"
                            autoCorrect={false}
                        />
                        </View>
                        <Text style={styles.error}>{error&&error.username? error.username[0]:''}</Text>
                   
                        <View style={styles.SectionStyle}>
                         <MaterialIcons style={styles.ImageStyle} name="lock" size={30} color="gray"/>
                        <TextInput
                                value={password}
                                placeholder="Password"
                                onChangeText={password => this.setState({ password })}
                                secureTextEntry
                                style={styles.input}
                                autoCompleteType="off"
                                autoCorrect={false}
                            />
                            </View>
                            <Text style={styles.error}>{error&&error.password? error.password[0]:''}</Text>
                       
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={this.handleLoginPress}
                                hitSlop={{ bottom: 15, top: 15 }}
                            >
                                {loading? <ActivityIndicator animating color='white' />: <Text style={styles.buttonTitle}>Sing In Now</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.header}>Do'nt have an account yet?</Text>
                        <TouchableOpacity onPress={this.navigateToRegisterScreen}>
                            <Text style={styles.buttonSignUp}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}
const logoWidth = 207
const logoHeight = 55;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#808080' },
    container: { paddingHorizontal: '10%', paddingVertical: 0 },
    logo: { height: width / 1 * 65 / logoWidth, width: width / 2, alignSelf: 'center', marginTop: '5%', marginBottom: '5%' },
    header: { color: 'grey', textAlign: 'center', marginBottom: 15 },
    input: { height: 40,width:'90%', paddingHorizontal: 10 },
    button: { backgroundColor: '#0767DB', paddingVertical: 10, borderRadius: 4,  },
    buttonTitle: { textAlign: 'center', color: 'white', fontWeight: 'bold' },
    footer: { marginTop: 60 },
    buttonSignUp: { color: 'blue', textAlign: 'center' },
    error:{
        color:'red',
        marginTop:1,
        marginBottom:1,
        fontSize:12,
        width:'100%',
        alignSelf:'center',

    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'gray',
        width:'100%',
        height: 40,
        borderRadius: 5,
      },
     
      ImageStyle: {
        marginLeft: 10,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    background: { height: 55, width: 250, alignSelf: 'center', marginTop:30, },
})
export default LoginScreen;
