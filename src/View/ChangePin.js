import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { authContext } from '../Context/AuthContext';
import { getPhoneNumber, pinUpdate } from '../api/user';
import LoginHeader from '../Component/LoginHeader';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { LoaderContext, toggleModalContext } from '../../App';


export default function ChangePin(props) {
    const focused = useIsFocused()
    const [isAuthorised, setIsAuthorised] = useContext(authContext);
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
                    console.log(phone)
                    let obj = {
                        pin: pin,
                        newpin: confirmPin,
                        phone: phone,
                    }
                    let { data: res } = await pinUpdate(obj)
                    console.log(JSON.stringify(res.message, null, 2), "asasdasd")
                    if (res.message) {
                        if (isAuthorised) {
                            props.navigation.navigate("DashboardStack")
                        }
                        else {
                            props.navigation.navigate("LoginParent")
                        }
                        // alert(res.message)
                        setToggleModal(true)
                        setMessage(res.message)
                    }
                }
                else {
                    setToggleModal(true)
                    setMessage("Pin should be 4 digits")
                    //  alert("Pin should be 4 digits")
                }
            }
            else {
                setToggleModal(true)
                setMessage("Pin does not match with confirm pin")
                // alert("Pin does not match with confirm pin")
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
            <ImageBackground source={require('../images/shippingBg.png')} style={[commonStyle.fullSize]}>
                {
                    loading ?
                        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color="#000" size="large" />
                        </View>
                        :
                        <>
                            <LoginHeader />

                            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                                <Text style={[styles.title]}>Set New Pin</Text>
                                <Text style={[styles.label]}>New PIN</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter PIN' onChangeText={(val) => setPin(val)} value={pin} maxLength={4} keyboardType='number-pad' secureTextEntry={true} style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>
                                <Text style={[styles.label]}>Confirm PIN</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Confirm 4-digit PIN' onChangeText={(val) => setConfirmPin(val)} maxLength={4} value={confirmPin} keyboardType='numeric' secureTextEntry={true} style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>

                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>
                                    <TouchableOpacity onPress={() => setUserPin()} style={{ marginTop: Spacing.MARGIN_15 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                            <View style={[styles.btnView, { width: "100%" }]}>
                                                <Text style={[styles.btnText, { color: Colors.WHITE }]}>Update Pin</Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>



                                </View>
                            </View>
                        </>
                }
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
        width: "99.5%",
        borderRadius: 30,
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
