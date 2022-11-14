import Clipboard from '@react-native-community/clipboard';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image, ImageBackground, Modal,
  ScrollView, Share, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../../App';
import { webUrl } from '../../api/url';
import {
  generateGuestToken, getFavcyTokenFromDB,
  sendOtp,
  setPhoneNumber,
  userData
} from '../../api/user';
import { AddMoneytoUserWallet, CreateTransaction } from '../../api/wallet';
import CommonHeader from '../../Component/CommonHeader';
import Add from '../../images/svg/parentsvg/add';
import Minus from '../../images/svg/parentsvg/minus';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { PRIMARY } from '../../Styles/theme/Colors';
import { ANTDESIGN } from '../../Styles/theme/Icons';

export default function TopUp(props) {
  const focused = useIsFocused()
  const [walletModal, setWalletModal] = useState(false);
  const [count, setCount] = useState('0');
  const [userDataObj, setUserDataObj] = useState({});
  const [token, setToken] = useState('');
  const [walletObj, setWalletObj] = useState({});
  const [topUpModal, setTopUpModal] = useState(false)
  const [modalValue, setModalValue] = useState('')
  const [loading, setLoading] = useContext(LoaderContext);
  const [linkIsActive, setLinkIsActive] = useState(false);
  const [topupUrl, setTopupUrl] = useState("");

  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const add = () => {
    let tempCount = parseInt(count) + 1;
    tempCount = tempCount ? tempCount : 0
    setCount(`${tempCount}`);
    console.log(count)
  };
  const minus = () => {
    let tempCount = parseInt(count) - 1;
    tempCount = tempCount ? tempCount : 1

    if (tempCount > 0)
      setCount(`${tempCount}`);
    console.log(count)
  };

  const handleGetUserData = async () => {
    setLoading(true)
    try {
      const { data: res } = await userData();
      if (res.success) {
        setUserDataObj(res.data);
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


  const [copiedText, setCopiedText] = useState('');

  const handleUserWalletTopUp = async () => {
    setLoading(true)
    try {
      let obj = {
        orderId: props?.route?.params?.data._id,
        amount: props?.route?.params?.data.price
      }
      const { data: res } = await AddMoneytoUserWallet(obj);
      console.log('this is data', JSON.stringify(res, null, 2));
      if (res.data) {
        setWalletModal(true)
        setWalletObj(res.data)
      }
      // if (res.success) {

      //   setUserDataObj(res.data);
      // }
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
    if (focused) {
      setTopUpModal(false)
      setWalletModal(false)
    }
  }, [focused])


  useEffect(() => {
    console.log('count', count)
    handleGetUserData();
    // console.log(props?.route?.params?.openModal)
    // console.log(props?.route?.params?.data?.price)
    if (props?.route?.params?.data?.price) {
      handleUserWalletTopUp()
    }
  }, [props?.route?.params?.data]);

  const handleOtpGenrate = async (orderObj2) => {
    let formData = new FormData();
    //console.log(phone)
    formData.append('otp_mobile_num', userDataObj.phone);
    formData.append('otp_mobile_cc', 91);
    let { data: res } = await generateGuestToken();
    console.log(res, 'response from generate guest token');
    if (res.data) {
      setToken(res.data.token);
      console.log('guest token', res.data.token);
      const { data: responseData } = await sendOtp(formData, res.data.token);
      console.log(responseData, 'otp Sent');
      if (responseData.status == 200 || responseData.status == 201) {
        setTopUpModal(true)
        setModalValue(responseData.data.message)
        await setPhoneNumber(userDataObj.phone);

        setTopUpModal(false)
        props.navigation.navigate('OtpVerifyBeforePayment', {
          data: userDataObj.phone,
          obj: res.data,
          orderObj: orderObj2,
          token: res.data.token,
          name: userDataObj.firstName,
        });
      }
    }
  };


  const handleGetFavcyToken = async () => {
    try {
      if (count == 0) {
        setToggleModal(true)
        setMessage('Please enter the topup amount')
        return
      }
      let { data: res } = await getFavcyTokenFromDB(userDataObj.phone)
      console.log(JSON.stringify(res, null, 2), "response")
      if (res) {


        Clipboard.setString(`${webUrl}topup_payment?amount=${count}&amount_in_100=${count * 100}&favcy_token=${res.data}&user_id=${userDataObj._id}`);

        const result = await Share.share({
          message:
            `${webUrl}topup_payment?amount=${count}&amount_in_100=${count * 100}&favcy_token=${res.data}&user_id=${userDataObj._id}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }

        // console.log(`${webUrl}topup_payment?amount=${count}&amount_in_100=${count * 100}&favcy_token=${res.data}&user_id=${userDataObj._id}`)
        // setTopupUrl(`${webUrl}topup_payment?amount=${count}&amount_in_100=${count * 100}&favcy_token=${res.data}&user_id=${userDataObj._id}`)
        // setLinkIsActive(true)
      }
    }
    catch (err) {
      if (err?.response?.data?.message) {
        //console.error(err?.response?.data?.message);
        alert(err?.response?.data?.message);
      }
      else {
        //console.error(err);
        alert(err);
      }
    }
  }



  const handleAmountEnter = (val) => {
    // console.log(val, "asdas")
    // console.log(`${val}`.includes("-"), "asdas")

    setCount(val.replace(/[^0-9]/g, '0'))

    // if (`${val}`.replace("-", "0") ||
    //   `${val}`.includes(",") ||
    //   `${val}`.includes(".") ||
    //   `${val}`.includes(" ")
    // ) {
    //   console.log("Number")
    // }
  }



  const handleRedirect = async (orderObj) => {
    let tempObj = orderObj
    try {
      console.log(orderObj, "orderObj")
      let OrderId = orderObj.id
      var options = {
        description: 'Topup',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: tempObj.currency,
        key: 'rzp_test_jOl57g4TNamtFW',
        // key: 'rzp_test_jOl57g4TNamtFW1',
        amount: tempObj.amount,
        name: 'Wallet',
        order_id: tempObj.id, //Replace this with an order_id created using Orders API.
        theme: { color: "#F84B4B" },
      }
      console.log(options)

    } catch (error) {
      //console.error(error)
    }
  }
  const handlePaymentCallBack = async (obj) => {
    try {

      let { data: res, status: statusCode } = await AddMoneytoUserWallet(obj)
      if (statusCode == 200 || statusCode == 304) {
        console.log(obj)
        // alert(res.message)
        // props.navigation.goBack()
        // props.navigation.navigate('Drawer', { screen: 'OrderHistory' })
      }
    } catch (error) {
      //  setWalletModal(false)
      //console.error(error)
    }
  }















  const handleSubmit = async () => {
    console.log('clicked');
    setLoading(true)
    try {
      if (count == 0) {
        setToggleModal(true)
        setMessage('Please enter the topup amount')
      }
      else {
        let orderObj2 = {
          _id: new Date().getTime(),
          price: count,
        };
        let res = await CreateTransaction(orderObj2)
        console.log(JSON.stringify(res.data.razorpayData, null, 2), "razorpayData ")
        if (res.data) {
          // console.log(res.data.message)
          // handleRedirect(res.data.razorpayData)
          handleOtpGenrate(orderObj2);
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
  };


  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <CommonHeader />
      <ScrollView>
        <ImageBackground
          source={require('../../images/bg2.png')}
          resizeMode="cover"
          style={[commonStyle.fullSize, { height: hp(84) }]}>
          <View style={[styles.mainView]}>
            <Text style={[styles.head1]}>Top Up</Text>

            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[styles.linearAdd]}>
              <TouchableOpacity
                onPress={() => add()}
                style={[
                  styles.whiteBtn,
                  { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
                ]}>
                <Add height={hp(4)} width={wp(5)} />
              </TouchableOpacity>
              <View style={[styles.whiteBtn, { width: wp(25) }]}>

                <TextInput
                  value={count}
                  maxLength={4}
                  onChangeText={e => handleAmountEnter(e)}
                  keyboardType="numeric"
                  style={{
                    fontSize: Typography.FONT_SIZE_18,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#747474',
                    marginBottom: -4
                  }}
                />

                {/* <Text style={{fontSize:16,color:'black'}}>{count}</Text> */}

              </View>
              <TouchableOpacity
                onPress={() => minus()}
                style={[
                  styles.whiteBtn,
                  { borderBottomRightRadius: 7, borderTopRightRadius: 7 },
                ]}>
                <Minus height={hp(4)} width={wp(5)} />
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={{ marginTop: Spacing.MARGIN_30 }}
              onPress={() => handleSubmit()}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 2 }}
                colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                style={[commonStyle.linearBtn]}>
                <Text style={[commonStyle.btnText]}>Top Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: Spacing.MARGIN_30 }}
              onPress={() => handleGetFavcyToken()}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 2 }}
                colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                style={[commonStyle.linearBtn]}>
                <Text style={[commonStyle.btnText]}>Generate Topup Link</Text>
              </LinearGradient>
            </TouchableOpacity>

            {
              linkIsActive &&
              <Text>asd</Text>
            }

          </View>
          <Image
            source={require('../../images/bonusTeady.png')}
            resizeMode="contain"
            style={[styles.bottonPg]}
          />
        </ImageBackground>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={topUpModal}
      >
        <View style={[commonStyle.modalBackground]}>
          <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
              <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
            </LinearGradient>
            <View style={{ width: '100%' }}>
              <Text style={[styles.listTitle1, { color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_50 }]}>{modalValue}</Text>

            </View>
            <TouchableOpacity onPress={() => setTopUpModal(false)} style={{ alignSelf: 'center', marginBottom: hp(2) }} >
              <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                <View style={[styles.btnView, { margin: 1, borderRadius: 30, width: '99%' }]}>
                  <Text style={[commonStyle.btnText, { color: PRIMARY }]}>Ok</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      {/* <View style={styles.centeredView}> */}
      <Modal animationType="slide" transparent={true} visible={walletModal}>
        <View style={[commonStyle.modalBackground]}>
          <View
            style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW }]}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[commonStyle.linearModal]}>
              <Image
                source={require('../../images/modalTeady.png')}
                resizeMode="contain"
                style={[commonStyle.modalTeady]}
              />
            </LinearGradient>
            <Text style={[styles.head1]}>{props?.route?.params?.data?.price} INR</Text>
            <Text style={[styles.head2, { fontSize: Typography.FONT_SIZE_15 }]}>
              Successfully Top Up
            </Text>
            <Text style={[styles.head2, { fontSize: Typography.FONT_SIZE_15 }]}>
              The Amount would take 60 minutes in order to reflect in your wallet
            </Text>

            <View
              style={[
                commonStyle.flexRow,
                { alignSelf: 'center', marginVertical: Spacing.MARGIN_30 },
              ]}>
              <Text
                style={[
                  styles.head2,
                  {
                    fontSize: Typography.FONT_SIZE_14,
                    fontFamily: 'Montserrat-Regular',
                  },
                ]}>
                My wallet amount
              </Text>
              <Text
                style={[
                  styles.head2,
                  {
                    fontSize: Typography.FONT_SIZE_16,
                    color: Colors.PRIMARY,
                    marginLeft: Spacing.PADDING_7,
                    fontFamily: 'Montserrat-Regular',
                  },
                ]}>
                {walletObj?.amount} INR
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setWalletModal(false)}>
            <AntDesign
              name={ANTDESIGN.CIRCEL_CLOSE}
              color={Colors.WHITE}
              size={Spacing.SIZE_40}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: Spacing.MARGIN_20,
  },
  btnView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: Spacing.PADDING_2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  head1: {
    fontSize: Typography.FONT_SIZE_25,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.LIGHT_BLACK,
    textAlign: 'center',
    marginTop: Spacing.MARGIN_100,
  },
  head2: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#747474',
    textAlign: 'center',
    alignSelf: 'center',
  },
  linearAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.PADDING_2,
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: Spacing.MARGIN_15,
  },
  whiteBtn: {
    height: hp(6),
    width: wp(14),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottonPg: {
    position: 'absolute',
    bottom: 37,
    right: 20,
    zIndex: -10,
    height: hp(20),
    width: wp(36),
    //backgroundColor:'red'
  },
  listTitle1: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    textAlign: 'center'
  },
});
