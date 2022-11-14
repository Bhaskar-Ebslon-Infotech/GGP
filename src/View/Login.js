import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getPhoneNumber, getUserDataFromBackend, removePhoneNumber, setPhoneNumber } from '../api/user';
import Header from '../Component/CommonHeader';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import EncryptedStorage from 'react-native-encrypted-storage';
import { LoaderContext, toggleModalContext } from '../../App';

export default function Login(props) {
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [phone, setPhone] = useState(``);
    const getUserData = async () => {
        setLoading(true)
        try {
            await removePhoneNumber();
                   let obj = {
                phone: phone
            }
            await setPhoneNumber(phone);
            let { data: res } = await getUserDataFromBackend(obj)
            if (res.data) {
                if (res.data.pin != "" && res.data.pin) {
                    setPhone("")
                    props.navigation.navigate("LoginOption")
                }
                else {
                    setPhone("")
                    props.navigation.navigate("CreatePin")
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

    const getDataOnInit = async () => {
        let tempPhone = await getPhoneNumber()
        if (tempPhone && tempPhone != "") {
            setPhone(tempPhone)
        }
        else {
            setPhone("")
        }
    }


    useEffect(() => {
        if (focused) {
            setPhone("")
            getDataOnInit()
        }
    }, [focused])



    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/bg2.png')} resizeMode='cover' style={[commonStyle.fullSize,]}>
                {
                    loading ?
                        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color="#ffffff" size="large" />
                        </View>
                        :
                        <>
                            <Header />
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBg]} >
                                <View style={{ paddingVertical: Spacing.MARGIN_50 }}>
                                    <Text style={[commonStyle.title, styles.title]}>Welcome to Good Good Piggy</Text>
                                    <Text style={[styles.contain]}>The next-gen digital piggy bank and habit builder to help raise good good kids!</Text>
                                </View>
                            </LinearGradient>
                            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), marginTop: Spacing.MARGIN_50 }]} >
                                    <View style={[styles.btnView, { borderRadius: 40, backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter mobile number' onChangeText={(val) => setPhone(val)} value={phone} keyboardType='numeric' maxLength={10} style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>

                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>
                                    <TouchableOpacity onPress={() => getUserData()} style={{ marginTop: Spacing.MARGIN_20 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                            <View style={[styles.btnView]}>
                                                <Text style={[styles.btnText, { color: Colors.WHITE }]}>Sign In</Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: Spacing.MARGIN_20 }} onPress={() => props.navigation.navigate("Register")}>
                                        <Text style={[styles.txt]}>New User?</Text>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                            <View style={[styles.btnView,]}>
                                                <Text style={[styles.btnText, { color: '#fff' }]}>Sign Up</Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                }
                <Image source={require('../images/bonusTeady.png')} resizeMode='contain' style={[commonStyle.bottonPg]} />
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
        // marginBottom: Spacing.MARGIN_30,
        fontSize: Typography.FONT_SIZE_20,
        // width: '56%',
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
        // marginBottom: Spacing.MARGIN_60
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
        fontSize: Typography.FONT_SIZE_15,
        // fontWeight: '600',
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: Spacing.MARGIN_40,
    },
    txt: {
        fontSize: Typography.FONT_SIZE_13,
        color: '#747474',
        fontFamily: 'Montserrat-Regular',
        marginBottom: 5
    },
    //     bottonPg:{
    //         position:'absolute',
    //         bottom:37,
    //         right:20,
    // zIndex:-10,
    // height:hp(20),
    // width:wp(36),
    // //backgroundColor:'red'
    //     }
})
