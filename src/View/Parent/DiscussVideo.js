import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { images } from '../../Constant/background';
import { Colors, Typography, Spacing } from '../../Styles/theme';
import Add from '../../images/svg/parentsvg/add';
import Minus from '../../images/svg/parentsvg/minus';
import Check from '../../images/svg/parentsvg/check';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { handleUpdateVideoCompletionStatus } from '../../api/KidVideoCompletion';
import WebView from 'react-native-webview';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { toggleModalContext } from '../../../App';
import { KidMissionCompletionStatus } from '../../api/utils/StatusForKidMissionCompletionStatus';

export default function DiscussVideo(props) {
    const [approveModal, setApproveModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [videoObj, setVideoObj] = useState(props.route.params.data);
    const [count, setCount] = useState('0');
    const [reason, setReason] = useState("");
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const focused = useIsFocused();
    const navigation = useNavigation();
    const add = () => {
        let tempCount = parseInt(count) + 1
        tempCount = tempCount ? tempCount : 1
        setCount(`${tempCount}`)
    }
    const minus = () => {
        let tempCount = parseInt(count) - 1
        tempCount = tempCount ? tempCount : 1
        setCount(`${tempCount}`)
    }



    const handleAcceptApproval = async () => {
        try {
            if (count == "" || count == '0') {
                setToggleModal(true)
                setMessage("Amount cannot be 0, please add amount")
                return;
            }
            else if (reason == "") {
                setToggleModal(true)
                setMessage("Please add a reason")
                return;
            }
            else {
                let obj = {
                    status: KidMissionCompletionStatus.completed,
                    amount: parseInt(count),
                    reason,
                }
                console.log(obj, "object")
                let { data: res } = await handleUpdateVideoCompletionStatus(videoObj._id, obj)
                if (res.message) {
                    setApproveModal(false)
                    navigation.goBack()
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
    }


    const handleAmountAdd = (e) => {
        let value = `${e}`.replace("-", "1")
        value = `${value}`.replace(',', '1')
        value = `${value}`.replace('.', '1')
        value = `${value}`.replace(' ', '1')
        setCount(value)
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={images.backGround} resizeMode='contain' style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.MARGIN_20, paddingBottom: Spacing.MARGIN_30 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "android" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <Text style={[commonStyle.title, { color: '#525252', marginTop: Spacing.MARGIN_20, fontSize: Typography.FONT_SIZE_30 }]}>Let’s Discuss</Text>
                        <View style={[styles.view]}>


                            <View style={[styles.imgView,]}>
                                {
                                    focused &&
                                    <WebView
                                        mediaPlaybackRequiresUserAction={true}
                                        allowsInlineMediaPlayback={true}
                                        allowsFullscreenVideo
                                        androidLayerType="software"
                                        androidHardwareAccelerationDisabled={true}
                                        style={[{ width: wp(50), opacity: 0.99 }]}
                                        source={{ uri: videoObj?.videoUrl }}
                                    />
                                }
                                {/* <Image source={require('../../images/product.png')} resizeMode='cover' style={[styles.img]} /> */}
                                <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15 }}>
                                    <Text style={[styles.title]}>{videoObj?.userVideoObj?.videoHeading}</Text>
                                    <Text style={[styles.listContain]}>Duration</Text>

                                    <View style={[commonStyle.flexRow]}>
                                        <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Reward</Text>
                                        <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{videoObj?.userVideoObj?.reward} INR</Text></View>
                                    <View style={[commonStyle.flexRow]}>
                                        <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Bonus</Text>
                                        <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{videoObj?.userVideoObj?.bonus} INR</Text>
                                    </View>
                                </View>
                            </View>






                            <Text style={[styles.listSubTitle, { marginTop: Spacing.MARGIN_20 }]}>Total</Text>
                            <Text style={[styles.listInr]}>{videoObj?.userVideoObj?.reward + videoObj?.userVideoObj?.bonus} INR</Text>

                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_10 }]}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                                    <TouchableOpacity onPress={() => add()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                                        <Add height={hp(4)} width={wp(5)} />
                                    </TouchableOpacity>
                                    <View style={[styles.whiteBtn, { marginHorizontal: 2, width: wp(12) }]}>
                                        {/* <Text style={{ fontSize: Typography.FONT_SIZE_17, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{count}</Text> */}
                                        <TextInput
                                            value={count}
                                            onChangeText={e => handleAmountAdd(e)}
                                            keyboardType="number-pad"
                                            style={{
                                                fontSize: Typography.FONT_SIZE_17,
                                                fontFamily: 'Montserrat-SemiBold',
                                                color: '#747474',
                                            }}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => minus()} style={[styles.whiteBtn, { borderBottomRightRadius: 7, borderTopRightRadius: 7 }]}>
                                        <Minus height={hp(4)} width={wp(5)} />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                            <Text style={[styles.listSubTitle, { marginTop: Spacing.MARGIN_25 }]}>Add Remark</Text>
                            <TextInput style={[styles.input]} onChangeText={(e) => setReason(e)} value={reason} />
                            <TouchableOpacity onPress={() => setApproveModal(true)}>
                                <Check height={hp(7)} width={wp(12)} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_10 }} />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={approveModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>Are you sure you want to approve this video?</Text>
                            <Text style={[styles.listSubTitle, { color: Colors.LIGHT_BLACK, width: '80%', alignSelf: 'center', marginTop: Spacing.MARGIN_15, fontSize: Typography.FONT_SIZE_15 }]}>If yes, the reward will be sent to your child's wallet.</Text>
                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, marginTop: Spacing.MARGIN_70 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => handleAcceptApproval()}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setApproveModal(false)} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setApproveModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        borderWidth: 2,
        padding: Spacing.MARGIN_20,
        borderRadius: 20,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        marginTop: Spacing.MARGIN_15,
        marginBottom: Spacing.MARGIN_50
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
    listSubTitle: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
    listInr: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        marginRight: Spacing.MARGIN_20,
        textAlign: 'center',
        alignSelf: 'center'
    },
    linearAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.PADDING_2,
        alignSelf: 'center',
        borderRadius: 7,
    },
    whiteBtn: {
        height: hp(6.1),
        width: wp(7),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        marginHorizontal: Spacing.MARGIN_10,
        marginTop: Spacing.PADDING_7,
        borderRadius: 15,
        minHeight: hp(10),
        maxHeight: hp(10)
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
    },
    img: {
        height: hp(20),
        width: wp(45),
        borderRadius: 20,
    },
    title: {
        fontSize: Typography.FONT_SIZE_17,
        width: '70%',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY
    },
    inr: {
        fontSize: Typography.FONT_SIZE_15,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_4
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_15,
        width: '100%',
        height: hp(20),
    },
    listContain: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_13,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
    },
})