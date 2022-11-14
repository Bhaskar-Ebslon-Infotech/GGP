import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons";
import { getSubscription } from '../../api/Subscription';
import { getDecodedToken, userData } from '../../api/user';
import { updatePaymentSuccess, UserSubscriptionCreate } from '../../api/UserSubscription';
import Header from '../../Component/CommonHeader';
import { default as commonStyle, default as parentStyle } from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme/index';

import { LoaderContext, toggleModalContext } from '../../../App';
import { getActiveCoupons } from '../../api/Coupons';
export default function PlansAfterLogin(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [subscriptionArr, setSubscriptionArr] = useState([]);
    const [userDataObj, setUserDataObj] = useState({});
    const [loading, setLoading] = useContext(LoaderContext);
    const [token, setToken] = useState("");
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [modalVisible, setModalVisible] = useState(false);
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);
    const [selectedCouponObj, setSelectedCouponObj] = useState({});
    const [selectedSubscription, setSelectedSubscription] = useState({});
    const [couponArr, setCouponArr] = useState([]);
    const [couponCode, setCouponCode] = useState("");

    const handleGet = async () => {
        setLoading(true)
        try {
            let { data: res } = await getSubscription();
            if (res) {
                setSubscriptionArr([...res?.data])
                console.log(JSON.stringify(res?.data))
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

    const handleGetCoupons = async () => {
        setLoading(true)
        try {
            let { data: res } = await getActiveCoupons();
            if (res) {
                console.log(JSON.stringify(res.data, null, 2), "Coupon Codes")
                setCouponArr([...res?.data])
                // console.log(JSON.stringify(res?.data))
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




    const handleRedirect = async (orderObj, SubscriptionObj) => {
        setSummaryModalVisible(false)
        let tempObj = orderObj
        try {
            console.log(orderObj, "orderObj")
            let OrderId = orderObj.id
            var options = {
                description: 'Subscription',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: tempObj.currency,
                key: 'rzp_test_jOl57g4TNamtFW1',
                // key: 'rzp_test_jOl57g4TNamtFW',
                amount: tempObj.amount,
                name: 'Wallet',
                order_id: tempObj.id,
                subscriptionId: SubscriptionObj._id, //Replace this with an order_id created using Orders API.
                theme: { color: "#F84B4B" },
            }
            console.log(options)

        } catch (error) {
            //console.error(error)
        }
    }




    const handlePlanOrderCreate = async (obj, price) => {
        setLoading(true)
        try {
            let decoded = await getDecodedToken()
            console.log(decoded, "decoded")
            let tempObj = {
                userId: decoded.userId,
                subscriptionId: obj._id,
                price: price,
                couponId: selectedCouponObj?._id
            }
            console.log(tempObj, "object")
            if (tempObj.price > 0) {
                console.log("if")
                let { data: res } = await UserSubscriptionCreate(tempObj);
                if (res) {
                    props.navigation.navigate("Payment", { data: res.data, logout: false })
                    // console.log(JSON.stringify(res?.data))
                    console.log(JSON.stringify(res, null, 2), "res")
                    // handleRedirect(res.razorpayData, res.data)
                }
            }
            else {
                console.log("else")
                let { data: res } = await UserSubscriptionCreate(tempObj);
                console.log(res?.data?._id, "response data")
                if (res) {
                    let { data: response } = await updatePaymentSuccess(res.data._id)
                    if (response.message) {
                        setToggleModal(true)
                        setMessage(response.message)
                    }
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
        setLoading(false)
    }


    const handleGetUserData = async () => {
        setLoading(true)
        try {
            const { data: res } = await userData();
            if (res.success) {
                setUserDataObj(res.data);
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


    // const handleOtpGenrate = async (orderObj2) => {
    //     let formData = new FormData();
    //     //console.log(phone)
    //     formData.append('otp_mobile_num', userDataObj.phone);
    //     formData.append('otp_mobile_cc', 91);
    //     let { data: res } = await generateGuestToken();
    //     console.log(res, 'response from generate guest token');
    //     if (res.data) {
    //         setToken(res.data.token);
    //         console.log('guest token', res.data.token);
    //         const { data: responseData } = await sendOtp(formData, res.data.token);
    //         console.log(responseData, 'otp Sent');
    //         if (responseData.status == 200 || responseData.status == 201) {
    //             setToggleModal(true)
    //             setMessage(responseData.data.message)

    //             await setPhoneNumber(userDataObj.phone);
    //             props.navigation.navigate('OtpVerifyPlansSelection', {
    //                 data: userDataObj.phone,
    //                 obj: res.data,
    //                 orderObj: orderObj2,
    //                 token: res.data.token,
    //                 name: userDataObj.firstName,
    //             });
    //         }
    //     }
    // };


    useEffect(() => {
        if (focused) {
            handleGetUserData();
            handleGet()
            handleGetCoupons()

        }
    }, [focused])



    const handleCouponOntry = (e) => {
        setCouponCode(e)
    }

    const handleCheckCouponValidity = (e) => {
        console.log(couponArr[0])
        let couponObj = couponArr.find(el => `${el.name}`.toLowerCase() == `${couponCode}`.toLowerCase())
        if (couponObj) {
            setSelectedCouponObj(couponObj);
            setModalVisible(false)
            setToggleModal(true)
            setMessage("Coupon Applied Successfully !!!")
            // alert("Coupon Applied Successfully !!!")
        }
        else {
            setCouponCode("");
            setToggleModal(true)
            setMessage("Invalid Coupon Applied !!!")
            // alert("Invalid Coupon Applied !!!")
        }
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: hp(3), width: '90%', alignSelf: "center" }}>
                <Pressable onPress={() => { setSelectedCouponObj(item); setModalVisible(false) }} style={[styles.card, { padding: 10, borderColor: "white", borderWidth: 1, borderRadius: 10 }]}>
                    <View style={[commonStyle.flexRow]}>
                        <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                            Coupon Name
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                            :
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 1, textAlign: "right", flexWrap: "wrap", color: "white" }]}>
                            {item?.name}
                        </Text>
                    </View>

                    <View style={[commonStyle.flexRow]}>
                        <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                            Valid till
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                            :
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                            {new Date(item?.validTill).toDateString()}
                        </Text>
                    </View>
                    <View style={[commonStyle.flexRow]}>
                        <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                            Amount
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                            :
                        </Text>
                        <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                            {item?.discountType == "PERCENTAGE" ? `${item.value}% OFF` : `INR ${item.value} OFF`}
                        </Text>
                    </View>
                </Pressable>
            </View>
        );
    };


    const calculateFinalPrice = () => {
        if (selectedCouponObj.discountType == "FLAT") {
            // setPrice(selectedSubscription?.price - selectedCouponObj?.value > 0 ? selectedSubscription?.price - selectedCouponObj?.value : 0)
            return (selectedSubscription?.price - selectedCouponObj?.value > 0 ? selectedSubscription?.price - selectedCouponObj?.value : 0)
        }
        else {
            let percentageValue = (selectedSubscription.price * selectedCouponObj.value) / 100
            // setPrice(selectedSubscription?.price - percentageValue > 0 ? selectedSubscription?.price - percentageValue : 0)
            return (selectedSubscription?.price - percentageValue > 0 ? selectedSubscription?.price - percentageValue : 0)
        }
    }





    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header />
            {/* <View style={[styles.head]}>
                <Logo height={hp(7)} width={wp(45)} />
                          </View> */}
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize, { minHeight: hp(95) }]}>
                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, marginTop: Spacing.MARGIN_10 }]}>Select your Plan</Text>
                <View style={[styles.flexRow, { marginTop: 15 }]}>
                    <Text style={{ fontWeight: "bold", marginLeft: wp(5) }}>{selectedCouponObj.name ? selectedCouponObj.name : "No coupon selected yet !"}</Text>


                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{ alignSelf: "flex-end", borderWidth: 1, borderColor: Colors.GRADIENT1, display: "flex", justifyContent: "center", alignItems: "center", width: wp(40), marginRight: wp(5), padding: 5, borderRadius: 8 }}>
                        <Text style={{ color: Colors.GRADIENT1, fontWeight: "bold" }}>Add Coupon Code</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: hp(17) }}>
                    <View style={{ padding: Spacing.MARGIN_20 }}>
                        {/* <Text style={{ marginTop: Spacing.MARGIN_5, fontSize: Typography.FONT_SIZE_13, color: '#747474', textAlign: 'center', width: '90%', alignSelf: 'center', fontFamily: 'Montserrat-Regular' }}>Go Premium and have a lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euultrices eros, sed consequat arcu.</Text> */}
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBg]} >
                            <FlatList
                                data={subscriptionArr}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => {
                                    // console.log('abc',item)
                                    return (
                                        <TouchableOpacity onPress={() => { setSummaryModalVisible(true); setSelectedSubscription(item); }} style={[styles.btn, { marginBottom: Spacing.MARGIN_15 }]}>
                                            {/* <Text style={[styles.btnText]}>{item.name} </Text> */}
                                            {/* <Text style={[styles.btnText]}> {Math.round(item.duration / 30)} Months</Text> */}
                                            <Text style={[styles.btnText]}>Offer {item.offerText} off - {item.name} worth  <Text style={[styles.btnText]}>₹{item.mrp} </Text> now for  ₹{item.price}</Text>
                                            {/* <Text style={[styles.btnText]}>{item.name} for <Text style={[styles.btnText]}> ₹{item.mrp} </Text> Now At  ₹{item.price} {item.offerText} {item.description}</Text> */}
                                            {/* <Text style={[styles.btnText]}>{item.offerText}</Text>
                                        <Text style={[styles.btnText]}>{item.description}</Text> */}
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </LinearGradient>
                    </View>

                </ScrollView>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]} />
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>

                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.modalView, { padding: 2, borderRadius: 10, height: 200 }]} >
                        <Pressable onPress={() => setModalVisible(false)} style={{ position: "absolute", right: 15, top: 15, paddingLeft: 20, zIndex: 150, paddingBottom: 20 }}>
                            <Icon name="close-circle-outline" size={35} color="white" />
                        </Pressable>
                        <Text style={{ color: "white", fontWeight: "bold", paddingTop: 22, fontSize: 18 }}>Enter Coupon Code</Text>
                        <TextInput style={{ borderColor: "white", color: "white", borderWidth: 1, width: "90%", marginTop: 15, borderRadius: 10 }} onChangeText={(e) => handleCouponOntry(e)} />
                        <TouchableOpacity
                            onPress={() => handleCheckCouponValidity()}
                            style={{ alignSelf: "center", borderWidth: 1, borderColor: "white", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", width: wp(50), marginRight: wp(5), marginTop: 30, padding: 5, borderRadius: 8 }}>
                            <Text style={{ color: "black", fontWeight: "bold" }}>Apply Coupon Code</Text>
                        </TouchableOpacity>
                        {/* <View style={{ flex: 1 }}>
                            <FlatList
                                contentContainerStyle={{ borderRadius: 10, width: wp(90) }}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => `${item._id}`}
                                data={couponArr}
                            />
                        </View> */}
                    </LinearGradient>
                </View>
            </Modal>



            <Modal
                animationType="slide"
                transparent={true}
                visible={summaryModalVisible}
                onRequestClose={() => {
                    setSummaryModalVisible(!summaryModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    {/* handlePlanOrderCreate(item) */}
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.modalView, { padding: 2, borderRadius: 5, height: hp(50) }]} >
                        <Pressable onPress={() => setSummaryModalVisible(false)} style={{ position: "absolute", right: 15, top: 15, paddingLeft: 20, zIndex: 150, paddingBottom: 20 }}>
                            <Icon name="close-circle-outline" size={35} color="white" />
                        </Pressable>
                        <Text style={{ color: "white", fontWeight: "bold", paddingTop: 22, fontSize: 18 }}>Order Summary</Text>

                        <View style={{ marginTop: hp(3), width: '90%', alignSelf: "center" }}>
                            <Pressable style={[styles.card, { padding: 10, borderColor: "white", borderWidth: 1, borderRadius: 10 }]}>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Subscription Name
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, textAlign: "right", flexWrap: "wrap", color: "white" }]}>
                                        {selectedSubscription?.name}
                                    </Text>
                                </View>

                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        MRP
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                        INR {selectedSubscription.mrp}
                                    </Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Price
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                        INR {selectedSubscription.price}
                                    </Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Coupon Name
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                        {selectedCouponObj.name ? selectedCouponObj.name : "NA"}
                                    </Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Discount type
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                        {selectedCouponObj.discountType ? `${selectedCouponObj.discountType} OFF` : "NA"}
                                    </Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Discount
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    {
                                        selectedCouponObj?.discountType ?
                                            <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                                {selectedCouponObj?.discountType == "PERCENTAGE" ? `${selectedCouponObj.value}% OFF` : `INR ${selectedCouponObj.value} OFF`}
                                            </Text>
                                            : <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                                NA
                                            </Text>
                                    }
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: "white" }]}>
                                        Offer Price
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 0.1, flexWrap: "wrap", color: "white" }]}>
                                        :
                                    </Text>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "right", color: "white" }]}>
                                        {selectedCouponObj.name ? `INR ${calculateFinalPrice()}` : "NA"}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>

                        <Text style={{ color: "white", fontWeight: "bold", paddingTop: 22, fontSize: 18 }}>Final Price : INR {selectedCouponObj.name ? calculateFinalPrice() : selectedSubscription.price}</Text>


                        <View style={{ marginTop: hp(3), width: '90%', alignSelf: "center" }}>
                            <Pressable style={[styles.card, { padding: 10, backgroundColor: "white", borderColor: "white", borderWidth: 1, borderRadius: 10 }]} onPress={() => handlePlanOrderCreate(selectedSubscription, selectedCouponObj.name ? calculateFinalPrice() : selectedSubscription.price)}>
                                <View style={[commonStyle.flexRow, { justifyContent: "center" }]}>
                                    <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", textAlign: "center", color: Colors.GRADIENT1 }]}>
                                        Proceed
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    linearBg: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.MARGIN_15,
        borderRadius: 10,
        marginTop: Spacing.MARGIN_20
    },
    whiteBg: {
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        paddingVertical: Spacing.PADDING_7,
        paddingHorizontal: Spacing.MARGIN_15,
        marginTop: Spacing.MARGIN_20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        position: "relative",
        margin: 20,
        // backgroundColor: Colors.GRADIENT2,
        borderRadius: 20,
        padding: 35,
        width: wp(90),
        height: hp(80),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        fontFamily: 'Montserrat-Regular',
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: '600',
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btn: {
        borderColor: Colors.WHITE,
        borderWidth: 1,
        paddingVertical: 7,
        borderRadius: 7,
        //height: hp(10),
        justifyContent: 'center'
    },
    btnText: {
        color: Colors.WHITE,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    head: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
