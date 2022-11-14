import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    Modal
} from 'react-native';
import commonStyle from '../../Styles/commonStyle';
import Css from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CommonHeader from '../../Component/CommonHeader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
    sendOtp,
    setFavcyAuthToken,
    setPhoneNumber,
    verifyOtp,
} from '../../api/user';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function OtpVerifyPlansSelection(props) {
    const focused = useIsFocused();

    const [otp, setOtp] = useState('');
    const [token, setToken] = useState('');

    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);


    const resendOtp = async () => {
        setLoading(true)
        try {
            let formData = new FormData();
            formData.append('otp_mobile_num', props?.route?.params?.data);
            formData.append('otp_mobile_cc', 91);
            const { data: response } = await sendOtp(
                formData,
                props?.route?.params?.token,
            );
            if (response.status == 200 || response.status == 201) {
                setToggleModal(true)
                setMessage(response.data.message)

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

    const verifyOtpFunction = async () => {
        setLoading(true)
        try {
            let formData = new FormData();
            formData.append('otp_mobile_num', props?.route?.params?.data);
            formData.append('otp_mobile_cc', 91);
            formData.append('otp', otp);
            const res = await verifyOtp(formData, props?.route?.params?.token);
            console.log(res, 'verify');
            if (res.data.data) {
                console.log(
                    JSON.stringify(res.data.data.auth_token, null, 2),
                    'favcy token',
                );
                await setFavcyAuthToken(res.data.data.auth_token);
                console.log(props.route.params.obj, 'object');
                console.log(props.route.params.orderObj, "order Obj")
                props.navigation.navigate('PaymentAfterLogin', {
                    obj: props.route.params.obj,
                    orderObj: props.route.params.orderObj,
                });
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
            <ImageBackground
                source={require('../../images/bg2.png')}
                style={[commonStyle.fullSize]}>
                <View
                    style={{
                        height: hp(100),
                        width: wp(100),
                        display: loading ? "flex" : 'none',
                        zIndex: loading ? 150 : -10,
                        position: "absolute",
                        top: 0,
                        backgroundColor: "transparent",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator color="#000" size="large" />
                </View>
                <View style={{
                    display: loading ? "none" : 'flex',
                    zIndex: loading ? -10 : 150,
                }}>
                    <CommonHeader />
                    <View
                        style={{
                            paddingHorizontal: Spacing.MARGIN_15,
                            marginTop: Spacing.MARGIN_70,
                        }}>
                        <View style={{ backgroundColor: '#C9E165', borderRadius: 20 }}>
                            <ImageBackground
                                source={require('../../images/otpCard.png')}
                                resizeMode="stretch"
                                style={[styles.card]}>
                                <Text
                                    style={{
                                        fontFamily: 'Cookies',
                                        fontSize: Typography.FONT_SIZE_20,
                                        color: '#fff',
                                    }}>
                                    Hello {props.route.params.name}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Cookies',
                                        width: wp(35),
                                        fontSize: Typography.FONT_SIZE_20,
                                        marginTop: hp(2),
                                        color: '#fff',
                                    }}>
                                    Thank you{' '}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Cookies',
                                        width: wp(50),
                                        fontSize: Typography.FONT_SIZE_20,
                                        color: '#fff',
                                    }}>
                                    for registering
                                </Text>
                            </ImageBackground>
                            <Text style={[styles.heading]}>
                                OTP  will be sent to your registered mobile number
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    alignSelf: 'center',
                                    marginTop: 24,
                                    height: 100,
                                    width: wp(80)
                                }}>
                                <OTPInputView
                                    containerStyle={{ width: '80%', height: 10 }}
                                    textInputStyle={{ height: 100 }}
                                    pinCount={6}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={code => {
                                        setOtp(code);
                                    }}
                                />
                            </View>
                            <View
                                style={[
                                    commonStyle.flexRow,
                                    {
                                        justifyContent: 'space-between',
                                        paddingHorizontal: Spacing.MARGIN_15,
                                        marginBottom: Spacing.MARGIN_20,
                                    },
                                ]}>
                                <Text style={[styles.bottomTxt]}>Didn’t get the code?</Text>
                                <TouchableOpacity onPress={() => resendOtp()}>
                                    <Text style={[styles.bottomTxt, { color: Colors.PRIMARY }]}>
                                        Tap here to resend
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.flexRow,
                            { justifyContent: 'space-around', marginTop: 35 },
                        ]}>
                        <LinearGradient
                            colors={['#AA23AD', '#785BDF']}
                            style={styles.linearGradientView}>
                            <Pressable
                                style={[styles.linearBg]}
                                onPress={() => verifyOtpFunction()}>
                                <Text style={[styles.btnText]}>Next</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>

        </View>
    );
}
const styles = {
    card: {
        height: hp(25),
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: Spacing.MARGIN_10,
        justifyContent: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_13,
        color: '#353535',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.MARGIN_25,
    },
    input: {
        borderBottomWidth: 2,
        borederColor: Colors.PRIMARY,
    },
    bottomTxt: {
        fontSize: Typography.FONT_SIZE_12,
        color: '#353535',
        fontFamily: 'Montserrat-Regular',
    },
    underlineStyleBase: {
        width: 25,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#AA23AD',
        color: '#AA23AD',
        fontSize: 15,
    },
    linearGradientView: {
        height: 40,
        width: wp(90),
        display: 'flex',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 2,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
    },
    underlineStyleHighLighted: {
        borderColor: '#AA23AD',
    },
};
