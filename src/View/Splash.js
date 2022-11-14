import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, refContext, toggleModalContext } from '../../App';
import { CheckValidReferral } from '../api/user';
import Logo from '../images/svg/headLogo';
import commonStyle from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

import WebView from 'react-native-webview';

export default function Splash(props) {
    const [videoModal, setVideoModal] = useState(false)
    const [discountCode, setDiscountCode] = useState("");
    const [ref, setRef] = useContext(refContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [isFirstTimeUserValue, setIsFirstTimeUserValue] = useState(false);
    const onBuffer = () => {

    }
    const videoError = () => {

    }



    // const handleNavigationToLogin = () => {
    //     if (ref != "" && ref.length > 2) {
    //         props.navigation.navigate("Login")
    //     }
    //     else {
    //       //  alert("Please enter a discount code")
    //         setToggleModal(true)
    //             setMessage("Please enter a discount code")
    //     }

    // }

    const handleNavigationToLogin = async () => {
        try {
            setLoading(true)
            setVideoModal(false);
            // alert("asdad")

            if (discountCode != "" && discountCode.length > 0) {
                let { data: res } = await CheckValidReferral({ referralCode: discountCode })
                if (res.success) {
                    setToggleModal(true)
                    setMessage(res.message)
                    console.log(res)
                    setLoading(false)

                    console.log('abref', discountCode)
                    setRef(discountCode)
                    props.navigation.navigate("Login")

                }
            }
            else {
                setVideoModal(true);
                setLoading(false)
                setToggleModal(true)
                setMessage("Invalid referal code entered")
            }
        }
        catch (err) {
            setLoading(false)
            setVideoModal(true);

            if (err.response.data.message) {
                //console.error(err.response.data.message)
                setToggleModal(true)
                setMessage(err.response.data.message)
            }
            else {
                //console.error(err)
                setToggleModal(true)
                setMessage(err)

            }
        }

    }


    const focused = useIsFocused()

    const getIsFirstTimeUser = async () => {
        let isFirstTimeUser = await EncryptedStorage.getItem("isFirstTimeUser");
        if (isFirstTimeUser) {
            setIsFirstTimeUserValue(isFirstTimeUser)
            props.navigation.navigate("Login")
        }
        else {
            setIsFirstTimeUserValue(false)
        }
    }


    const setIsFirstTimeUser = async () => {
        setIsFirstTimeUserValue(previousValue => {
            previousValue = !previousValue
            return previousValue
        })
        let isFirstTimeUser = await EncryptedStorage.setItem("isFirstTimeUser", `${isFirstTimeUserValue}`);
    }


    useEffect(() => {
        if (focused) {
            getIsFirstTimeUser()
        }
    }, [focused])


    // console.log('ref', ref)
    // console.log('123', discountCode)
    return (
        <View>
            <View style={[styles.head]}>
                <Logo height={hp(7)} width={wp(45)} />
            </View>
            <LinearGradient colors={[Colors.GRADIENT1, Colors.GRADIENT2]} style={styles.linearGradient}>
                <Text style={[styles.heading]}>Having hard time teaching your kids about money and good habits?</Text>

                <Image source={require('../images/home.png')} resizeMode='contain' style={styles.homeImg} />
                <View>
                    {/* <TouchableOpacity onPress={() => isFirstTimeUserValue ? props.navigation.navigate("Login") : setVideoModal(true)} style={[styles.btn]}>
                        <Text style={[styles.btnText]}>Begin Journey</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => isFirstTimeUserValue ? (props.navigation.navigate("Login")) : (setVideoModal(true))} style={[styles.btn]}>
                        <Text style={[styles.btnText]}>Begin Journey</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg,]}>
                        <View style={[styles.video]}>
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                javaScriptEnabled={true}
                                allowsFullscreenVideo={true}
                                domStorageEnabled={true}
                                injectedJavaScript={`
                                                        document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
                                               `}
                                scrollEnabled={false}
                                style={{ width: "100%", height: "100%" }}
                                source={{ uri: "https://www.youtube.com/embed/hciKtXJxe3A" }}
                            />

                        </View>
                        <View style={{ paddingVertical: Spacing.PADDING_20, paddingHorizontal: Spacing.PADDING_20 }}>
                            <TextInput placeholder='Apply Referral Code' onChangeText={e => setDiscountCode(e)} value={discountCode} style={[styles.input]} />
                            <TouchableOpacity onPress={() => handleNavigationToLogin()} style={{ marginTop: Spacing.PADDING_15 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText1,]}>Apply</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 15 }} >
                                {/* <CheckBox
                                    style={{ marginRight: hp(0.5), }}
                                    onClick={() => setIsFirstTimeUser()}
                                    isChecked={isFirstTimeUserValue}
                                /> */}
                                <Text style={{ color: Colors.GRADIENT1 }}>Don't Show again</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { setVideoModal(false); props.navigation.navigate("Login") }} style={{ borderWidth: 2, borderColor: '#FFF', height: hp(6), width: hp(6), alignItems: 'center', justifyContent: 'center', borderRadius: 30 }}>
                        <Text style={[styles.btnText1, { fontSize: Typography.FONT_SIZE_12 }]}>Skip</Text>

                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: hp(10),
        width: wp(15)
    },
    header: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.MARGIN_5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    linearGradient: {
        height: '100%',
        width: '100%',
        padding: Spacing.MARGIN_20
    },
    heading: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.WHITE,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_40,
        width: '94%',
        lineHeight: Spacing.MARGIN_30,
    },
    homeImg: {
        height: hp(47),
        width: wp(80),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_40
    },
    btnText: {
        backgroundColor: '#C9E165',
        borderRadius: 20,
        width: '100%',
        paddingVertical: Spacing.MARGIN_10,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_18,
        color: '#525252',
        fontFamily: 'Montserrat-SemiBold'
    },
    btn: {
        marginTop: Spacing.MARGIN_40,
        alignItems: 'center',
    },
    head: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnView: {
        width: '99%',
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
    btnText1: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_5,
    },
    input: {
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 30,
        fontSize: 15,
        height: hp(6.5),
        color: '#000',
        borderColor: '#BFBFBF'
    },
    video: {
        width: '100%',
        height: hp(35),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
})