import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Coin from '../images/svg/coin';
import Money from '../images/svg/money';
import TeadyPrize from '../images/svg/teadyPrize';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ANTDESIGN } from "../Styles/theme/Icons";
import Prize from '../images/svg/prize';
import PrizeBg from '../images/svg/prizeBg';
import { addMoneyToKidsWalletForMissionsCompleted, getTodayMission, getTodaysCompletedMissionByKid } from '../api/Missions';
import { LoaderContext, toggleModalContext } from '../../App';
import { KidMissionCompletionStatus } from '../api/utils/StatusForKidMissionCompletionStatus';
import { getKidWalletData } from '../api/user';
import { useNavigation } from '@react-navigation/native';

export default function TodayMission() {
    const [getMissionArr, setGetMissionArr] = useState([]);
    const [collectModal, setCollectModal] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [kidObj, setKidObj] = useState({});
    const [loading, setLoading] = useContext(LoaderContext);
    const [totalAmountAdded, setTotalAmountAdded] = useState(0);
    const [missionCompletionArr, setMissionsCompletionArr] = useState([]);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const navigation = useNavigation();
    const getMission = async () => {
        setLoading(true)
        try {
            let { data: res } = await getTodaysCompletedMissionByKid();
            if (res.data) {
                // console.log(JSON.stringify(res.data, null, 2), "res")
                // console.log(res.data.map(el => el.isUpdated ? el.amount : el.totalAmount + el.bonusAmount), "asdasdad")
                setMissionsCompletionArr(res.data)
                let total = res.data.filter(el => !el.isUpdated).reduce((acc, el, i, arr) => acc + el.totalAmount + el?.bonusAmount, 0) + res.data.filter(el => el.isUpdated).reduce((acc, el, i, arr) => acc + el.amount, 0)
                let totalAmount = res.data.filter(el => !el.isUpdated).reduce((acc, el, i, arr) => acc + el.totalAmount + el?.bonusAmount, 0) + res.data.filter(el => el.isUpdated).reduce((acc, el, i, arr) => acc + el.amount, 0)
                setTotalAmountAdded(totalAmount);
                setTotalValue(total);
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



    const HandleCollectMoney = async () => {
        setLoading(true)
        try {
            let arr = missionCompletionArr.filter(el => el?.status == KidMissionCompletionStatus?.completed)?.map(el => el._id)
            if (arr.length > 0) {
                let { data: res } = await addMoneyToKidsWalletForMissionsCompleted(arr);
                if (res.message) {
                    // trigger after this response is success
                    setCollectModal(true)
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



    useEffect(() => {
        getMission();
        getUserData();
    }, [])

    const renderItem = ({ item }) => {
        console.log(JSON.stringify(item, null, 2), "item")
        return (
            <View style={[styles.listMainView, { borderColor: item.borderColor, backgroundColor: Colors.GREYBACKGROUND }]}>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.listTitle, { width: "80%" }]}>{item?.missionObj?.activityObj?.name}</Text>
                    <Image source={{ uri: item?.missionObj?.activityObj?.thumbnailImage }} resizeMode='contain' style={[styles.listImg]} />
                </View>
                <Text style={[styles.inr, { fontSize: 12 }]}> Done On {`${new Date(item?.createdAt).getFullYear()}/${new Date(item?.createdAt).getMonth() + 1}/${new Date(item?.createdAt).getDate()}`}</Text>
                <Text style={[styles.inr, { fontSize: 12 }]}>{item?.status}</Text>
                {
                    item.isUpdated ?
                        <>
                            <Text style={[styles.inr, { fontSize: 12 }]}>Updated By Parent : {item?.reason}</Text>
                            <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.PADDING_5 }]}>
                                <View style={[commonStyle.flexRow,]}>
                                    <Coin height={hp(4)} width={wp(3)} />
                                    <Text style={[styles.inr, { fontSize: 12 }]}> INR {item?.amount}</Text>
                                </View>
                            </View>
                        </>
                        :

                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.PADDING_5 }]}>
                            <Text style={[styles.inr, { fontSize: 12 }]}> INR {item?.bonusAmount}</Text>
                            <View style={[commonStyle.flexRow,]}>
                                <Coin height={hp(4)} width={wp(3)} />
                                <Text style={[styles.inr, { marginLeft: Spacing.PADDING_5 }]}>INR {item?.totalAmount}</Text>
                            </View>
                        </View>
                }
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <ImageBackground source={require('../images/bg2.png')} style={[commonStyle.fullSize]}>

                <View style={[styles.mainView]}>

                    <FlatList
                        data={missionCompletionArr}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        ListHeaderComponent={
                            <>
                                <Money height={hp(15)} width={wp(20)} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30 }} />
                                <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginBottom: Spacing.MARGIN_20 }]}>Today's Missions</Text>
                            </>
                        }
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "#ccc", fontSize: 15, marginBottom: 40, marginTop: 15 }]}>You haven't done any missions today</Text>
                        }
                        ListFooterComponent={
                            <View style={{ marginTop: Spacing.MARGIN_20 }}>
                                <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                                    <Coin height={hp(5)} width={wp(6)} />
                                    <Text style={[styles.bottomInr, { marginLeft: Spacing.PADDING_5 }]} >{totalAmountAdded} INR</Text>
                                </View>
                                <TouchableOpacity onPress={() => HandleCollectMoney()} style={{ width: '40%', alignSelf: 'center', marginTop: Spacing.PADDING_10 }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                        <View style={[styles.btnView]}>
                                            <Text style={[styles.btnText]}>Collect Total</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />

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
                        <Text style={[commonStyle.modalTitle]}>{kidObj.firstName} has completed Mission</Text>
                        <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK }]}>Amount Earned</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                            <Coin height={hp(3)} width={wp(6)} />
                            <Text style={[styles.bottomInr, { marginLeft: Spacing.PADDING_5 }]} >{totalValue} INR</Text>
                        </View>
                        {/* <TeadyPrize height={hp(25)} width={wp(45)} resizeMode='contain' style={[commonStyle.modalTeady]} /> */}
                        <Image source={require('../images/teadyPrize1.png')} resizeMode='cover' style={[commonStyle.modalTeady]} />
                    </View>
                    <TouchableOpacity onPress={() => { setCollectModal(false); navigation.goBack() }} style={{ marginTop: Spacing.MARGIN_15 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_35} />
                    </TouchableOpacity>
                </View>
            </Modal >
        </View >
    )
}
const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: Spacing.MARGIN_20,
        marginBottom: Spacing.MARGIN_40
    },
    listMainView: {
        paddingHorizontal: Spacing.MARGIN_10,
        paddingVertical: Spacing.MARGIN_5,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15,
        borderColor: '#F2F4F6'
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
        //  backgroundColor: Colors.WHITE,
        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    bottomInr: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.PRIMARY,
        fontWeight: '700',
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
    modalTeady: {
        position: 'absolute',
        bottom: -10,
        left: -12,
        padding: 0,
        // backgroundColor:"red",
        height: hp(18),
        width: hp(20)
    }
})