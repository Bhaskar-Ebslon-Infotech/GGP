import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getShopCategories } from '../../api/shop/ShopCategory';
import { getShopProducts, getShopSaleProducts } from '../../api/shop/ShopProducts';
import Header from '../../Component/Header';
import Corner from '../../images/svg/parentsvg/corner';
import Discount from '../../images/svg/parentsvg/discountW';
import Truck from '../../images/svg/parentsvg/truck';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { SelectedDiscountCouponContext } from '../../Context/SelectedDiscountCoupon';


export default function Shop(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const [categoryArr, setCategoryArr] = useState([]);
    const [productsArr, setProductsArr] = useState([]);
    const [displayProductsArr, setDisplayProductsArr] = useState([]);
    const [saleProductsArr, setSaleProductsArr] = useState([]);
    const handleProductFilter = (value) => {
        let tempArr = productsArr.filter(el => `${el.title}`.toLowerCase().includes(`${value}`.toLowerCase()))
        setDisplayProductsArr(tempArr)
    }



    const categoryRenderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => props.navigation.navigate("CategoryWiseProducts", { data: item.id })} style={{ marginRight: Spacing.MARGIN_10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    item.thumbnail ?
                        <Image source={{ uri: item?.thumbnail?.full_media_url }} resizeMode='cover' style={[styles.categoryData, { borderRadius: 80 }]} />
                        :
                        index / 2 == 0 ?
                            <Image source={require('../../images/cat1.png')} resizeMode='contain' style={[styles.categoryData]} />
                            :
                            index / 3 == 0 ?
                                <Image source={require('../../images/cat2.png')} resizeMode='contain' style={[styles.categoryData]} />
                                :
                                <Image source={require('../../images/cat1.png')} resizeMode='contain' style={[styles.categoryData]} />
                }
                <Text style={[styles.cookiesTitle, { color: "#353535", fontSize: 13, textTransform: "capitalize" }]}>{item.name}</Text>
            </Pressable>
        )
    }
    const saleRenderItem = ({ item: flatlistItem }) => {
        // console.log(flatlistItem?.item?.default_media[0]?.full_media_url, "flatlistItem?.item?.default_media[0]?.full_media_url")
        // console.log(flatlistItem?.item, "flatlistItem image obj")
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: flatlistItem?.id, itemId: flatlistItem?.item_id })} style={[styles.saleView]}>
                <Image source={{ uri: flatlistItem?.item?.default_media[0]?.full_media_url }} style={[styles.img]} />
                <View style={{ marginHorizontal: Spacing.MARGIN_10, marginTop: Spacing.PADDING_4 }}>
                    <Text style={[styles.title]}>{flatlistItem?.title}</Text>
                    <View style={styles.flexRow}>
                        {
                            flatlistItem?.type == "OWNER" ?
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.reseller_markup_rules?.upper_limit} INR</Text>
                                :
                                flatlistItem?.favcy_inventory_item?.amount != flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit &&
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit} INR</Text>
                        }
                        <Text style={[styles.price]}>{flatlistItem?.favcy_inventory_item?.amount} INR</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const productRenderItem = ({ item: flatlistItem }) => {
        console.log(flatlistItem?.favcy_inventory_item?.amount, flatlistItem?.reseller_markup_rules?.upper_limit, flatlistItem.type, flatlistItem?.parent_item_data)
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: flatlistItem.id, itemId: flatlistItem.item_id })} style={[styles.saleView]}>
                <Image source={{ uri: flatlistItem?.item?.default_media[0]?.full_media_url }} style={[styles.img]} />
                <View style={{ marginHorizontal: Spacing.MARGIN_10, marginTop: Spacing.PADDING_4 }}>
                    <Text style={[styles.title]}>{flatlistItem?.title}</Text>
                    <View style={styles.flexRow}>
                        {
                            flatlistItem.type == "OWNER" ?
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.reseller_markup_rules?.upper_limit} INR</Text>
                                :
                                flatlistItem?.favcy_inventory_item?.amount != flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit &&
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit} INR</Text>
                        }
                        <Text style={[styles.price]}>{flatlistItem?.favcy_inventory_item?.amount} INR</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }



    const handleGetCategoriesData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopCategories()
            // console.log(JSON.stringify(res, null, 2), "category Data")
            if (res.data) {
                setCategoryArr(res.data)
            }
            // console.log(JSON.stringify(res.data, null, 2), "Ress")
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


    const handleGetProductData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopProducts();
            // console.log(JSON.stringify(res?.data?.inventory_Data.item, null, 2), "products");
            if (res.data) {
                let filteredArr = [];
                for (const el of res?.data?.inventory_Data) {
                    if (filteredArr.some(ele => ele.item_id == el.item_id) == false) {
                        filteredArr.push(el);
                    }
                };
                // console.log(JSON.stringify(filteredArr, null, 2), "filtered Arr 1");
                setProductsArr(filteredArr);
                setDisplayProductsArr(filteredArr);
            }
            // console.log(JSON.stringify(res.data.inventory_Data[0].item_id, null, 2), "Ress")
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


    const handleGetSaleProductData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopSaleProducts();
            console.log(JSON.stringify(res?.data, null, 2), "Sale products");
            if (res.data) {
                let filteredArr = [];
                for (const el of res?.data?.inventory_Data) {
                    if (filteredArr.some(ele => ele.item_id == el.item_id) == false) {
                        filteredArr.push(el);
                    }
                };
                console.log(JSON.stringify(filteredArr, null, 2), "filtered Arr");
                setSaleProductsArr(filteredArr);
                // setDisplayProductsArr(filteredArr);
            }
            // console.log(JSON.stringify(res.data.inventory_Data[0].item_id, null, 2), "Ress")
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
            handleGetCategoriesData();
            handleGetProductData();
            handleGetSaleProductData();
        }
    }, [focused])

    return (
        <>
            <Header logo={true} />
            <ScrollView contentContainerStyle={{ backgroundColor: Colors.WHITE }}>
                <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                    <Text style={[commonStyle.title, { color: '#353535', marginTop: Spacing.MARGIN_30 }]}>Shop</Text>
                    <TextInput placeholder='Search a product' onChangeText={(e) => handleProductFilter(e)} style={[styles.input]} />
                    <View style={[styles.topBtnView]}>
                        <TouchableOpacity style={[styles.topBtn, { backgroundColor: '#C9E165', alignItems: "center" }]} onPress={() => navigation.navigate('KidCorner')}>
                            <Text style={[styles.topBtnTxt, { fontSize: wp(3), marginLeft: Spacing.PADDING_4 }]}>My Kid’s Corner</Text>
                            <Corner height={hp(3)} width={wp(4)} style={{ marginLeft: Spacing.PADDING_5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.topBtn, { backgroundColor: '#AA23AD', alignItems: "center" }]} onPress={() => navigation.navigate('Discount')}>
                            <Text style={[styles.topBtnTxt, { color: Colors.WHITE }]}>Discounts</Text>
                            <Discount height={hp(3)} width={wp(4)} style={{ marginLeft: Spacing.PADDING_5 }} />
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.topBtn, { backgroundColor: '#EC892B', alignItems: "center" }]} onPress={() => navigation.navigate('MyOrders')}>
                            <Text style={[styles.topBtnTxt]}>My Orders</Text>
                            <Truck height={hp(3)} width={wp(5)} style={{ marginLeft: Spacing.PADDING_5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: '#F2F4F6', marginTop: Spacing.MARGIN_30, flex: 1, paddingHorizontal: Spacing.MARGIN_15, paddingBottom: 10 }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30 }]}>Categories</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("AllCategories")}>
                            <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30, fontSize: 14 }]}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categoryArr}
                        renderItem={categoryRenderItem}
                        horizontal={true}
                        ListEmptyComponent={
                            <Text style={styles.title}>No Data Found</Text>
                        }
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                        <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30 }]}>Sale</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("AllSaleProducts")}>
                            <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30, fontSize: 14 }]}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={saleProductsArr}
                        renderItem={saleRenderItem}
                        horizontal={true}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        ListEmptyComponent={
                            <Text style={styles.title}>No Data Found</Text>
                        }
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={true}
                    />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                        <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30 }]}>Products</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("AllProducts")}>
                            <Text style={[styles.cookiesTitle, { marginTop: Spacing.MARGIN_30, fontSize: 14 }]}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={displayProductsArr}
                        contentContainerStyle={{ marginBottom: 20, paddingBottom: 10 }}
                        renderItem={productRenderItem}
                        horizontal={true}
                        ListEmptyComponent={
                            <Text style={styles.title}>No Data Found</Text>
                        }
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={true}
                    />
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: Spacing.MARGIN_15,
        width: '100%',
        height: hp(6),
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    flexRow: {
        display: "flex",
        flexDirection: "row"
    },
    img: {
        width: '100%',
        height: hp(22),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 20,
    },
    saleView: {
        width: wp(46),
        marginRight: Spacing.MARGIN_10,
        minHeight: hp(29),
        shadowColor: "#000",
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    title: {
        fontSize: Typography.FONT_SIZE_13,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK
    },
    price: {
        fontSize: Typography.FONT_SIZE_13,
        fontFamily: 'Montserrat-Regular',
        color: Colors.PRIMARY
    },
    cookiesTitle: {
        fontFamily: 'Cookies',
        marginVertical: Spacing.MARGIN_10,
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_20
    },
    categoryData: {
        height: hp(15),
        width: wp(30),

    },
    topBtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_15,
        display: "flex",
        // backgroundColor: "red",
        width: wp(95),
        justifyContent: "center"
    },
    topBtn: {
        flexDirection: 'row',
        display: "flex",
        marginHorizontal: 5,
        paddingHorizontal: 10,
        // width: "30%",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
        alignSelf: 'center',
        alignContent: 'center',

    },
    topBtnTxt: {
        fontSize: Typography.FONT_SIZE_12,
        textAlign: 'center',
        alignSelf: 'center',
        paddingVertical: Spacing.MARGIN_5,
        color: Colors.LIGHT_BLACK
    },
    toggle: {
        borderWidth: 1,
        width: '15%',
        height: hp(1),
        borderColor: '#AA23AD',
        borderRadius: 10,
        marginHorizontal: Spacing.PADDING_5
    }
})