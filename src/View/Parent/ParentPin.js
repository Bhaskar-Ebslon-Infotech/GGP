import React, { useEffect, useState, useContext } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Down from '../../images/svg/down';
import Flag from '../../images/svg/parentsvg/flag';
import parentStyle from '../../Styles/parentStyle';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { useNavigation } from '@react-navigation/native';
import { generateGuestToken, sendOtp, setPhoneNumber, updateParentUserData, updateUserData, userData } from '../../api/user';
import Header from '../../Component/CommonHeader';
import { LoaderContext, toggleModalContext } from '../../../App';
export default function ParentPin(props) {
  const navigation = useNavigation();
  const [token, setToken] = useState('')
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [mob, setMob] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [userDataObj, setUserDataObj] = useState({});
  const [referalCode, setReferalCode] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [loading, setLoading] = useContext(LoaderContext);

  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  // const handleSubmit = () => {
  //   if (firstName == '') {
  //     alert('please enter name');
  //   } else if (mob == '') {
  //     alert('please enter mobile no');
  //   } else if (email == '') {
  //     alert('please enter email');
  //   } else if (pin == '') {
  //     alert('please enter pin');
  //   } else {
  //     let obj = {
  //       name: firstName,
  //       mob,
  //       email,
  //       pin,
  //     };

  //     console.log(obj);
  //     navigation.navigate('BottomTabBar', {
  //       screen: 'SettingStack',
  //       params: { screen: 'ParentChangePin' },
  //     });
  //   }
  // };

  const handleForgetPin = async () => {
    if (mob.length < 10 && mob.length > 0) {
      setToggleModal(true)
      setMessage("Please enter a valid phone number")

    }
    else {
      let formData = new FormData();
      // console.log(phone)
      formData.append('otp_mobile_num', mob);
      formData.append('otp_mobile_cc', 91);
      let { data: res } = await generateGuestToken();
      console.log(res, 'response from generate guest token');
      if (res.data) {
        setToken(res.data.token);
        console.log('guest token', res.data.token);
        const { data: responseData } = await sendOtp(formData, res.data.token);
        console.log(responseData, 'otp Sent');
        if (responseData.status == 200 || responseData.status == 201) {
          setToggleModal(true)
          setMessage(responseData.data.message)
          await setPhoneNumber(mob);
          props.navigation.navigate('OtpVerifyForgotPassword', {
            data: mob,
          });
        }
      }


      // props.navigation.navigate("OtpVerifyForgotPassword", { data: phone })
    }
  }

  const handleParentUpdate = async () => {
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
      }
      else if (firstName == "" || firstName.trim().length == 0) {
        setToggleModal(true)
        setMessage('First name cannot contain only spaces or be empty')
        setLoading(false)
        return;
        // alert('Please enter a Valid phone Number');
      }
      else if (lastName == "" || lastName.trim().length == 0) {
        setToggleModal(true)
        setMessage('Last name cannot contain only spaces or be empty')
        setLoading(false)
        return;
        // alert('Please enter a Valid phone Number');
      }
      else {
        let finalObject = {
          firstName: firstName,
          lastName: lastName,
          oldPin: oldPin,
          pin: pin,
          email: email,
        }
        console.log(finalObject, "final object");
        let { data: res } = await updateParentUserData(finalObject)
        console.log(res);
        if (res.message) {
          setToggleModal(true)
          setMessage(res.message)
          handleGetUserData()
        }
      }

    }
    catch (error) {
      if (error?.response?.data?.message) {
        setToggleModal(true)
        setMessage(error.response.data.message)
      } else {
        setToggleModal(true)
        setMessage(error?.message)
      }
    }
    setLoading(false)
  }

  const handleGetUserData = async () => {
    setLoading(true)
    try {
      const { data: res } = await userData();
      console.log('this is data', JSON.stringify(res, null, 2));
      if (res.success) {
        setUserDataObj(res.data);
        setEmail(res.data.email)
        setMob(res.data.phone)
        setfirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setReferalCode(res.data.referalCode)
      }
    }
    catch (error) {
      if (error?.response?.data?.message) {
        setToggleModal(true)
        setMessage(error.response.data.message)
      } else {
        setToggleModal(true)
        setMessage(error?.message)
      }
    }
    setLoading(false)
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <ImageBackground
        source={require('../../images/bg2.png')}
        style={[commonStyle.fullSize]}>
        <Header />
        <View style={{ padding: Spacing.PADDING_20 }}>
          <Text style={[styles.heading]}>Parent</Text>
          <Text style={[styles.label]}>First Name:</Text>
          <TextInput
            placeholder="enter name"
            value={firstName}
            onChangeText={val => setfirstName(val)}
            style={[styles.input]}
          />
          <Text style={[styles.label]}>Last Name:</Text>
          <TextInput
            placeholder="enter name"
            value={lastName}
            onChangeText={val => setLastName(val)}
            style={[styles.input]}
          />
          <Text style={[styles.label]}>Phone:</Text>
          <View style={[commonStyle.flexRow, styles.input, { alignItem: 'center' }]}>
            <Flag height={hp(3)} width={wp(5)} />
            <TouchableOpacity>
              <Down
                height={hp(3)}
                width={wp(5)}
                style={{ marginHorizontal: Spacing.MARGIN_5 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_13,
                color: 'black',
                fontFamily: 'Montserrat-Regular',
              }}>
              +91
            </Text>
            {/* <TextInput value={mob} onChangeText={(val)=>setMob(val)} /> */}
            <TextInput
              value={mob}
              onChangeText={val => setMob(val)}
              editable={false}
              keyboardType="numeric"
              style={{ width: '70%', color: 'black', paddingTop: 10 }}
            />
          </View>
          <Text style={[styles.label]}>Email:</Text>
          <TextInput
            placeholder="enter email"
            style={[styles.input]}
            value={email}
            onChangeText={val => setEmail(val)}
          />
          <Text style={[styles.label]}>Your Referral code:</Text>
          <TextInput
            placeholder="Referral code"
            style={[styles.input, { color: 'black' }]}
            keyboardType="numeric"
            value={referalCode}
            editable={false}

          // onChangeText={val => setPin(val)}
          />
          <TouchableOpacity onPress={() => handleForgetPin()}>
            <Text style={{ color: Colors.GRADIENT1 }}>Forgot/Change Pin</Text>
          </TouchableOpacity>
          {/* <Text style={[styles.label]}>OLD PIN:</Text>
          <TextInput
            placeholder="enter old pin"
            style={[styles.input]}
            keyboardType="numeric"
            value={oldPin}
            onChangeText={val => setOldPin(val)}
          />

          <Text style={[styles.label]}>PIN:</Text>
          <TextInput
            placeholder="enter pin"
            style={[styles.input]}
            keyboardType="numeric"
            value={pin}
            onChangeText={val => setPin(val)}
          /> */}



          <TouchableOpacity
            style={{ marginTop: Spacing.MARGIN_30, alignSelf: 'center' }}
            onPress={() => handleParentUpdate()}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[commonStyle.linearBtn]}>
              <Text style={[commonStyle.btnText, { paddingHorizontal: 30 }]}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../images/bonusTeady.png')}
          resizeMode="contain"
          style={[parentStyle.bottonPg]}
        />
      </ImageBackground>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: Typography.FONT_SIZE_22,
    color: Colors.LIGHT_BLACK,
    marginTop: Spacing.MARGIN_15,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Typography.FONT_SIZE_12,
    color: '#747474',
    marginTop: Spacing.MARGIN_10,
    marginBottom: Spacing.PADDING_4,
  },
  input: {
    borderWidth: 1,
    height: hp(6),
    borderRadius: 20,
    borderColor: '#9A9A9A',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.MARGIN_15,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Typography.FONT_SIZE_13,
    color: Colors.PRIMARY,
    marginTop: Spacing.PADDING_4,
  },
});
