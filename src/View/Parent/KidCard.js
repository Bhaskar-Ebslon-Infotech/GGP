import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Right from '../../images/svg/parentsvg/right';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { checkoutOrder, getBykidIdandGoalId } from '../../api/KidGoals';
import { kidContext } from '../../Context/CurrentKidContext';
import { getAddress, removeAddress } from '../../api/user';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { LoaderContext, toggleModalContext } from '../../../App';
import { SelectedDiscountCouponContext } from '../../Context/SelectedDiscountCoupon';

export default function KidCard(props) {
    // const navigation = useNavigation();
    const [productId, setProductId] = useState("");
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [messageString, setMessageString] = useState("");
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const focused = useIsFocused();
    const [goalsObj, setGoalsObj] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useContext(SelectedDiscountCouponContext)
    const [selectedCoupon_code, setSelectedCoupon_code] = useState('');
    const handleGetAllGoalsFromKidId = async () => {
        setLoading(true)
        try {
            let { data: res } = await getBykidIdandGoalId(props?.route?.params?.data, currentKid?._id);
            if (res?.data) {
                let response = res.data
                response.productObj.remainingPercentage = 30
                response.productObj.bottomInr = response?.productObj?.reseller_markup_rules?.lower_limit ? response?.productObj?.reseller_markup_rules?.lower_limit : 0 - (response?.productObj?.reseller_markup_rules?.lower_limit ? response?.productObj?.reseller_markup_rules?.lower_limit : 0 * response?.productObj?.remainingPercentage / 100)
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



    const getSelectedAddress = async () => {
        let SeletectedAddress = await getAddress()
        if (SeletectedAddress) {
            SeletectedAddress = JSON.parse(SeletectedAddress)
            console.log(SeletectedAddress, "SeletectedAddress")
            setSelectedAddress(SeletectedAddress)
        }
    }

    useEffect(() => {
        if (focused) {
            setProductId(props.route.params.data)
            getSelectedAddress()
            handleGetAllGoalsFromKidId()
        }
    }, [focused])
    useEffect(() => {
        if (selectedDiscountCoupon) {
            setSelectedCoupon_code(selectedDiscountCoupon)
        }
    }, [selectedDiscountCoupon])



    const handleCheckout = async () => {
        setLoading(true)
        try {
            if (selectedAddress?.address_line_1) {
                let obj = {
                    goalId: goalsObj._id,
                    kidId: currentKid._id,
                    item_id: goalsObj.item_id,
                    address_id: selectedAddress.id,
                    voucher_code: selectedCoupon_code,
                    addressObj: selectedAddress,
                }
                console.log(obj)
                let { data: res } = await checkoutOrder(obj);
                console.log(JSON.stringify(res, null, 2), "response for checkout")
                if (res.message) {
                    setMessageString(res.message);
                    setModalIsVisible(true)
                    // alert(res.message);
                    // handleGetAllGoalsFromKidId()

                    // props.navigation.goBack()
                    // let response = res.data
                    // response.productObj.remainingPercentage = 30
                    // response.productObj.bottomInr = response?.productObj?.reseller_markup_rules?.lower_limit - (response.productObj.reseller_markup_rules.lower_limit * response.productObj.remainingPercentage / 100)
                    // setGoalsObj(response)
                }
            }
            else {
                setToggleModal(true)
                setMessage("Please Select an address !!")
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
    // return null

    const calculateProductValue = () => {
        if (goalsObj.productObj) {

            let couponValue = 75
            // let couponValue = selectedCoupon_code.voucher_value_in_100 / 100
            let value = 0
            if (selectedCoupon_code.type == "flat_amount") {
                value = (goalsObj?.productObj?.favcy_inventory_item?.amount - couponValue)
                console.log("asda")
            }
            else {
                value = (goalsObj?.productObj?.favcy_inventory_item?.amount - ((couponValue / 100) * goalsObj?.productObj?.favcy_inventory_item?.amount)).toFixed()
            }
            // console.log(selectedCoupon_code, couponValue, value, "couponValue", "selectedCoupon_code")
            if (value && value > 0) {
                // console.log(value)
                return value
            }
            else {
                setSelectedCoupon_code({})
                setSelectedDiscountCoupon({})
                setToggleModal(true)
                setMessage("This Voucher cannot be applied on this order")
            }
        }

    }


    return (


        <>
            <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
                <Header logo={true} />
                <View style={{ paddingHorizontal: Spacing.PADDING_15 }}>
                    <Text style={{ fontSize: Typography.FONT_SIZE_22, color: Colors.PRIMARY, fontFamily: 'Montserrat-SemiBold', marginLeft: Spacing.MARGIN_5, textAlign: 'center', marginTop: Spacing.MARGIN_30 }}>My Kid’s Cart</Text>
                    <Text style={[styles.head2]}>The Achieved Goal</Text>
                    <View style={[commonStyle.flexRow, styles.view]}>
                        <Image source={{ uri: goalsObj?.productObj?.item?.default_media[0]?.full_media_url }} resizeMethod="resize" resizeMode='contain' style={[styles.img]} />
                        <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_20 }}>
                            <Text style={[styles.title]}>{goalsObj?.productObj?.title}</Text>
                            <Text style={[styles.amount]}>{ }{selectedCoupon_code.voucher_code ? calculateProductValue() : goalsObj?.productObj?.favcy_inventory_item?.amount} INR</Text>
                        </View>
                    </View>
                    <Text style={[styles.listText, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_15, marginBottom: Spacing.PADDING_4 }]}>Delivery Address</Text>
                    <View style={[styles.listView]}>
                        {
                            selectedAddress.landmark
                                ?
                                <>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('AddSelection', { data: productId })}>
                                        <Text style={[styles.listText]}>{selectedAddress?.address_name}</Text>
                                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                                            <View>
                                                <Text style={[styles.listText]}>{selectedAddress?.address_line_1} {selectedAddress?.address_line_2} {selectedAddress?.city} {selectedAddress?.state} {selectedAddress?.country} - {selectedAddress?.pincode}</Text>
                                                <Text style={[styles.listText]}>{selectedAddress?.landmark}</Text>
                                            </View>
                                            <Right height={hp(4)} width={wp(7)} />
                                        </View>
                                        <Text style={[styles.listText]}>{selectedAddress?.mobile}</Text>
                                    </TouchableOpacity>
                                </>
                                :

                                <>
                                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                                        <Text style={[styles.listText]}>Please Select an address to move forward</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('AddSelection', { data: productId })}>
                                            <Right height={hp(4)} width={wp(7)} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                    <Text style={[styles.listText, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_15, marginBottom: Spacing.PADDING_4 }]}>Voucher / Discount</Text>
                    <View style={[styles.input]}>
                        <TextInput style={{ color: "black" }} value={selectedCoupon_code.voucher_code} editable={false} onChangeText={(Val) => setSelectedCoupon_code(Val)} placeholder='Select and Enter Code' />
                        <TouchableOpacity onPress={() => props.navigation.navigate("VoucherSelection")}>
                            <Right height={hp(3)} width={wp(5)} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleCheckout()} style={{ marginTop: Spacing.MARGIN_30, paddingBottom: Spacing.MARGIN_50 }} >
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Checkout</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalIsVisible}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '80%', alignSelf: 'center', marginVertical: Spacing.MARGIN_50 }]}>{`${messageString}`}</Text>
                        </View>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_25, width: "90%", justifyContent: "space-between" }]}>
                            <TouchableOpacity style={{ width: '45%' }} onPress={() => { props.navigation.goBack(); setModalIsVisible(false); }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Close</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '45%' }} onPress={() => { props.navigation.goBack(); setModalIsVisible(false); }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Ok</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>


    )
}
const styles = StyleSheet.create({
    head2: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        textAlign: 'center'
    },
    view: {
        marginTop: Spacing.MARGIN_50,
        backgroundColor: Colors.WHITE,
        minHeight: hp(25),
        paddingVertical: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    img: {
        height: '100%',
        width: wp(40),
        borderRadius: 15
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_20,
        maxWidth: '70%',
        flexWrap: "wrap",
        display: "flex",
    },
    amount: {
        fontSize: Typography.FONT_SIZE_18,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.MARGIN_35
    },
    listText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LIGHT_BLACK,
    },
    listView: {
        borderWidth: 1,
        padding: Spacing.PADDING_10,
        borderColor: '#BFBFBF',
        backgroundColor: Colors.WHITE
    },
    input: {
        borderWidth: 1,
        height: hp(5.8),
        borderRadius: 30,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})