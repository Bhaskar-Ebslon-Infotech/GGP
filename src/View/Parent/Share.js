import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Share, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { images } from '../../Constant/background';
import commonStyle from '../../Styles/parentStyle';
import CommonHeader from '../../Component/CommonHeader';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import QRCode from 'react-native-qrcode-svg';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Fb from '../../images/svg/parentsvg/fb';
import Insta from '../../images/svg/parentsvg/insta';
import Twitter from '../../images/svg/parentsvg/twitter';
import Whatsapp from '../../images/svg/parentsvg/whatsapp';
import { useIsFocused } from '@react-navigation/native';
import { userData } from '../../api/user';
import { LoaderContext, toggleModalContext } from '../../../App';
import WebView from 'react-native-webview';

export default function Shares() {
    const base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const [userObj, setUserObj] = useState({});
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const onBuffer = () => {

    }
    const videoError = () => {

    }

    const getUserDataObj = async () => {
        setLoading(true)
        try {
            let { data: res } = await userData()
            if (res.data) {
                console.log(JSON.stringify(res.data, null, 2), "Asdas")
                setUserObj(res.data)
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


    const onShare = async () => {
        setLoading(true)
        try {
            const result = await Share.share({
                message:
                    `Good Good Piggy is an awesome platform join using my referral code ${userObj.referalCode}`,
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
            getUserDataObj()
        }
    }, [focused])


    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <CommonHeader />
                <ScrollView contentContainerStyle={{ paddingBottom: Spacing.MARGIN_50 }}>
                    <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535', marginTop: Spacing.MARGIN_20, marginBottom: Spacing.MARGIN_10 }]}>Share and Earn</Text>

                    <View style={styles.video}>
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
                            source={{ uri: "https://www.youtube.com/embed/VSN-zVYx3-Y" }}
                        />
                    </View>

                    <Text style={[styles.amount]}>{userObj.referalCode}</Text>
                    <Text style={[styles.amountText]}>Referral Code</Text>
                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_25 }]}>
                        <TouchableOpacity onPress={onShare} style={{ marginRight: Spacing.PADDING_7 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 2, borderRadius: 5 }]} >
                                <View style={[styles.whiteBtn]}>
                                    <Text style={[styles.copy]}>Share Link</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={onShare} style={{ marginRight: Spacing.PADDING_7 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 2, borderRadius: 5, width: wp(25) }]} >
                                <View style={[styles.whiteBtn, { paddingVertical: Spacing.PADDING_2 }]}>
                                                                      <Image source={require('../../images/fb.png')} resizeMode='center' style={{height:hp(5),width:wp(8)}}/>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity onPress={onShare}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 2, borderRadius: 5, width: wp(25) }]} >
                                <View style={[styles.whiteBtn, { paddingVertical: Spacing.PADDING_2 }]}>
                                   
                                    <Image source={require('../../images/in.png')} resizeMode='center' style={{height:hp(5),width:wp(8)}}/>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>
                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_10 }]}>
                        {/* <TouchableOpacity onPress={onShare} style={{ marginRight: Spacing.PADDING_7 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 2, borderRadius: 5, width: wp(25) }]} >
                                <View style={[styles.whiteBtn, { paddingVertical: Spacing.PADDING_2 }]}>
                                                                        <Image source={require('../../images/tw.png')} resizeMode='center' style={{height:hp(5),width:wp(8)}}/>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity onPress={onShare}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 2, borderRadius: 5, width: wp(25) }]} >
                                <View style={[styles.whiteBtn, { paddingVertical: Spacing.PADDING_2 }]}>
                                                                       <Image source={require('../../images/wh.png')} resizeMode='center' style={{height:hp(5),width:wp(8)}}/>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={[styles.amountText]}>or</Text>
                    <Text style={[styles.amountText]}>Scan</Text>
                    <View style={{ width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: Spacing.MARGIN_20, marginBottom: Spacing.MARGIN_50 }}>
                        <QRCode
                            value={`Good Good Piggy is an awesome platform join using my referral code ${userObj.referalCode}`}
                            logo={{ uri: base64Logo }}
                            size={Spacing.SIZE_150}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: hp(30),
    },
    amount: {
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginTop: Spacing.MARGIN_15
    },
    amountText: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
        textAlign: 'center',
    },
    whiteBtn: {
        backgroundColor: Colors.WHITE,
        // width: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 5
    },
    copy: {
        fontSize: Typography.FONT_SIZE_14,
        // width: '70%',

        textAlign: 'center',
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})