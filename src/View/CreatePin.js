import { useIsFocused } from '@react-navigation/native';
import React, { useState,useContext } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginHeader from '../Component/LoginHeader';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import EncryptedStorage from 'react-native-encrypted-storage';
import { createPin, getPhoneNumber } from '../api/user';
import { LoaderContext, toggleModalContext } from '../../App';

export default function CreatePin(props) {
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const setUserPin = async () => {
        setLoading(true)
        try {

            if (pin == confirmPin) {
                if (pin.length == 4 && confirmPin.length == 4) {
                    let phone = await getPhoneNumber()
                    let obj = {
                        pin: pin,
                        phone: phone,
                    }
                    let { data: res } = await createPin(obj)
                    console.log(JSON.stringify(res, null, 2), "asasdasd")
                    if (res.message) {
                                             //  alert("Pin created")
                        setToggleModal(true)
                        setMessage("Pin created")
                        props.navigation.navigate("LoginOption")
                    }
                }
                else {
                    setToggleModal(true)
                    setMessage("Pin should be 4 digits")
                    // alert("Pin should be 4 digits")
                }
            }
            else {
                              setToggleModal(true)
                setMessage("Pin does not match with confirm pin")
              //  alert("Pin does not match with confirm pin")
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




    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/bg2.png')} style={[commonStyle.fullSize]}>
                {
                    loading ?
                        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color="#000" size="large" />
                        </View>
                        :
                        <>
                            <LoginHeader />

                            <View style={{ paddingHorizontal: Spacing.MARGIN_20,marginTop:Spacing.MARGIN_70 }}>
                                <Text style={[styles.title]}>Create PIN</Text>
                                <Text style={[styles.label]}>PIN</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, {borderRadius:30, backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter PIN' maxLength={4} onChangeText={(val) => setPin(val)} value={pin} keyboardType='numeric' style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>
                                <Text style={[styles.label]}>Confirm PIN</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, {borderRadius:30, backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter 4-digit PIN' maxLength={4} onChangeText={(val) => setConfirmPin(val)} value={confirmPin} keyboardType='numeric' style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>

                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_40 }]}>
                                    <TouchableOpacity onPress={() => setUserPin()} style={{ marginTop: Spacing.MARGIN_15 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                            <View style={[styles.btnView]}>
                                                <Text style={[styles.btnText, { color: Colors.WHITE }]}>Create</Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>



                                </View>
                            </View>
                        </>
                }
                <Image source={require('../images/bonusTeady.png')} resizeMode='contain' style={[commonStyle.bottonPg]}/>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    linearBg: {
        //height:hp(35),
        width: '100%'
    },
    title: {
        color: Colors.WHITE,
        marginVertical: Spacing.MARGIN_30,
        fontSize: Typography.FONT_SIZE_25,
        width: '56%',
        alignSelf: 'center'
    },
    contain: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_15,
        width: '90%',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.MARGIN_60
    },
    linearBtn: {
        height: hp(5),
        width: '100%',
        borderRadius: 30,
        paddingVertical: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_2
    },
    btnView: {

        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        // fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: Spacing.MARGIN_40,
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: '#747474',
        marginTop: Spacing.MARGIN_18,
        marginBottom: Spacing.PADDING_2
    },
    title: {
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        marginBottom: Spacing.MARGIN_10,
        marginTop: Spacing.MARGIN_60,
    }
})
