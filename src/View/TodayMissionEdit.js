import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from "../../App";
import { getKidWalletData } from "../api/user";
import { addMoneyToKidsWalletForVideosCompleted, handlegetAllCompletedVideoByKidIdForToday } from "../api/UserPlaylistVideo";
import { KidMissionCompletionStatus } from "../api/utils/StatusForKidMissionCompletionStatus";
import { kidContext } from "../Context/CurrentKidContext";
import Coin from '../images/svg/coin';
import Home from '../images/svg/homeBtn';
import Money from '../images/svg/money';
import Back from '../images/svg/parentsvg/back';
import Prize from '../images/svg/prize';
import PrizeBg from '../images/svg/prizeBg';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ANTDESIGN } from '../Styles/theme/Icons';

export default function TodayMissionEdit() {
    const navigation = useNavigation();
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [kidObj, setKidObj] = useState({});
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [collectModal, setCollectModal] = useState(false);
    const [todayVideoArr, setTodayVideoArr] = useState([]);
    const focused = useIsFocused();
    const data = [
        {
            img: require('../images/rocket.png'),
        },
        {
            img: require('../images/cross.png'),
        },
        {
            img: require('../images/like.png'),
        },
    ]




    const getTodaysCompletedVideos = async () => {
        setLoading(true)
        try {
            let { data: res } = await handlegetAllCompletedVideoByKidIdForToday()
            if (res.data) {
                setTodayVideoArr(res.data)
                console.log(JSON.stringify(res.data, null, 2), "responses")
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



    const HandleCollectMoney = async () => {
        setLoading(true)
        try {
            let arr = todayVideoArr.filter(el => el?.status && el?.status == KidMissionCompletionStatus?.completed)?.map(el => el._id)
            // console.log(arr, "asdassdads")
            // console.log(todayVideoArr[0].status, "asdassdads")
            if (arr.length > 0) {
                setLoading(false)
                let { data: res } = await addMoneyToKidsWalletForVideosCompleted(arr);
                if (res.message) {
                    setCollectModal(true)
                    setToggleModal(true)
                    setMessage(res.message)
                    navigation.goBack()

                    // trigger after this response is success

                }
            }
            else {
                setToggleModal(true)
                setMessage("you do not have any completed missions for today")
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




    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getKidWalletData();
            if (res.data) {
                setKidObj(res.data)
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


    useEffect(() => {
        if (focused) {
            getTodaysCompletedVideos()
            getUserData();
        }
    }, [focused])

    const renderItem = ({ item, index }) => {
        return (
            <>
                {/* <TouchableOpacity style={[styles.close]}>

                    <Close1 name={ANTDESIGN.CLOSE} height={hp(4)} width={wp(6)} style={{ marginBottom: -Spacing.MARGIN_6, zIndex: 10, possition: 'absolute' }} />

                </TouchableOpacity> */}
                <View style={[styles.listMainView, { borderColor: item.borderColor }]}>

                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.listTitle, { width: "70%" }]}>{item.userVideoObj.videoHeading}</Text>
                        <Image source={data[index % 3].img} resizeMode='contain' style={[styles.listImg]} />
                    </View>
                    {
                        item.isUpdated ?
                            <>
                                <Text style={[styles.inr, { color: "black" }]}>Updated By Parent : {item.reason}</Text>
                                <View style={[commonStyle.flexRow, { justifyContent: 'space-between', }]}>
                                    <Text style={[styles.inr]}>INR {item.amount}</Text>
                                </View>
                            </>
                            :
                            <View style={[commonStyle.flexRow, { justifyContent: 'space-between', }]}>
                                <Text style={[styles.inr]}>INR {item.userVideoObj.bonus}</Text>
                                <View style={[commonStyle.flexRow]}>
                                    <Coin height={hp(4)} width={wp(3)} />
                                    <Text style={[styles.inr, { marginLeft: Spacing.PADDING_5 }]}>INR {item.userVideoObj.reward}</Text>
                                </View>

                            </View>

                    }
                </View>
            </>
        )
    }
    return (
        <View>
            <ImageBackground source={require('../images/bg2.png')} style={[commonStyle.fullSize]}>

                <View style={[styles.mainView]}>

                    <FlatList
                        data={todayVideoArr}
                        contentContainerStyle={{ paddingBottom: 150 }}
                        renderItem={renderItem}
                        ListHeaderComponent={
                            <>
                                <Money height={hp(15)} width={wp(20)} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30 }} />
                                <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginBottom: Spacing.MARGIN_20 }]}>Daily Videos 1 </Text>
                            </>
                        }
                        ListFooterComponent={
                            <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_30 }]}>

                                <TouchableOpacity onPress={() => { HandleCollectMoney(); }} style={{ width: '55%', }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                        <View style={[styles.btnView]}>
                                            <Text style={[styles.btnText]}>Collect Total</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <View style={[commonStyle.flexRow, { marginLeft: Spacing.MARGIN_15 }]}>
                                    <Coin height={hp(5)} width={wp(6)} />
                                    <Text style={[styles.inr, { fontSize: Typography.FONT_SIZE_20, marginLeft: Spacing.MARGIN_5 }]}>{todayVideoArr.reduce((acc, el) => acc + (el.isUpdated ? el.amount : ((el?.userVideoObj?.reward ? el?.userVideoObj?.reward : 0) + (el?.userVideoObj?.bonus ? el?.userVideoObj?.bonus : 0))), 0)} INR</Text>
                                </View>

                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />

                </View>
                <View style={[styles.bottomView]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><Home height={hp(4)} width={wp(7)} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Back height={hp(4)} width={wp(7)} /></TouchableOpacity>
                </View>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={collectModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg]}>
                        <PrizeBg style={[styles.prizeBg]} height={hp(31)} width={'100%'} />
                        <Prize style={[styles.modalPrize]} height={hp(17)} width={wp(24)} />
                        {/* <ImageBackground source={require('../images/prizeBg.png')} style={[styles.prizeBg]}>
                            <Image source={require('../images/prize.png')} resizeMode="contain" style={[styles.modalPrize]} />
                        </ImageBackground> */}


                        <Text style={[commonStyle.modalTitle]}>{kidObj.firstName} has watched videos</Text>
                        <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK }]}>Amount Earned</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                            <Coin height={hp(3)} width={wp(6)} />
                            <Text style={[styles.bottomInr, { marginLeft: Spacing.PADDING_5 }]} >{todayVideoArr.reduce((acc, el) => acc + (el.isUpdated ? el.amount : ((el?.userVideoObj?.reward ? el?.userVideoObj?.reward : 0) + (el?.userVideoObj?.bonus ? el?.userVideoObj?.bonus : 0))), 0)} INR</Text>
                        </View>
                        {/* <TeadyPrize height={hp(25)} width={wp(45)} resizeMode='contain' style={[commonStyle.modalTeady]} /> */}
                        <Image source={require('../images/teadyPrize1.png')} resizeMode='cover' style={[commonStyle.modalTeady]} />
                    </View>
                    <TouchableOpacity onPress={() => setCollectModal(false)} style={{ marginTop: Spacing.MARGIN_15 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_35} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: Spacing.MARGIN_20
    },
    listMainView: {
        padding: Spacing.MARGIN_10,
        paddingHorizontal: Spacing.MARGIN_15,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_20,
        borderColor: '#F2F4F6',
        backgroundColor: Colors.GREYBACKGROUND
    },
    listTitle: {
        fontFamily: 'MontserratH3-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: '#747474',
        fontWeight: '700',
    },
    listImg: {
        height: hp(5),
        width: wp(9)
    },
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.PRIMARY,
        fontWeight: '500',
        alignItems: 'center'
    },
    linearBtn: {
        height: hp(5),
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnView: {
        // backgroundColor: Colors.WHITE,
        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    close: {
        alignSelf: 'flex-end',
        marginBottom: -Spacing.MARGIN_32,
        zIndex: 10
    },
    prizeBg: {
        // height: hp(25),
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    modalPrize: {
        height: hp(12),
        width: wp(22),
        position: 'absolute',
        alignSelf: 'center',
        top: hp(7)

    },
    bottomInr: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.PRIMARY,
        fontWeight: '700',
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