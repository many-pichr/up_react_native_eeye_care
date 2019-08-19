import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const validate = require("validate.js");
import Input from '../../components/Input/MaterialInput';
import { ScrollView } from 'react-native-gesture-handler';
import Row from '../../components/Container/Row';
import Col from '../../components/Container/Col';
import Radio from '../../components/Input/Radio';
import DateInput from '../../components/Input/DateInput';
import Screens from "../../commons/constants/Screens";
import schama from './data/validation';
import request from '../../apis/UserAPI';
/**
 * Icon Document: 
 * https://github.com/oblador/react-native-vector-icons#installation
 * https://oblador.github.io/react-native-vector-icons/
 */
class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            error:[],
            loading:false,
            form1: {
                fullname: '',
                phone: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                gender: '',
                dob: '',
                address: '',
            }
        }
    }
    navigateSigninScreen = ()=>{
        this.props.navigation.navigate(Screens.auth.LoginScreen)
    }
    setForm1 = (field) => {
        console.log(field)
        return (value) => {
            this.setState(prev => {
                return {
                    form1: {
                        ...prev.form1,
                        [field]: value
                    }
                }
            });
        }
    }

    navigateBack = () => {
        this.props.navigation.goBack();
    }

    handleSignup = async() => {
        const validator  = await validate(this.state.form1, schama);
        this.setState({error:validator})
        if(validator){
            
        }else{
        Alert.alert(
            'Are You Sure?',
            'Are you sure to sign up?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'YES', onPress: () => {
                this.CreateUser();
              }},
            ],
            {cancelable: false},
          );
        }

    }
    async CreateUser(){
        this.setState({loading:true})
        const {form1} = this.state;
       const {data} = await request.CreateUser(form1).then((response) => {
            return response;
        })
        console.log(data)
        if(data.status){
            this.setState({loading:false})
            Alert.alert(
                'Congratulation!',
                'You are signup successful',
                [
                  {text: 'SIGN IN NOW', onPress: () => {
                    this.props.navigation.navigate(Screens.auth.LoginScreen)
                  }},
                ],
                {cancelable: false},
              );
    
           // this.props.navigation.navigate(Screens.auth.VerifyCodeScreen)
        }else{
            this.setState({loading:false})
           alert(data.message)
        }
     }
    renderForm1 = () => {
        const {
            form1,error,loading
        } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <Input
                        label="Full Name"
                        value={form1.fullname}
                        onChangeText={this.setForm1('fullname')}
                    />
                    <Text style={styles.error}>{error&&error.fullname? error.fullname[0]:''}</Text>
                    <Input
                        label="Username"
                        value={form1.username}
                        onChangeText={this.setForm1('username')}
                    />
                    <Text style={styles.error}>{error&&error.username? error.username[0]:''}</Text>
                    <Input
                        label="Email"
                        value={form1.email}
                        onChangeText={this.setForm1('email')}
                        inputProps={{ keyboardType: 'email-address', autoCapitalize: 'none' }}
                    />
                    <Text style={styles.error}>{error&&error.email? error.email[0]:''}</Text>
                    <Input
                        label="Password"
                        value={form1.password}
                        onChangeText={this.setForm1('password')}
                        inputProps={{ secureTextEntry: true }}
                    />
                    <Text style={styles.error}>{error&&error.password? error.password[0]:''}</Text>
                    <Input
                        label="Confirm Password"
                        value={form1.confirmPassword}
                        onChangeText={this.setForm1('confirmPassword')}
                        inputProps={{ secureTextEntry: true }}
                    />
                    <Text style={styles.error}>{error&&error.confirmPassword? error.confirmPassword[0]:''}</Text>
                    <Input
                        label="Phone"
                        value={form1.phone}
                        onChangeText={this.setForm1('phone')}
                    />
                    <Text style={styles.error}>{error&&error.fullname? error.fullname[0]:''}</Text>
                    <Col marginLeft={15} marginTop={15}>
                        <Text>Gender *</Text>
                    </Col>
                    <Row>
                        <Radio
                            label="Male"
                            checked={form1.gender === 'M'}
                            onChange={checked => checked && this.setForm1('gender')('M')}
                        />
                        <Radio
                            label="Female"
                            checked={form1.gender === 'F'}
                            onChange={checked => checked && this.setForm1('gender')('F')}
                        />
                    </Row>
                    <Text style={styles.error}>{error&&error.gender? error.gender[0]:''}</Text>
                    <DateInput
                        label="Date of Birth(dd/MM/yyyy)"
                        value={form1.dob}
                        onChange={this.setForm1('dob')}
                    />
                    <Text style={styles.error}>{error&&error.dob? error.dob[0]:''}</Text>
                    <Input
                        value={form1.address}
                        onChangeText={this.setForm1('address')}
                        label="Address"
                    />

                     <View style={styles.button}>
                            <TouchableOpacity
                                onPress={this.handleSignup}
                                hitSlop={{ bottom: 15, top: 15 }}
                            >
                               {loading? <ActivityIndicator animating color='white' />: <Text style={styles.buttonTitle}>Sing Up Now</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}>
                        <Text style={styles.header}>Have Account Already?</Text>
                        <TouchableOpacity onPress={this.navigateSigninScreen}>
                            <Text style={styles.buttonSignUp}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        const {
            step
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                
                <View style={{ flex: 1, marginTop: 20 }}>
                        {this.renderForm1()}
                   
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonBack: {
        padding: 20,
    },
    error:{
        color:'red',
        marginTop:1,
        fontSize:12,
        width:'90%',
        alignSelf:'center',

    },
    header: { fontSize: 18, },
    guide: { marginHorizontal: 20, fontSize: 12, color: '#888' },
    pagingText: { color: 'grey' },
    pagingTextActive: { color: 'black' },
    button: { alignSelf:'center',marginTop:30,alignItems:'center',width:"90%",backgroundColor: '#0767DB', paddingVertical: 10,  borderRadius: 4,  },
    buttonTitle: { textAlign: 'center', color: 'white', fontWeight: 'bold' },
    footer: { marginTop: 60, alignSelf:'center' },
    buttonSignUp: { color: 'blue', textAlign: 'center',fontSize:18 }
})
export default RegisterScreen;
