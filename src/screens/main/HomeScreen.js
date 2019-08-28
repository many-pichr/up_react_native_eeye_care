import React, { Component } from 'react';
import {View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Assets from "../../assets/Assets";
import CarouselIOS from 'react-native-snap-carousel';
const DeviceWidth = Dimensions.get('window').width
import CardView from 'react-native-cardview' ;
import Screens from "../../commons/constants/Screens";
const data = [
    {index:0,title:'',img:Assets.banner,backgroundColor: 'red'},
    {index:1,title:'',img:Assets.banner1,backgroundColor: 'green'},
    {index:2,title:'',img:Assets.banner2,backgroundColor: 'blue'},
    {index:3,title:'',img:Assets.banner3,backgroundColor: 'yellow'},
];
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    handleScreen=(screen)=> {
        const {data} = this.state;
        if(data.roles){
            if(data.roles[0].name=='ROLE_ADMIN'){
                if(screen==1) this.props.navigation.navigate(Screens.appointment.Appointment)
                if(screen==2) this.props.navigation.navigate(Screens.doctor.DoctorScreen)
                if(screen==3) this.props.navigation.navigate(Screens.patien.PatientScreen)
            }
            if(data.roles[0].name=='ROLE_PM'){
                if(screen==1) this.props.navigation.navigate(Screens.appointment.Appointment)
            }
            if(data.roles[0].name=='ROLE_USER'){
                if(screen==1) this.props.navigation.navigate(Screens.appointment.Appointment)
            }
        }

    }
    componentDidMount() {
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
                    this.setState({data:JSON.parse(value)})
                }
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    _renderItem = ({item}) => {
        return (

                <View>
                    <View style={{borderTopEndRadius:5,width:200,borderTopStartRadius:5,justifyContent: 'center'}}>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardSmallStyleMargin}
                        >
                        <Image source={item.img} style={{width: DeviceWidth*0.6, height: DeviceWidth*0.3}} />
                        </CardView>
                    </View>
                </View>
        );
    };
    render() {
        return (
            <View style={{
                // flex: 1,
                marginTop:20,
                alignItems: 'center',
            }}>
                <CarouselIOS
                    ref={(c) => { this._carousel = c; }}
                    data={data}
                    renderItem={this._renderItem}
                    sliderWidth={DeviceWidth}
                    enableSnap={true}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={1000}
                    enableMomentum={true}
                    // firstItem={1}
                     itemHeight={DeviceWidth*0.35}
                    itemWidth={DeviceWidth*0.6}
                />
                <View style={{
                    marginTop:20,
                    flexDirection: 'row',
                    justifyContent:'center',
                    backgroundColor: "grey"}}>
                    <View>
                        <View style={{width: DeviceWidth*0.5, height: DeviceWidth*0.5, marginBottom:2, backgroundColor: 'white'}}>
                            <TouchableOpacity onPress={() =>this.handleScreen(1)}>
                            <Image source={Assets.menu1} style={[styles.logo]} />
                                <View style={{position:'absolute',width:'100%',height:45,backgroundColor:'rgba(58,58,58,0.4)',justifyContent:'center',marginTop:'77%'}}>
                                <Text style={{color:'white',fontSize:20,fontWeight: 'bold',alignSelf:'center'}}>Appointment</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{width: DeviceWidth*0.5, height: DeviceWidth*0.5, backgroundColor: 'white'}} >
                            <TouchableOpacity  onPress={() =>this.handleScreen(2)}>
                                <Image source={Assets.menu2} style={[styles.logo]} />
                                <View style={{position:'absolute',width:'100%',height:45,backgroundColor:'rgba(58,58,58,0.4)',justifyContent:'center',marginTop:'77%'}}>
                                    <Text style={{color:'white',fontSize:20,fontWeight: 'bold',alignSelf:'center'}}>Doctor</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={{width: DeviceWidth*0.5, height: DeviceWidth*0.5, marginBottom:2, marginLeft:2, backgroundColor: 'white'}} >
                            <TouchableOpacity onPress={() =>this.handleScreen(3)}>
                                <Image source={Assets.menu3} style={[styles.logo]} />
                                <View style={{position:'absolute',width:'100%',height:45,backgroundColor:'rgba(58,58,58,0.4)',justifyContent:'center',marginTop:'77%'}}>
                                    <Text style={{color:'white',fontSize:20,fontWeight: 'bold',alignSelf:'center'}}>Patient</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: DeviceWidth*0.5, height: DeviceWidth*0.5, marginLeft:2, backgroundColor: 'white'}} >
                            <TouchableOpacity onPress={() =>this.handleScreen(4)}>
                                <Image source={Assets.menu4} style={[styles.logo]} />
                                <View style={{position:'absolute',width:'100%',height:45,backgroundColor:'rgba(58,58,58,0.4)',justifyContent:'center',marginTop:'77%'}}>
                                    <Text style={{color:'white',fontSize:20,fontWeight: 'bold',alignSelf:'center'}}>Schedule</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo: {
        width: DeviceWidth*0.5, height: DeviceWidth*0.5
    },
    container: {},
    cardSmallStyleMargin:{width: DeviceWidth*0.6, height: DeviceWidth*0.3,backgroundColor: 'white'},


})
export default HomeScreen;
