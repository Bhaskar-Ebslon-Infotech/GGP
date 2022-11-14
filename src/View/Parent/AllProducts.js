import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getShopCategories } from '../../api/shop/ShopCategory';
import { getShopProducts } from '../../api/shop/ShopProducts';
import Header from '../../Component/Header';
import Corner from '../../images/svg/parentsvg/corner';
import Discount from '../../images/svg/parentsvg/discountW';
import Truck from '../../images/svg/parentsvg/truck';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';

export default function AllProducts(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [productsArr, setProductsArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;


    const productRenderItem = ({ item: flatlistItem }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: flatlistItem.id, itemId: flatlistItem.item_id })} style={[styles.saleView]}>
                <Image source={{ uri: flatlistItem?.item?.default_media[0]?.full_media_url }} style={[styles.img]} />
                <View style={{ marginHorizontal: Spacing.MARGIN_10, marginTop: Spacing.PADDING_4 }}>
                    <Text style={[styles.title]}>{flatlistItem.title} {flatlistItem?.item?.default_media?.full_media_url}</Text>
                    <View style={styles.flexRow}>
                        {
                            flatlistItem.type == "OWNER" ?
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.reseller_markup_rules?.upper_limit} INR</Text>
                                :

                                flatlistItem?.favcy_inventory_item?.amount != flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit &&
                                <Text style={[styles.price, { textDecorationLine: "line-through", color: "#333", paddingRight: 9 }]}>{flatlistItem?.parent_item_data[0]?.reseller_markup_rules?.upper_limit} INR</Text>
                        }
                        <Text style={[styles.price]}>₹{flatlistItem?.favcy_inventory_item?.amount} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const handleGetProductData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopProducts()
            console.log(JSON.stringify(res?.data.inventory_Data.length, null, 2), "products")
            if (res.data) {
                let filteredArr = []
                for (const el of res?.data.inventory_Data) {
                    if (filteredArr.some(ele => ele?.item_id == el?.item_id) == false) {

                        // if(el)

                        filteredArr.push(el)
                    }
                };
                setProductsArr(filteredArr)
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


    useEffect(() => {
        if (focused) {
            handleGetProductData()
        }
    }, [focused])

    return (
        <>
            <Header logo={true} />
            <FlatList
                ListHeaderComponent={
                    <Text style={[commonStyle.title, { color: '#353535', marginTop: 10, marginBottom: 40 }]}>Our Products</Text>
                }
                contentContainerStyle={{ backgroundColor: '#F2F4F6', paddingBottom: 50 }}
                data={productsArr}
                scrollEnabled
                ListEmptyComponent={
                    <Text style={styles.title}>No Data Found</Text>
                }
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                renderItem={productRenderItem}
                keyExtractor={(item, index) => index}
            />
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
        width: wp(45),
        marginLeft: wp(2),
        marginBottom: 20,
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

    },
    topBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(30),
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