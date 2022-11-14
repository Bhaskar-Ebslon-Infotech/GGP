import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { authContext } from '../Context/AuthContext';
import { generateGuestToken, getPhoneNumber, getValidSubscription, loginUser, sendOtp, setAuthToken, setFavcyMainAuthToken, setPhoneNumber, setRoleString } from '../api/user';
import LoginHeader from '../Component/LoginHeader';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { RoleContext } from '../Context/RoleContext';
import { LoaderContext, toggleModalContext } from '../../App';
export default function LoginParent(props) {
    const [isAuthorized, setIsAuthorized] = useContext(authContext);
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const [check, isCheck] = useState(false);
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [token, setToken] = useState("");
    const [role, setRole] = useContext(RoleContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [redirectToPlansPage, setRedirectToPlansPage] = useState(false);
    const handleLoginUser = async () => {
        setLoading(true)
        try {
            if (pin.length < 4) {
                // alert("Not a Valid Pin")
                setLoading(false)

                setToggleModal(true)
                setMessage("Not a Valid Pin")
                setLoading(false)
                return;
            }
            else if (phone.length < 10) {
                setLoading(false)
                // alert("Not a Valid Phone Number")
                setToggleModal(true)
                setMessage("Not a Valid Phone Number")
                setLoading(false)
                return;
            }
            else {
                console.log("No response yet 1")
                let { data: tempFavcyTokenResponse } = await generateGuestToken()
                console.log("No response yet")
                console.log(tempFavcyTokenResponse, "tempFavcyTokenResponse")
                if (tempFavcyTokenResponse.data) {
                    let obj = {
                        phone,
                        pin,
                        token: tempFavcyTokenResponse.data.token
                    }
                    let { data: res } = await loginUser(obj);
                    console.log(res, "res")
                    if (res.data) {

                        let { data: validSubscriptionRes } = await getValidSubscription(res.data.userId);
                        if (validSubscriptionRes.data.hasActivePackage) {
                            console.log(res.role, "role")
                            await setFavcyMainAuthToken(res.data.favcyToken);
                            await setAuthToken(res?.data.accessToken);
                            setRole(res.role)
                            await setRoleString(res.role);
                            setIsAuthorized(true);
                            setLoading(true)
                            props.navigation.navigate('DashboardStack', { screen: 'Dashboard' });
                        }
                        else {
                            console.log("does not have Package")
                            await setFavcyMainAuthToken(res.data.favcyToken);
                            await setAuthToken(res?.data.accessToken);
                            setRole(res.role)
                            await setRoleString(res.role);
                            setIsAuthorized(false);
                            setLoading(false)
                            props.navigation.navigate('Plans');
                        }


                        console.log(validSubscriptionRes, "validSubscriptionRes")



                    }
                }
            }
        }
        catch (error) {
            console.log(error, "error")
            console.log(error?.response?.data?.message, "error?.response?.data?.message")
            console.log(error?.message, "error?.message")


            if (error?.response?.data?.message) {
                if (error.response.data.message == "Please Purchase a subscription to login!") {
                    console.log("true")
                }
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
        let phone = await getPhoneNumber();
        console.log(phone)
        if (phone && phone != "")
            setPhone(phone);
        else
            setPhone("");
    }

    const handleForgetPin = async () => {
        console.log(phone, "phone")
        if (phone.length < 10 && phone.length >= 0) {
            //  alert("Please enter a valid phone number")
            setToggleModal(true)
            setMessage("Please enter a valid phone number")
        }
        else {
            let formData = new FormData();
            //console.log(phone)
            formData.append('otp_mobile_num', phone);
            formData.append('otp_mobile_cc', 91);
            let { data: res } = await generateGuestToken();
            console.log(res, 'response from generate guest token');
            if (res.data) {
                setToken(res.data.token);
                console.log('guest token', res.data.token);
                const { data: responseData } = await sendOtp(formData, res.data.token);
                console.log(responseData, 'otp Sent');
                if (responseData.status == 200 || responseData.status == 201) {
                    // alert(responseData.data.message);
                    setToggleModal(true)
                    setMessage(responseData.data.message)
                    await setPhoneNumber(phone);
                    props.navigation.navigate('OtpVerifyForgotPassword', {
                        data: phone,
                        token: res.data.token
                    });
                }
            }


            // props.navigation.navigate("OtpVerifyForgotPassword", { data: phone })
        }
    }



    useEffect(() => {
        if (focused) {
            getDataOnInit()
        }
    }, [focused])

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
                            <View style={{ paddingHorizontal: Spacing.MARGIN_25 }}>
                                <Text style={[styles.title]}>I am a Parent</Text>
                                <Text style={[styles.label]}>Mobile Number</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter Mobile Number' onChangeText={(val) => setPhone(val)} value={phone} keyboardType='numeric' maxLength={10} style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>
                                <Text style={[styles.label]}>PIN</Text>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { height: hp(6.5), }]} >
                                    <View style={[styles.btnView, { backgroundColor: Colors.WHITE, }]}>
                                        <TextInput placeholder='Enter 4-digit PIN' onChangeText={(val) => setPin(val)} secureTextEntry={true} maxLength={4} value={pin} keyboardType='decimal-pad' style={{ paddingHorizontal: Spacing.MARGIN_15 }} />
                                    </View>
                                </LinearGradient>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hp(1) }}>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <CheckBox
                                            style={{ marginRight: hp(0.5), }}
                                            onClick={() => {
                                                isCheck(!check)
                                            }}
                                            isChecked={check}

                                        />
                                        <Text style={{ color: Colors.GRADIENT1 }}>Remember me</Text>
                                    </View> */}
                                    <TouchableOpacity onPress={() => handleForgetPin()}>
                                        <Text style={[styles.label, { marginTop: hp(0) }]}>Forgot Pin</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>
                                    <TouchableOpacity onPress={() => handleLoginUser()} style={{ marginTop: Spacing.MARGIN_15 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                            <View style={[styles.btnView]}>
                                                <Text style={[styles.btnText, { color: Colors.WHITE }]}>Login</Text>
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
        width: "100%",
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
        color: Colors.GRADIENT1,
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
