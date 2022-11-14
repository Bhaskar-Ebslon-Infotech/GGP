import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView, Modal, ActivityIndicator } from 'react-native';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { kidContext } from '../../Context/CurrentKidContext';
import { deleteKIdGoalStatusBykidIdandGoalId, getBykidIdandGoalId, updateKIdGoalStatusBykidIdandGoalId } from '../../api/KidGoals';
import { kidGoalsStatus } from '../../api/utils/StatusForKidGoals';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getKidWalletDataFromParent } from '../../api/user';

export default function GoalCart(props) {
    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [kidObj, setKidObj] = useState({});
    const focused = useIsFocused()
    const [goalsObj, setGoalsObj] = useState({});

    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let { data: res } = await getBykidIdandGoalId(props?.route?.params?.data, currentKid?._id);
            console.log(JSON.stringify(res?.data, null, 2), "Data");
            if (res.data) {
                let response = res.data
                response.productObj.remainingPercentage = 30
                response.productObj.bottomInr = response?.productObj?.reseller_markup_rules?.lower_limit ? response?.productObj?.reseller_markup_rules?.lower_limit : 0 - (response?.productObj?.reseller_markup_rules?.lower_limit ? response?.productObj?.reseller_markup_rules?.lower_limit : 0 * response?.productObj?.remainingPercentage / 100)
                // console.log(JSON.stringify(response, null, 2), "Data 2");
                setGoalsObj(response)
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
            let { data: res } = await getKidWalletDataFromParent(currentKid._id);
            if (res.data) {
                setKidObj(res.data)
                console.log(JSON.stringify(res.data, null, 2), "user Obj")
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




    const handleMoveToCart = async () => {
        setLoading(true)
        try {
            let obj = {
                status: kidGoalsStatus.incart
            }
            let { data: res } = await updateKIdGoalStatusBykidIdandGoalId(props.route.params.data, currentKid._id, obj);
            if (res.message) {
                setModal2(true);
                setModal(false);
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




    const handleRemoveFromGoals = async () => {
        setLoading(true)
        try {
            let { data: res } = await deleteKIdGoalStatusBykidIdandGoalId(props.route.params.data, currentKid._id);
            if (res.message) {
                setModal(false)
                props.navigation.goBack()
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
            getUserData()
            handleGetAllGoalsFromKidId()
        }
    }, [focused])







    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />

            <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.MARGIN_15, paddingBottom: Spacing.MARGIN_30 }}>
                <ImageBackground source={require('../../images/goalCard.png')} resizeMode='contain' style={[styles.topImageCard]}>
                    <Text style={[styles.cardTitle]}>INR {kidObj?.walletObj?.amount}</Text>
                    <Text style={[styles.cardSubTitle]}>{kidObj?.firstName}’s Piggy Bank</Text>
                </ImageBackground>
                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: '#353535' }]}>My Kid’s Corner</Text>
                <View style={[commonStyle.flexRow, { justifyContent: 'center', marginTop: Spacing.PADDING_20 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('GoalCoverBlessing')} style={{ width: '48%' }} >
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[{ textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat-SemiBold', paddingVertical: Spacing.PADDING_7, color: Colors.WHITE, }]}> Blessings</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '48%', marginLeft: Spacing.PADDING_7 }} onPress={() => setModal(true)}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[{ textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat-SemiBold', paddingVertical: Spacing.PADDING_7, color: Colors.WHITE, }]}>Move to Cart</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={[styles.productView]}>
                    <Image source={{ uri: goalsObj?.productObj?.item?.default_media[0]?.full_media_url }} style={[styles.productImg]} />
                    <View style={{ paddingHorizontal: 15, paddingVertical: Spacing.MARGIN_10, }}>
                        <Text style={[styles.title]}>{goalsObj?.productObj?.title}</Text>
                        <Text style={[styles.inr]}>Quantity - {goalsObj?.quantity}</Text>
                        <Text style={[styles.inr]}>{goalsObj?.productObj?.favcy_inventory_item?.amount} INR</Text>

                        <View style={{ borderWidth: 1, width: '70%', borderColor: Colors.PRIMARY, borderRadius: 5, marginTop: Spacing.PADDING_7 }}>
                            <View style={[commonStyle.flexRow,]}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.listStatus, { width: `${((kidObj?.walletObj?.amount < goalsObj?.productObj?.favcy_inventory_item?.amount ? kidObj?.walletObj?.amount : goalsObj?.productObj?.favcy_inventory_item?.amount) * 100) / goalsObj?.productObj?.favcy_inventory_item?.amount}%` }]} ></LinearGradient>

                            </View>
                        </View>
                        <View style={{ width: '70%' }}>
                            <Text style={[styles.bottomInr]}>{goalsObj?.productObj?.favcy_inventory_item?.amount - kidObj?.walletObj?.amount < 0 ? 0 : (goalsObj?.productObj?.reseller_markup_rules?.lower_limit ? goalsObj?.productObj?.reseller_markup_rules?.lower_limit : 0 - kidObj?.walletObj?.amount)} INR more</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_50 }]}>Are you sure you want to add this item to your cart?</Text>

                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_25, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => { handleMoveToCart() }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Accept</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleRemoveFromGoals()} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { margin: 1, borderRadius: 30, width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Reject</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Modal 2 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal2}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '80%', alignSelf: 'center', marginVertical: Spacing.MARGIN_50 }]}>Item is moved to the cart</Text>

                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_25, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => { props.navigation.goBack(); setModal(false); }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Ok</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setModal2(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    topImageCard: {
        height: hp(15),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_20
    },
    cardTitle: {
        fontSize: Typography.FONT_SIZE_30,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE
    },
    cardSubTitle: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Montserrat-Regular',
        color: Colors.WHITE
    },
    productView: {
        marginTop: Spacing.MARGIN_20,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        // shadowColor: "#000",
        backgroundColor: '#fff',
        borderColor: '#50505040',
        // shadowOffset: {
        //     width: 5,
        //     height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
    },
    productImg: {
        height: hp(30),
        width: '100%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    title: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: 'Montserrat-SemiBold'
    },
    inr: {
        fontSize: Typography.FONT_SIZE_15,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_2
    },
    listStatus: {
        borderWidth: 2,
    },
    bottomInr: {
        fontSize: Typography.FONT_SIZE_11,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_2,
        alignSelf: 'flex-end'
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})