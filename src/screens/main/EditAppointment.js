import React, { Component } from 'react';
import {
    StyleSheet, Image, Text, TextInput,
    TouchableOpacity, View, SafeAreaView, Dimensions,
    KeyboardAvoidingView, Platform,Alert,ActivityIndicator,AsyncStorage
} from 'react-native'
import Select from '../../components/Input/Select'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Assets from '../../assets/Assets';
import Request from '../../apis/UserAPI';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Screens from '../../commons/constants/Screens';
import Input from "../../components/Input/MaterialInput";
import ImagePicker from 'react-native-image-crop-picker';
const validate = require("validate.js");
const constrain = {
    title: {
        presence: { allowEmpty: false, message: 'is required' }
    },
    showdate: {
        presence: { allowEmpty: false, message: 'is required' }
    },
    showtime: {
        presence: { allowEmpty: false, message: 'is required' }
    },
    userid: {
        presence: { allowEmpty: false, message: 'is required' }
    },
    doctorid: {
        presence: { allowEmpty: false, message: 'is required' }
    },
}
class LoginScreen extends Component {

    state = {
        validUsername: true,
        loading:false,
        dialog:false,
        dialog1:false,
        opendate:false,
        id:0,
        opentime:false,
        error:[],
        user:[],
        doctor:[],
        userOption:[],
        doctorOption:[],
        title:'',
        description:'',
        create:new Date(),
        deadline:null,
        showdate:'',
        showtime:'',
        userid:'',
        doctorid:'',
        image:'',
        role:''
    }

    validateUsername = {

    }
    componentDidMount() {
        this.getUsers();
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userinfo');
            if (value !== null) {
                if(value.status==false){
                    Keychain.resetGenericPassword();
                    this.props.navigation.navigate(Screens.auth.LoginScreen);
                }else{
                    const data = JSON.parse(value);
                    this.setState({role: data.roles[0].name, userid:data.id})
                }
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    setData= async (item,auth)=>{
        const {user,doctor}=this.state;
        for(var i=0; i<user.length; i++){
            if (user[i].value==item.user_id) {
                 this.setState({userOption:user[i]})

            }
        }
        for(var i=0; i<doctor.length; i++){
            if (doctor[i].value==item.doctor_id) {
                this.setState({doctorOption:doctor[i]})

            }
        }
        this.setState({title:item.title,image:item.image,doctorid:item.doctor_id,userid:item.user_id,deadline:item.deadline,
        showdate:moment(item.deadline).format('MM-DD-YYYY'),showtime:moment(item.deadline).format('hh:mm A'),
        description:item.description,id:item.id})
    }
    async UpdateApp(){
        this.setState({loading:true})
        const {form1,image} = this.state;
        const credentials = await Keychain.getGenericPassword();
        const user =[];
        const doctor =[];
        if (credentials) {
            const auth = JSON.parse(credentials.password);
            const {data} = await Request.UpdateAppointment(this.state,auth.accessToken).then((response) => {
                return response;
            })
            console.log(data)
            if (data.status) {
                this.setState({loading: false})
                Alert.alert(
                    'Congratulation!',
                    'Appointment Created Successfully',
                    [
                        {
                            text: 'Go to List', onPress: () => {

                                this.props.navigation.push(Screens.appointment.Appointment)
                            }
                        },
                    ],
                    {cancelable: false},
                );

                // this.props.navigation.navigate(Screens.auth.VerifyCodeScreen)
            } else {
                this.setState({loading: false})
                alert(data.message)
            }
        }
    }
    handleUpdate = async() => {
        const { title, showdate } = this.state;
        const validator = await validate(this.state,constrain);
        this.setState({error:validator})
        console.log(validator)
        if (validator) {

        }
        else {
            Alert.alert(
                'Are You Sure?',
                'Are you sure update Appointment?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'YES', onPress: () => {
                            this.UpdateApp();
                        }},
                ],
                {cancelable: false},
            );
        }
    }
    handleOpenDialog =()=>{
        this.setState({dialog:true})
    }
    handleOpenDialog1 =()=>{
        this.setState({dialog1:true})
    }
    handleCloseDialog =()=>{
        this.setState({dialog:false,dialog1:false,opendate:false,opentime:false})
    }
    handleSelect=(option)=>{

            this.setState({userOption:option,userid:option.value,dialog:false})

    }
    handleSelect1=(option)=>{
            this.setState({doctorOption:option,doctorid:option.value,dialog1:false})
    }
    handleDate =()=>{
        this.setState({opendate:true})
    }
    handleTime =()=>{
        this.setState({opentime:true})
    }
    handleOnChange=(date)=>{
        const {showdate,showtime} = this.state;
        this.setState({deadline: new Date(moment(date).format('MM-DD-YYYY')+" "+showtime),showdate: moment(date).format('MM-DD-YYYY'),opendate:false})
    }
    handleGetTime=(date)=>{
        const {showdate,showtime} = this.state;
        this.setState({deadline:new Date(showdate+" "+moment(date).format('hh:mm A')),showtime: moment(date).format('hh:mm A'),opentime:false})
    }

    getUsers = async ()=>{
        this.setState({loading:true})
        const credentials = await Keychain.getGenericPassword();
        const user =[];
        const doctor =[];
        if (credentials) {
            const auth = JSON.parse(credentials.password);
            const {data} = await Request.getAllUser(auth.accessToken).then((response) => response.data)
                .then((responseData) => {
                    return responseData;
                })
            await data.map((item, i) => {
                console.log(item)
                if(item.roles[0].name.toUpperCase()=="ROLE_USER"){
                    user.push({value:item.id,label:item.name});
                }
                if(item.roles[0].name.toUpperCase()=="ROLE_PM"){
                    doctor.push({value:item.id,label:item.name});
                }
            })

           await this.setState({doctor:doctor,user: user,loading:false,auth:auth})
            const { item } = this.props.navigation.state.params;
            this.setData(item,auth)
        }
        else {
            this.props.navigation.navigate(Screens.auth.LoginScreen)
        }

    }
    navigateToHomeScreen = () => {
        this.props.navigation.navigate(Screens.main.HomeScreen);
    }
    navigateToRegisterScreen = () => {
        this.props.navigation.navigate(Screens.auth.RegisterScreen);
    }
    handleUpload =()=>{

        Alert.alert(
            'Choosing?',
            'Please choose image source?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 200,
                            cropping: true,
                            includeBase64:true,
                            writeTempFile:false,
                            compressImageQuality:0
                        }).then(image => {
                            console.log(image)
                            this.setState({image:image.data})
                        });
                    }},
                {text: 'Library', onPress: () => {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 200,
                            cropping: true,
                            includeBase64:true,
                            writeTempFile:false,
                            compressImageQuality:0
                        }).then(image => {
                            console.log(image)
                            this.setState({image:image.data})
                        });
                    }},
            ],
            {cancelable: false},
        );


    }
    render() {
        const {
            error,
            title, description,deadline,create,loading,showdate,showtime,image
        } = this.state;
console.log(new Date(showdate+" "+showtime),"mydate==>",this.state.userOption)
        return (
            <SafeAreaView stle={styles.wrapper}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}>

                    <View style={styles.container}>
                        <Text style={styles.error}></Text>
                    <View style={styles.SectionStyle}>
                         <MaterialIcons style={styles.ImageStyle} name="create" size={30} color="gray"/>
                        <TextInput
                            value={title}
                            placeholder="Title"
                            onChangeText={title => this.setState({ title })}
                            style={styles.input}
                            autoCompleteType="off"
                            autoCorrect={false}
                        />
                        </View>
                        <Text style={styles.error}>{error&&error.title? error.title[0]:''}</Text>
                        <View style={styles.SectionStyle}>
                         <MaterialIcons style={styles.ImageStyle} name="today" size={30} color="gray"/>
                            <TouchableOpacity onPress={this.handleDate} style={[styles.inputdate]} >
                                <Text>{(showdate) ? showdate : "Pick Up Date"}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.opendate}
                                onCancel={this.handleCloseDialog}
                                onConfirm={(date) => { this.handleOnChange(date) }}
                            />
                            </View>
                            <Text style={styles.error}>{error&&error.showdate? error.showdate[0]:''}</Text>
                        <View style={styles.SectionStyle}>
                            <MaterialIcons style={styles.ImageStyle} name="access-time" size={30} color="gray"/>
                            <TouchableOpacity onPress={this.handleTime} style={[styles.inputdate]} >
                                <Text>{(showtime) ? showtime : "Pick Up Time"}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.opentime}
                                mode={"time"}
                                onCancel={this.handleCloseDialog}
                                onConfirm={(date) => { this.handleGetTime(date) }}
                            />
                        </View>
                        <Text style={[styles.error,{display:this.state.role=='ROLE_USER'?'none':''}]}>{error&&error.showtime? error.showtime[0]:''}</Text>
                        {this.state.role!='ROLE_USER'&&
                        <Select label={"Choose Patient"}
                                handleOpen={this.handleOpenDialog}
                                options={this.state.user}
                                value={this.state.userid}
                                open={this.state.dialog}
                                option={this.state.userOption}
                                handleClose={this.handleCloseDialog}
                                onOptionPress={this.handleSelect}/>}
                        <Text style={styles.error}>{error&&error.userid? error.userid[0]:''}</Text>
                        <Select label={"Choose Doctor"}
                                handleOpen={this.handleOpenDialog1}
                                options={this.state.doctor}
                                value={this.state.doctorid}
                                edit={true}
                                open={this.state.dialog1}
                                option={this.state.doctorOption}
                                handleClose={this.handleCloseDialog}
                                onOptionPress={this.handleSelect1}/>
                        <Text style={styles.error}>{error&&error.doctorid? error.doctorid[0]:''}</Text>

                        <View style={styles.SectionArea}>
                            <TextInput
                                value={description}
                                placeholder="Description"
                                multiline={true}
                                size={60}
                                onChangeText={description => this.setState({ description })}
                                style={styles.textarea}
                                autoCompleteType="off"
                                autoCorrect={false}
                            />
                        </View>
                        <TouchableOpacity  onPress={this.handleUpload}>
                        <Image source={image!=''?{uri:"data:image/jpg;base64,"+image}:Assets.upload} style={styles.logo}/>
                        </TouchableOpacity>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={this.handleUpdate}
                                hitSlop={{ bottom: 15, top: 15 }}
                            >
                                {loading? <ActivityIndicator animating color='white' />: <Text style={styles.buttonTitle}>Update Appointment</Text>}
                            </TouchableOpacity>
                        </View>
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
    logo: {borderWidth:1,borderColor:'gray',borderRadius:5, height: width / 1 * 80 / logoWidth, width: width*0.8 , alignSelf: 'center', marginTop: '5%', marginBottom: '5%' },
    header: { color: 'grey', textAlign: 'center', marginBottom: 15 },
    input: { height: 40,width:'90%', paddingHorizontal: 10 },
    textarea: { height: 40,width:'90%', paddingHorizontal: 10 },
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
    SectionArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'gray',
        width:'100%',
        height: 60,
        borderRadius: 5,
    },
      ImageStyle: {
        marginLeft: 10,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
    background: { height: 55, width: 250, alignSelf: 'center', marginTop:30, },
    inputdate: { paddingHorizontal: 10, flex: 1, justifyContent: 'center' },
    label: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        paddingHorizontal: 5,
    }
})
export default LoginScreen;
