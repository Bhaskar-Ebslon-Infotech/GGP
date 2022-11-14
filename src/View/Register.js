import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  generateGuestToken,
  newParent,
  sendOtp,
  setAuthToken,
  setPhoneNumber,
  setUserObjForRegister,
  CheckValidReferral
} from '../api/user';
import CommonHeader from '../Component/CommonHeader';
import Down from '../images/svg/dropDown';
import Flag from '../images/svg/flag';
import commonStyle from '../Styles/commonStyle';
import CSS from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import MasterData from '../MasterData';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import PhoneInput from 'react-native-phone-input'
import PhoneInput from "react-native-phone-number-input";
import { LoaderContext, refContext, toggleModalContext } from '../../App';

export default function Signup(props) { 
  const [codeModal, setCodeModal] = useState(false);
  const [code, setCode] = useState('');
  const [flag, setFlag] = useState('');
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const codeData = MasterData.phone;
  const [loading, setLoading] = useContext(LoaderContext);

  const codeRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCode(item.code);
          setFlag(item.flag);
          setCodeModal(false);
        }}
        style={[
          CSS.listdownView,
          {
            justifyContent: 'flex-start',
            borderColor: '#DEDEDE',
            backgroundColor: Colors.WHITE,
          },
        ]}>
        <Text style={[CSS.listdownTxt, { width: '25%' }]}>{item.code}</Text>
        <Text style={[CSS.listdownTxt]}>{item.country}</Text>
      </TouchableOpacity>
    );
  };


  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [referalCode, setReferalCode] = useState("");
  const [token, setToken] = useState('');
  const [ref, setRef] = useContext(refContext);

  const handleClearState = () => {
    setPhone('');
    setEmail('');
    setLastname('');
    setFirstname('');
    setReferalCode('');
    setPin('');
    setConfirmPin('');
  };

  useEffect(() => {
    setReferalCode(ref)
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // firstName != '' && firstName != ' ' && lastName != '' && lastName != ' ' && 
      // if (phone != '' && email != '') {
      // } else if (phone == '') {
      //   // alert('Please Fill all the fields');
      //   setToggleModal(true)
      //   setMessage('Please Fill all the fields correctly empty spaces not allowed')

      // }
      if (email == "" || !email.match(validRegex)) {
        // alert('Please Enter a valid email address');
        setToggleModal(true)
        setMessage('Please Enter a valid email address')
        setLoading(false)
        return;
      } else if (phone == "" || phone.length < 10) {
        setToggleModal(true)
        setMessage('Please enter a Valid phone Number')
        setLoading(false)
        return;
      }else if (countryCode !== 91) {
        setToggleModal(true)
        setMessage('Countries Other then India are not supported for now')
        setLoading(false)
        return;
      }
      else if (firstName == "" || firstName.trim().length == 0) {
        setToggleModal(true)
        setMessage('First name cannot contain only spaces or be empty')
        setLoading(false)
        return;
      }
      else if (lastName == "" || lastName.trim().length == 0) {
        setToggleModal(true)
        setMessage('Last name cannot contain only spaces or be empty')
        setLoading(false)
        return;
      }
      else if (pin == "" || pin.length < 4) {
        setToggleModal(true)
        setMessage('Please enter a four digit pin')
        setLoading(false)
        return;
        // alert('Please enter a four digit pin');
      }
      else if (confirmPin == "" || confirmPin.length < 4) {
        setToggleModal(true)
        setMessage('Please enter a four digit in confirmPin text input')
        setLoading(false)
        return;
        // alert('Please enter a four digit pin');
      }
      else if (pin != confirmPin) {
        // alert('Pin and confirm pin does not match');
        setToggleModal(true)
        setMessage('Pin and confirm pin does not match')
        setLoading(false)
        return;
      } else {

        if (referalCode && referalCode.length > 0) {
          let { data: resReferral } = await CheckValidReferral({ referralCode: referalCode })
        }

        let obj = {
          firstName: `${firstName}`.trim(),
          lastName: `${lastName}`.trim(),
          email,
          phone,
          pin,
          referedBy: referalCode
        };
        console.log(obj);

        // let { data: response } = await newParent(obj);
        // console.log(response.token, 'response');
        // if (response?.data) {
        await setUserObjForRegister(JSON.stringify(obj));
        // await setAuthToken(response.token);
        // console.log('hdh', response?.data);
        let formData = new FormData();
        //console.log(phone)
        formData.append('otp_mobile_num', phone);
        formData.append('otp_mobile_cc', 91);
        let { data: res } = await generateGuestToken();
        console.log(res, 'response from generate guest token');
        
        if (res.data) {
          setToken(res.data.token);
          console.log('guest token', res.data.token);
          const { data: responseData } = await sendOtp(
            formData,
            res.data.token,
          );
          console.log(responseData, 'otp Sent');
          if (responseData.status == 200 || responseData.status == 201) {
            // alert(responseData.data.message);
            setToggleModal(true)
            setMessage(responseData.data.message)
            await setPhoneNumber(phone);
            props.navigation.navigate('Otp', {
              data: phone,
              token: res.data.token,
              name: firstName,
            });
          }
        }
        // }
      }

    }
    catch (error) {

      if (error?.response?.data?.message) {
        setToggleModal(true)
        if(error.response.data.message){

        }else{
          setMessage(error.response.data.message)
        }
      } else {
        setToggleModal(true)
        setMessage(error?.message)
      }
    }
    setLoading(false)
  };

  useEffect(() => { });



  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <CommonHeader hideBackBtn={false} />
      {loading ? (
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#ffffff" size="large" />
        </View>
      ) : (
        <>
          <ScrollView>
            <ImageBackground
              source={require('../images/loginBg.png')}
              resizeMode="stretch"
              style={[{ flex: 1, minHeight: hp(90), paddingBottom: 20 }]}>
              <View
                style={{
                  paddingHorizontal: Spacing.MARGIN_15,
                  marginTop: hp(39),
                }}>
                <Text style={[styles.heading]}>Parent Sign up</Text>
                <Text style={[styles.label]}>Name *</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder="First Name *"
                    value={firstName}
                    onChangeText={val => setFirstname(val)}
                    style={[
                      styles.input,
                      styles.inputBorder,
                      { marginRight: Spacing.MARGIN_10, width: '49%' },
                    ]}
                  />
                  <TextInput
                    placeholder="Last Name *"
                    value={lastName}
                    onChangeText={val => setLastname(val)}
                    style={[styles.input, styles.inputBorder, { width: '49%' }]}
                  />
                </View>
                <Text style={[styles.label]}>Phone *</Text>
                {/* <PhoneInput
                  //setValue={val => setPhone(val)}
                 // getValue={val => setPhone(val)}
                  initialCountry={'India'}
                  initialValue="91"
                  onChangeText={val => setPhone(val)}
                  textProps={{
                    placeholder: 'Enter a phone number...',
                    maxLength: 13,
                   
                  }}
                  style={[styles.input, styles.inputBorder]}
                /> */}
                {/* <PhoneInput
           // ref={phoneInput}
            defaultValue={phone}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setPhone(text);
            }}
            placeholder='enter phone no'
           textContainerStyle={{borderRadius:30,height:hp(6)}}
            containerStyle={{alignItems:'center',justifyContent:'center',borderRadius:30,width:'100%',height:hp(6),width:wp(40)}}
            codeTextStyle={{height:hp(4),}}
            flagButtonStyle={{height:hp(5)}}
           
          /> */}

                {/* <PhoneInput
           // ref={phoneInput}
            defaultValue={phone}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setPhone(text);
            }}
            placeholder='enter phone no'
           textContainerStyle={{borderRadius:30,height:hp(10),backgroundColor:'red'}}
            containerStyle={{alignItems:'center',justifyContent:'center',borderRadius:30,width:'100%',height:hp(6),}}
            codeTextStyle={{height:hp(4),}}
            flagButtonStyle={{height:hp(6)}} 
           />*/}


                <View style={[styles.input, styles.inputBorder, { paddingHorizontal: 0 }]}>
                  <View style={[commonStyle.flexRow]}>

                    <PhoneInput
                      defaultValue='IND'
                      layout="first"
                      onChangeCountry={val => setCountryCode(val.callingCode[0])}
                      textContainerStyle={{ borderRadius: 30, height: hp(5), width: "100%" }}
                      containerStyle={{ borderRadius: 30, height: hp(5), width: wp(43) }}
                      codeTextStyle={{ height: 20, width: "100%", textAlign: "left", margin: 0, padding: 0 }}
                    />
                    <TextInput
                      keyboardType="numeric"
                      onChangeText={val => setPhone(val.replace(/\D/g,''))}
                      value={phone}
                      maxLength={10}
                      style={{ flex: 1 }}
                      placeholder="Enter Phone *"
                    />
                  </View>
                </View>
                <Text style={[styles.label]}>Email * </Text>
                <TextInput
                  placeholder="Email *"
                  keyboardType="email-address"
                  onChangeText={val => setEmail(val)}
                  value={email}
                  style={[styles.input, styles.inputBorder]}
                />

                <Text style={[styles.label]}>Referral Code</Text>
                <TextInput
                  placeholder="Referral Code"
                  onChangeText={val => setReferalCode(val)}
                  value={referalCode}
                  style={[styles.input, styles.inputBorder]}
                />
                <Text style={[styles.label]}>Set Pin *</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    placeholder="Pin *"
                    keyboardType="number-pad"
                    value={pin}
                    secureTextEntry={true}
                    maxLength={4}
                    onChangeText={val => setPin(val.replace(/\D/g,''))}
                    style={[
                      styles.input,
                      styles.inputBorder,
                      { marginRight: Spacing.MARGIN_10, width: '49%' },
                    ]}
                  />
                  <TextInput
                    placeholder="Confirm Pin *"
                    keyboardType="number-pad"
                    value={confirmPin}
                    maxLength={4}
                    secureTextEntry={true}
                    onChangeText={val => setConfirmPin(val.replace(/\D/g,''))}
                    style={[styles.input, styles.inputBorder, { width: '49%' }]}
                  />
                </View>
                <View
                  style={[
                    commonStyle.flexRow,
                    {
                      marginTop: Spacing.MARGIN_20,
                      alignSelf: 'center'
                      // marginBottom: Spacing.MARGIN_50,
                    },
                  ]}>
                  {/* <TouchableOpacity
                    style={[styles.bg]}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Text style={[styles.text, { color: Colors.WHITE }]}>
                      Back
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={[styles.bg, { marginLeft: Spacing.MARGIN_10, alignSelf: 'center' }]}>
                    <Text style={[styles.text, { color: Colors.WHITE }]}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </>
      )}
      <Modal animationType="slide" transparent={true} visible={codeModal}>
        <View style={[CSS.dopDownModal]}>
          <View style={[CSS.modalWhiteBg]}>
            <FlatList
              data={codeData}
              renderItem={codeRenderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          <TouchableOpacity onPress={() => setCodeModal(false)}>
            <AntDesign
              name={ANTDESIGN.CIRCEL_CLOSE}
              color={Colors.WHITE}
              size={Spacing.SIZE_40}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Typography.FONT_SIZE_13,
    color: 'white',
    marginBottom: 2,
    marginTop: Spacing.MARGIN_10,
  },
  heading: {
    fontFamily: 'Cookies',
    fontSize: Typography.FONT_SIZE_25,
    color: 'white',
    marginTop: hp(1),
    lineHeight: Spacing.PADDING_30,
  },
  input: {
    height: hp(6),
    backgroundColor: 'white',
    color: 'black',
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: '#9A9A9A',
    borderRadius: 20,
    paddingHorizontal: Spacing.PADDING_20,
  },
  bg: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    width: '49%',
    borderRadius: 20,
  },
  text: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    paddingVertical: Spacing.PADDING_7,
  },
});
