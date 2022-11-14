import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ENTYPO } from '../Styles/theme/Icons';
import Entypo from 'react-native-vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getDecodedToken, getFavcyAuthMainToken, getKidWalletData, userData } from '../api/user';
import { LoaderContext, toggleModalContext } from '../../App';
import Home from '../images/svg/homeBtn';
import Back from '../images/svg/parentsvg/back';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export default function BlessingCode() {
    const base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    const focused = useIsFocused()
    const [favcyAuthorisationToken, setFavcyAuthorisationToken] = useState("");
    const [userId, setUserId] = useState("");
    const [kidId, setKidId] = useState("");
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [name, setName] = useState('')
    const [qrUrl, setQrUrl] = useState('');
    const navigation = useNavigation()
    const getToken = async () => {
        setLoading(true)
        try {
            let decode = await getDecodedToken()
            // console.log(decode.userId, 'decode');
            setKidId(decode.userId);

            let res = await getFavcyAuthMainToken()
            // console.log(res, 'res');
            setFavcyAuthorisationToken(res)
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


    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getKidWalletData()
            if (res.data) {
                setUserId(res.data.parentObj._id)
                // console.log(JSON.stringify(res.data, null, 2))
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
        try {
            console.log(qrUrl, "qrUrl")
            let options = {
                title: `Send Blessings to ${name} using qr or just visit this link https://admin.goodgoodpiggy.com//blessings?favcy_token=${favcyAuthorisationToken}&user_id=${userId}&kid_id=${kidId} !`,
                message: `Send Blessings to ${name} using qr or just visit this link https://admin.goodgoodpiggy.com/blessings?favcy_token=${favcyAuthorisationToken}&user_id=${userId}&kid_id=${kidId} !`,
                url: `${qrUrl}`,
                type: 'image/jpeg',
            };
            console.log(JSON.stringify(options, null, 2))
            // Share.open(options)
            // .then((res) => {
            //     console.log(res);
            // })
            // .catch((err) => {
            //     err && console.log(err);
            // });
            Share.open(options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                });
            // if (result.action === Share.sharedAction) {
            //     if (result.activityType) {
            //         // shared with activity type of result.activityType
            //     } else {
            //         // shared
            //     }
            // } else if (result.action === Share.dismissedAction) {
            //     // dismissed
            // }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (focused) {
            getToken()
            getUserData()
            getuser()
        }
    }, [focused])

    const getuser = async () => {
        setLoading(true)
        try {
            let { data: res } = await userData()
            if (res.data) {
                // console.log(res.data.firstName,'hujhi')
                setName(res.data.firstName)
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




    const onCapture = async (data) => {
        try {

            console.log(data)
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    RNFS.readFile(data, 'base64').then((res) => {
                        console.log(res, "res")
                        let urlString = 'data:image/jpeg;base64,' + res;
                        console.log(urlString)
                        setQrUrl(urlString)
                    });

                }
            } else {
                // iOS here, so you can go to your Save flow directly
            }
        }

        catch (err) {
            //console.error(err)
        }

    }

    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_80 }]}>{name}'s Piggy Bank</Text>
                <Text style={[styles.text]}>Scan</Text>

                <ViewShot onCapture={onCapture} captureMode="mount" options={{ format: "jpg", quality: 0.9 }}>
                    <View style={{ width: '49%', alignSelf: 'center' }}>
                        <QRCode
                            value={`https://admin.goodgoodpiggy.com/blessings?favcy_token=${favcyAuthorisationToken}&user_id=${userId}&kid_id=${kidId}`}
                            logo={{ uri: base64Logo }}
                            size={Spacing.SIZE_200}
                            logoBackgroundColor='transparent'
                        />
                        <Pressable onPress={() => onShare()}>
                            <Entypo name={ENTYPO.SHARE} size={Spacing.MARGIN_25} color={Colors.PRIMARY} style={{ marginTop: Spacing.MARGIN_10 }} />
                        </Pressable>
                    </View>
                </ViewShot>
                <View style={[styles.imgView]}>
                    <Image source={require('../images/piggy.png')} resizeMode='stretch' style={[styles.img]} />
                </View>
            </ScrollView>

        </>
    )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: '600',
        color: '#747474',
        textAlign: 'center',
        marginTop: Spacing.MARGIN_50,
        marginBottom: Spacing.MARGIN_20
    },
    imgView: {
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_45,
        paddingHorizontal: Spacing.MARGIN_30
    },
    img: {
        height: hp(28),
        width: wp(90)
    },
    bottomView: {
        backgroundColor: Colors.WHITE,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: wp(100),
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})