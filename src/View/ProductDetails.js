import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getShopProductsbyProductId } from "../api/shop/ShopProducts";
import Header from '../Component/Header';
import CommonStyle from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { kidContext } from "../Context/CurrentKidContext";
import { createKidGoal, wishListKidGoal } from "../api/KidGoals";
import commonStyle from "../Styles/commonStyle";
import parentStyle from "../Styles/parentStyle";
import Back from '../images/svg/parentsvg/back';
import { getAuthToken, getDecodedToken } from "../api/user";
import { LoaderContext, toggleModalContext } from "../../App";
import Carousel, { Pagination } from 'react-native-snap-carousel';


export default function ProductDetails(props) {
    const navigation = useNavigation()
    const [productModal, setProductModal] = useState(false);
    const [productObj, setProductObj] = useState({});
    const [selectedProductObj, setSelectedProductObj] = useState({});
    const [selectedItemId, setSelectedItemId] = useState(props.route.params.itemId);
    const [selectedProduct, setSelectedProduct] = useState(props.route.params.data);
    const focused = useIsFocused()
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [quantity, setQuantity] = useState(1);
    const [messageString, setMessageString] = useState("");
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [activeItem, setActiveItem] = useState(0);

    const handleGetProductData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopProductsbyProductId(selectedProduct, selectedItemId)
            console.log(JSON.stringify(res?.data, null, 2), "product Data");
            if (res.data.type == "OWNER") {
                setProductObj(res.data)
                let tempObj = res?.data?.variantsArr?.find(el => el.id == props.route.params.data)
                // console.log(JSON.stringify(tempObj, null, 2), "tempObj")
                setSelectedProductObj(tempObj)
            }
            else {
                setProductObj(res.data)
                console.log(JSON.stringify(res?.data, null, 2))
                let tempObj = res?.data?.variantsArr?.find(el => el.id == props.route.params.data)
                tempObj.reseller_markup_rules = tempObj.parent_item_data[0].reseller_markup_rules;
                console.log(JSON.stringify(tempObj.item, null, 2))
                // console.log(JSON.stringify(tempObj, null, 2), "tempObj")
                setSelectedProductObj(tempObj)
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
            handleGetProductData()
        }
    }, [focused])



    const checkIfSelected = (index) => {
        if (productObj?.variantsArr[index]?.id == selectedProduct) {
            return true
        }
        else {
            return false
        }
    }

    const handleSelectVariant = (id) => {
        setSelectedProduct(id)
        let tempObj = productObj?.variantsArr?.find(el => el.id == id)
        console.log(JSON.stringify(tempObj, null, 2), "tempObj")
        setSelectedProductObj(tempObj)
    }


    const renderVariantArr = ({ item: itemValue, index }) => {

        return (
            <Pressable onPress={() => handleSelectVariant(itemValue.id)}
                style={{
                    backgroundColor: checkIfSelected(index) ? "rgba(225, 180, 237,0.3)" : "rgba(229, 227, 230, 0.5)",
                    borderColor: "rgba(0,0,0,0.2)",
                    paddingVertical: 7,
                    borderRadius: 5,
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    margin: 6
                }}>
                {
                    itemValue?.variant?.map((el, indexX) => {
                        return (
                            <View style={styles.flexRow} key={`${el.id}_${indexX}`}>
                                <Text style={{ width: "50%", textAlign: "center", fontWeight: "700", color: "black", textTransform: "capitalize" }}>{el?.tag_value?.tag_key?.name} :</Text>
                                <Text style={{ width: "50%", textAlign: "center", color: "black", textTransform: "capitalize" }}> {el?.tag_value?.value}</Text>
                            </View>
                        )
                    })
                }
            </Pressable>
        )
    }



    const handleCreateChildGoal = async () => {
        setLoading(true)
        try {
            if (quantity < 0) {
                // alert("Quantity can not be less than 0")
                setToggleModal(true)
                setMessage("Quantity can not be less than 0")
            }
            else {
                let token = await getDecodedToken()
                let obj = {
                    kidId: token.userId,
                    item_id: selectedProductObj.favcy_inventory_item.id,
                    productObj: selectedProductObj,
                    quantity: quantity,
                }
                console.log(obj)
                let { data: res } = await wishListKidGoal(obj)
                if (res.message) {
                    setMessageString(res.message);
                    setModalIsVisible(true);
                    // alert(res.message)
                    // props.navigation.goBack()
                    // console.log(JSON.stringify(res, null, 2))
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

    const increaseQuantity = () => {
        setQuantity(previousValue => {
            if (parseInt(previousValue) < 2) {
                previousValue = parseInt(previousValue) + 1
                return `${previousValue}`
            }
            else {
                previousValue = parseInt(previousValue)
                return `${previousValue}`
            }
        })

    }


    const reduceQuantity = () => {
        setQuantity(previousValue => {
            if (previousValue > 1) {
                previousValue = parseInt(previousValue) - 1
                return `${previousValue}`
            }
            return `1`
        })

    }

    const renderSlide = ({ item, index }) => {
        return (
            <Image source={{ uri: item?.full_media_url }} resizeMode="cover" style={[styles.img]} />
        )
    }



    return (
        <>
            {/* <View style={styles.bg}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back height={hp(5)} width={wp(8)} />
                </TouchableOpacity>

            </View> */}
            {/* <Header logo={true} /> */}
            {
                selectedProductObj && productObj?.variantsArr?.some(el => el.variant) ?
                    <FlatList
                        contentContainerStyle={[styles.container]}
                        ListHeaderComponent={
                            <>
                                <View style={[styles.imgView]}>
                                    <Carousel
                                        //  ref={(c) => { this._carousel = c; }}
                                        data={productObj?.item?.default_media}
                                        renderItem={renderSlide}
                                        sliderWidth={wp(90)}
                                        itemWidth={wp(90)}
                                        onSnapToItem={slideIndex => {
                                            setActiveItem(slideIndex);
                                        }}
                                    />
                                    <Pagination
                                        dotsLength={productObj?.item?.default_media.length}
                                        activeDotIndex={activeItem}
                                        containerStyle={{ backgroundColor: 'transparent' }}
                                        dotStyle={{
                                            backgroundColor: Colors.PRIMARY,
                                            width: wp(4),
                                            borderColor: Colors.PRIMARY,
                                            borderWidth: 2,
                                            borderRadius: 20,
                                        }}
                                        inactiveDotStyle={{
                                            backgroundColor: '#fff',
                                            width: wp(5),
                                            borderColor: Colors.PRIMARY,
                                            borderWidth: 2,
                                            borderRadius: 20,
                                        }}
                                        inactiveDotOpacity={0.4}
                                        inactiveDotScale={0.6}
                                    />
                                    {/* <Image source={{ uri: productObj?.item?.default_media[0]?.full_media_url }} style={[styles.img]} /> */}
                                    <Text style={[styles.imgText, { paddingHorizontal: Spacing.MARGIN_15 }]}>{productObj?.title}</Text>
                                    <View style={[CommonStyle.flexRow, { justifyContent: 'space-between', paddingHorizontal: Spacing.MARGIN_15 }]}>
                                        <View style={styles.flexRow}>
                                            {
                                                selectedProductObj?.favcy_inventory_item?.amount != selectedProductObj?.reseller_markup_rules?.upper_limit &&
                                                <Text style={[styles.imgText2, { textDecorationLine: "line-through", paddingRight: 10 }]}>{selectedProductObj?.reseller_markup_rules?.upper_limit} INR</Text>
                                            }
                                            <Text style={[styles.imgText2]}>{selectedProductObj?.favcy_inventory_item?.amount} INR</Text>
                                        </View>
                                        {/* <Text style={[styles.imgText2, { color: '#9A9A9A', fontSize: Typography.FONT_SIZE_12 }]}>{selectedProductObj?.favcy_inventory_item?.left} items available</Text> */}
                                    </View>
                                </View>
                                <Text style={[styles.imgText, { paddingHorizontal: Spacing.MARGIN_15 }]}>Select your Product</Text>
                            </>
                        }
                        data={productObj?.variantsArr}
                        numColumns={2}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={renderVariantArr}
                        ListFooterComponent={
                            <>
                                <View style={[styles.flexRow, { justifyContent: "space-between", alignItems: "center" }]}>
                                    <Text style={[styles.imgText2, { alignItems: 'center', marginTop: Spacing.MARGIN_25 }]}>Quantity</Text>
                                    <View style={[styles.flexRow, { width: wp(50), marginTop: 20, alignSelf: "center", borderRadius: 12, borderColor: "rgba(0,0,0,0.2)", borderWidth: 1 }]}>
                                        <Pressable style={{ borderColor: Colors.GRADIENT1, borderWidth: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(10), display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => reduceQuantity()}>
                                            <Text style={{ fontSize: 24 }}>-</Text>
                                        </Pressable>
                                        <TextInput placeholder="1" value={`${quantity}`} style={{ flex: 1, textAlign: "center", color: "black" }} editable={false} keyboardType="number-pad" onChangeText={(val) => { (parseInt(val) <= 2) ? setQuantity(val) : alert("Max Count can be 2") }} />
                                        <Pressable style={{ borderColor: Colors.GRADIENT1, borderWidth: 2, width: wp(10), borderTopRightRadius: 10, borderBottomRightRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => increaseQuantity()}>
                                            <Text style={{ fontSize: 24 }}>+</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <Text style={[styles.imgText2, { alignItems: 'center', marginTop: Spacing.MARGIN_25 }]}>{productObj.description}</Text>
                                <TouchableOpacity onPress={() => handleCreateChildGoal()} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30, marginBottom: Spacing.SIZE_50 }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                        <Text style={[styles.btnText]}>Add to Wishlist</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                        }
                    />
                    :
                    <ScrollView
                        contentContainerStyle={[styles.container]}
                    >
                        <View style={[styles.imgView]}>
                            <Carousel
                                //  ref={(c) => { this._carousel = c; }}
                                data={productObj?.item?.default_media}
                                renderItem={renderSlide}
                                sliderWidth={wp(90)}
                                itemWidth={wp(90)}
                                onSnapToItem={slideIndex => {
                                    setActiveItem(slideIndex);
                                }}
                            />
                            <Pagination
                                dotsLength={productObj?.item?.default_media.length}
                                activeDotIndex={activeItem}
                                containerStyle={{ backgroundColor: 'transparent' }}
                                dotStyle={{
                                    backgroundColor: Colors.PRIMARY,
                                    width: wp(4),
                                    borderColor: Colors.PRIMARY,
                                    borderWidth: 2,
                                    borderRadius: 20,
                                }}
                                inactiveDotStyle={{
                                    backgroundColor: '#fff',
                                    width: wp(5),
                                    borderColor: Colors.PRIMARY,
                                    borderWidth: 2,
                                    borderRadius: 20,
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                            {/* <Image source={{ uri: productObj?.item?.default_media[0]?.full_media_url }} style={[styles.img]} /> */}
                            <Text style={[styles.imgText, { paddingHorizontal: Spacing.MARGIN_15 }]}>{productObj?.title}</Text>
                            <View style={[CommonStyle.flexRow, { justifyContent: 'space-between', paddingHorizontal: Spacing.MARGIN_15 }]}>
                                <View style={styles.flexRow}>
                                    {
                                        selectedProductObj?.favcy_inventory_item?.amount != selectedProductObj?.reseller_markup_rules?.upper_limit &&
                                        <Text style={[styles.imgText2, { textDecorationLine: "line-through", paddingRight: 10 }]}>{selectedProductObj?.reseller_markup_rules?.upper_limit} INR</Text>
                                    }
                                    <Text style={[styles.imgText2]}>{selectedProductObj && selectedProductObj?.favcy_inventory_item?.final_amount} INR</Text>
                                </View>
                                {/* <Text style={[styles.imgText2, { color: '#9A9A9A', fontSize: Typography.FONT_SIZE_12 }]}>{selectedProductObj && selectedProductObj?.favcy_inventory_item?.left} items available</Text> */}
                            </View>
                        </View>
                        <View style={[styles.flexRow, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={[styles.imgText2, { alignItems: 'center', marginTop: Spacing.MARGIN_25 }]}>Quantity</Text>
                            <View style={[styles.flexRow, { width: wp(50), marginTop: 20, alignSelf: "center", borderRadius: 12, borderColor: "rgba(0,0,0,0.2)", borderWidth: 1 }]}>
                                <Pressable style={{ borderColor: Colors.GRADIENT1, borderWidth: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: wp(10), display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => reduceQuantity()}>
                                    <Text style={{ fontSize: 24 }}>-</Text>
                                </Pressable>
                                <TextInput placeholder="1" editable={false} value={`${quantity}`} style={{ flex: 1, textAlign: "center", color: "black" }} keyboardType="number-pad" onChangeText={(val) => { (parseInt(val) <= 2) ? setQuantity(val) : alert("Max Count can be 2") }} />
                                <Pressable style={{ borderColor: Colors.GRADIENT1, borderWidth: 2, width: wp(10), borderTopRightRadius: 10, borderBottomRightRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => increaseQuantity()}>
                                    <Text style={{ fontSize: 24 }}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={[styles.imgText2, { alignItems: 'center', marginTop: Spacing.MARGIN_25 }]}>{productObj.description}</Text>
                        <TouchableOpacity onPress={() => handleCreateChildGoal()} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30, marginBottom: Spacing.SIZE_50 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <Text style={[styles.btnText]}>Add to Wishlist</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>

            }
            <View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalIsVisible}
                >
                    <View style={[commonStyle.modalBackground, {}]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, height: hp(42) }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[parentStyle.linearModal]} >
                                <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[parentStyle.modalTeady,]} />
                            </LinearGradient>
                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '80%', alignSelf: 'center', marginVertical: 40 }]}>{`${messageString}`}</Text>
                            </View>
                            <View style={[parentStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_25, width: "90%", justifyContent: "space-between" }]}>
                                <TouchableOpacity style={{ width: '49%' }} onPress={() => { setModalIsVisible(false); }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[parentStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE, paddingVertical: Spacing.PADDING_7, }]}>Ok</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '49%' }} onPress={() => { props.navigation.goBack(); setModalIsVisible(false); }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[parentStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE, paddingVertical: Spacing.PADDING_7, }]}>Close</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    bg: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    container: {
        padding: Spacing.MARGIN_20,
    },
    imgView: {
        paddingBottom: Spacing.MARGIN_15,
        marginTop: Spacing.MARGIN_30,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 7.62,

        elevation: 4,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    img: {
        height: hp(39),
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    btnView: {
        // height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_17,
        color: Colors.LIGHT_BLACK,
        fontWeight: '600',
        marginVertical: Spacing.MARGIN_10,

    },
    imgText2: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LIGHT_BLACK,
        fontWeight: '500',
    },
    linearBtn: {
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        paddingVertical: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_25
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})
