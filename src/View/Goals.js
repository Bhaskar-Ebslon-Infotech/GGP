import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../App';
import { getAllByKidId } from '../api/KidGoals';
import { getDecodedToken, getKidWalletData, userData } from '../api/user';
import { kidGoalsStatus } from '../api/utils/StatusForKidGoals';
import { images } from '../Constant/background';
import { kidContext } from '../Context/CurrentKidContext';
import Goal from '../images/svg/goals';
import Money from '../images/svg/money';
import Product from '../images/svg/productTeady';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ANTDESIGN } from '../Styles/theme/Icons';

export default function Goals(props) {
    const navigation = useNavigation();
    const [collectModal, setCollectModal] = useState(false)
    const [goalsArr, setGoalsArr] = useState([]);
    const [walletObj, setWalletObj] = useState({});
    const focused = useIsFocused()
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;


    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getKidWalletData();
            console.log(JSON.stringify(res.data, null, 2), 'data11111111111')
            setWalletObj(res.data);
            setUserName(res.data.firstName);
            handleGetAllGoalsFromKidId()
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



    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let decoded = await getDecodedToken()
            console.log(decoded, 'decode>>>>>>>>>>>>>>>')
            let { data: res } = await getAllByKidId(decoded.userId);
            //  console.log(res,'abc')
            //  console.log('response123')

            let response = res.data.map(el => {
                el.productObj.remainingPercentage = el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 * (el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 - walletObj?.walletObj?.amount) / 100
                el.productObj.bottomInr = el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 - (el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 * el?.productObj?.remainingPercentage / 100)
                return el
            }).filter(el => el.status == kidGoalsStatus.ingoals)

            //  console.log(response,'response123')
            if (res.data) {
                setGoalsArr(response)
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

    //console.log(goalsArr,'xyzs')
    useEffect(() => {
        if (focused) {
            getUserData()
        }
    }, [focused])


    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }



    const renderItem = ({ item }) => {
        // console.log('item',item.productObj.favcy_inventory_item.amount)
        return (
            <View style={[styles.listView]}>
                <View style={[commonStyle.flexRow]}>

                    <Image source={{ uri: item?.productObj?.item?.default_media[0]?.full_media_url }} resizeMode='cover' style={{ height: hp(25), borderRadius: 15, width: '45%' }} />
                    <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15, width: '55%' }}>
                        <Text style={[styles.listTitle]}>{item?.productObj?.title}</Text>
                        <Text style={[styles.listInr]}>Quantity - {item.quantity}</Text>
                        <View style={{ borderWidth: 1, width: wp(40), borderColor: Colors.PRIMARY, borderRadius: 5, marginTop: Spacing.PADDING_7 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.listStatus, { width: `${(((item?.productObj?.favcy_inventory_item?.amount * item.quantity) - walletObj?.walletObj?.amount) > 0) ? 100 - percentage(((item?.productObj?.favcy_inventory_item?.amount * item.quantity) - walletObj?.walletObj?.amount), (item?.productObj?.favcy_inventory_item?.amount * item.quantity)) : 0}%` }]}></LinearGradient>
                        </View>
                        {/* <View style={{ borderWidth: 1, width: '80%', borderColor: Colors.PRIMARY, borderRadius: 5, marginTop: Spacing.PADDING_7 }}>
                            <View style={[commonStyle.flexRow,]}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.listStatus, { width: item?.status }]} ></LinearGradient>
                                <View style={{ borderWidth: 2, borderColor: Colors.WHITE, width: '0%' }}></View>
                            </View>
                        </View> */}
                        <Text style={[styles.listMoreInr]}>{(item?.productObj?.favcy_inventory_item?.amount - walletObj?.walletObj?.amount) * item.quantity > 0 ? ((item?.productObj?.favcy_inventory_item?.amount * item.quantity) - walletObj?.walletObj?.amount) : 0}{' '} INR more</Text>
                        {/* <TouchableOpacity onPress={() => setCollectModal(true)} style={{ alignSelf: 'center', marginRight: Spacing.MARGIN_15, marginVertical: Spacing.MARGIN_10 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]}>
                                <View style={{ backgroundColor: Colors.WHITE, borderRadius: 20 }}>
                                    <Text style={[styles.btnText]}>Collect Reward</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={{ padding: Spacing.MARGIN_5, paddingHorizontal: 15 }}>

                    <FlatList
                        data={goalsArr}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item?._id}_${index}`}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        ListHeaderComponent={
                            <>
                                <Goal height={hp(28)} width='100%' />
                                <View style={[styles.imgText]}>
                                    <Text style={[styles.txt1, { marginTop: Spacing.MARGIN_10 }]}>{walletObj?.walletObj?.amount}</Text>
                                    <Text style={[styles.txt1, { fontSize: Typography.FONT_SIZE_16, fontWeight: '400' }]}>{userName}'s Piggy Bank</Text>
                                </View>
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_40 }]}>
                                    <Text style={[commonStyle.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_30, marginRight: Spacing.MARGIN_10 }]}>Goals</Text>
                                    <Money height={hp(5)} width={wp(10)} />
                                </View>
                            </>
                        }
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "#ccc", fontSize: 15, marginTop: 25, marginRight: 15 }]}>No goals found , ask your parents to set up new goals for you</Text>
                        }
                    />
                </View>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={collectModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: '#C9E165', height: hp(53) }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.modalLinear]} >
                            {/* <Image source={require('../images/productTeady.png')} resizeMode='contain' style={[styles.teady]} /> */}
                            <Product height={hp(15)} width={wp(40)} style={[styles.teady]} />
                        </LinearGradient>
                        <Text style={[styles.modalText, { fontSize: Typography.FONT_SIZE_20, width: '95%', textAlign: 'center', alignSelf: 'center', marginTop: Spacing.MARGIN_60, marginBottom: Spacing.MARGIN_20 }]}>INR () will be deducted from your wallet. Do you want to collect your reward? .</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', }]}>

                            <TouchableOpacity onPress={() => navigation.navigate('Saved')} style={{ alignSelf: 'center', marginRight: Spacing.MARGIN_15, marginTop: Spacing.MARGIN_10 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { width: wp(35) }]} >
                                    <View style={{ backgroundColor: Colors.WHITE, borderRadius: 20 }}>
                                        <Text style={[styles.btnText, { paddingHorizontal: Spacing.MARGIN_40 }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setCollectModal(false)} style={{ alignSelf: 'center', marginRight: Spacing.MARGIN_15, marginTop: Spacing.MARGIN_10 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { width: wp(35) }]} >
                                    <Text style={[styles.btnText, { color: Colors.WHITE, paddingHorizontal: Spacing.MARGIN_40 }]}>No</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setCollectModal(false)} style={{ marginTop: Spacing.MARGIN_15 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>

                </View>
            </Modal>

        </View>
    )
}
const styles = StyleSheet.create({
    img: {
        height: hp(28),
        width: '100%',
        marginTop: Spacing.MARGIN_30
    },
    imgText: {
        alignItems: 'center',
        top: hp(15.7),
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    txt1: {
        fontFamily: 'MontserratH1-SemiBold',
        fontSize: Typography.FONT_SIZE_30,
        color: Colors.WHITE,
        fontWeight: '700'
    },
    listTitle: {
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '700',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        width: '65%'
    },
    listInr: {
        fontSize: Typography.FONT_SIZE_15,
        fontWeight: '700',
        fontFamily: 'Montserrat-SemiBold',
        color: '#9A9A9A',
        marginTop: Spacing.PADDING_7
    },
    listStatus: {
        borderWidth: 2,
        // width: '70%'
    },
    listMoreInr: {
        fontSize: Typography.FONT_SIZE_15,
        fontWeight: '700',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        textAlign: 'right',
        width: '80%',
        marginTop: Spacing.MARGIN_5
    },
    linearBtn: {
        padding: Spacing.PADDING_3,
        borderRadius: 20
    },
    btnText: {
        paddingHorizontal: Spacing.MARGIN_15,
        paddingVertical: Spacing.PADDING_4,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        textAlign: 'center'
    },
    modalLinear: {
        height: hp(16),
        borderRadius: 10,
    },
    teady: {
        alignSelf: 'center',
        // height: hp(13),
        // width: wp(25),
        marginTop: Spacing.MARGIN_11
    },
    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_17,
        color: Colors.LIGHT_BLACK,
        fontWeight: '600',
        marginVertical: Spacing.MARGIN_10,

    },
    listView: {
        // borderWidth: 1,
        borderColor: '#50505040',
        backgroundColor: 'white',
        marginTop: Spacing.PADDING_20,
        borderRadius: 15,
        // height: hp(25),
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.84,

        elevation: 5,
    }
})