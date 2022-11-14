import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useContext, useState, useEffect } from 'react'
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Check from '../../images/svg/parentsvg/check';
import Cancel from '../../images/svg/parentsvg/cancel';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { kidGoalsStatus } from '../../api/utils/StatusForKidGoals';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteKIdGoalStatusBykidIdandGoalId, getAllByKidId, updateKIdGoalStatusBykidIdandGoalId } from '../../api/KidGoals';
import { kidContext } from '../../Context/CurrentKidContext';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function ParentWishlistPage(props) {
    const navigation = useNavigation();
    const [removeWishListModal, setRemoveWishListModal] = useState(false);
    const [wishListModal, setWishListModal] = useState(false);
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [selectedGoalId, setSelectedGoalId] = useState("");
    const focused = useIsFocused()
    const [goalsArr, setGoalsArr] = useState([]);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);
    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllByKidId(currentKid._id);
            // console.log(JSON.stringify(res?.data, null, 2), "goal Data");
            let response = res.data.map(el => {
                el.productObj.remainingPercentage = 30
                el.productObj.bottomInr = el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 - (el?.productObj?.reseller_markup_rules?.lower_limit ? el?.productObj?.reseller_markup_rules?.lower_limit : 0 * el?.productObj?.remainingPercentage / 100)
                return el
            }).filter(el => el.status == kidGoalsStatus.inwishlist)
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



    useEffect(() => {
        if (focused) {
            handleGetAllGoalsFromKidId()
        }
    }, [focused])



    const handleMoveToGoals = async () => {
        setLoading(true)
        try {
            let obj = {
                status: kidGoalsStatus.ingoals
            }
            let res = await updateKIdGoalStatusBykidIdandGoalId(selectedGoalId, currentKid._id, obj);
            console.log(res.data.message, 'response123')
            setWishListModal(false)
            if (res.data.message) {
                setToggleModal(true)
                setMessage("Wishlist Added to kid's Goals")
                handleGetAllGoalsFromKidId()

                //   setModal2(true);
                //  setModal(false);
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


    const handleDeleteGoals = async () => {
        setLoading(true)
        try {
            console.log(selectedGoalId);
            console.log(currentKid._id);
            let res = await deleteKIdGoalStatusBykidIdandGoalId(selectedGoalId, currentKid._id);
            console.log('response', res.data.message)
            setRemoveWishListModal(false)
            if (res.data.message) {
                setToggleModal(true)
                setMessage(res.data.message)

                handleGetAllGoalsFromKidId()

                //  setModal2(true);
                //   setModal(false);
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




    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.imgView, index == goalsArr.length - 1 && { marginBottom: Spacing.MARGIN_20 }]}>
                <Image source={{ uri: item?.productObj?.item?.default_media[0]?.full_media_url }} resizeMode='cover' style={[styles.img]} />
                <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15 }}>
                    <Text style={[styles.title]}>{item?.productObj?.title}</Text>
                    <Text style={[styles.inr]}>Quantity - {item?.quantity}</Text>
                    <Text style={[styles.inr]}>{item?.productObj?.favcy_inventory_item?.amount} INR</Text>
                    <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                        <TouchableOpacity onPress={() => { setSelectedGoalId(item._id); setWishListModal(true) }}>
                            <Check height={hp(4)} width={wp(6)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectedGoalId(item._id); setRemoveWishListModal(true) }}>
                            <Cancel height={hp(4)} width={wp(6)} style={{ marginLeft: Spacing.MARGIN_10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={goalsArr}
                contentContainerStyle={{ paddingBottom: hp(35) }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 15 }}>No Items in wishlist</Text>}
                keyExtractor={(item, index) => index}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={wishListModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.title, { width: '80%', alignSelf: 'center', textAlign: 'center', marginVertical: Spacing.MARGIN_15 }]}>Are you sure you want to Accept your Kid’s Wishlist?</Text>
                            <Text style={[styles.inr, { fontFamily: 'Montserrat-SemiBold', width: '70%', alignSelf: 'center', marginVertical: Spacing.MARGIN_15, textAlign: 'center', fontSize: Typography.FONT_SIZE_16 }]}>Once accepted it will be added to your Kid’s Goal.</Text>
                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_20, marginTop: Spacing.MARGIN_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => setWishListModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} onPress={() => handleMoveToGoals()}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setWishListModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* REMOVE */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={removeWishListModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.title, { width: '90%', alignSelf: 'center', textAlign: 'center', marginVertical: Spacing.MARGIN_30, marginTop: Spacing.MARGIN_50 }]}>Are you sure you want to Reject your Kid’s Wishlist?</Text>

                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.PADDING_20, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => setRemoveWishListModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: Spacing.PADDING_10 }} onPress={() => handleDeleteGoals()}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setRemoveWishListModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    topView: {
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: 'center',
        width: wp(92),
        borderRadius: 20,
        marginTop: Spacing.MARGIN_15,
        borderColor: '#DEDEDE',
        backgroundColor: Colors.WHITE
    },
    topText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        paddingVertical: Spacing.PADDING_7,
        textAlign: 'center',
    },
    img: {
        height: hp(20),
        width: wp(45),
        borderRadius: Spacing.MARGIN_20,
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_20,
        width: '99%',
        minHeight: hp(20),
        shadowColor: "#000",
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: '#50505040',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    title: {
        fontSize: Typography.FONT_SIZE_16,
        maxWidth: '70%',
        flexWrap: "wrap",
        fontFamily: 'Montserrat-SemiBold'
    },
    inr: {
        fontSize: Typography.FONT_SIZE_15,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_4
    },
    btnView: {

        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
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
    }
})