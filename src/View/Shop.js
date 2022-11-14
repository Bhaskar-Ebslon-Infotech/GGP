import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Typography, Spacing } from '../Styles/theme';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getShopProducts, getShopProductsForKid } from '../api/shop/ShopProducts';
import { LoaderContext, toggleModalContext } from '../../App';

export default function Shop() {
    const navigation = useNavigation();
    const focused = useIsFocused();
    const [clicked, setClicked] = useState(false);
    const [productArr, setProductArr] = useState([]);
    const [displayProductArr, setDisplayProductArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const wishList = () => {
        setClicked(!clicked)
    }

    const data = [
        {
            id: '1',
            img: require('../images/productDetails.png'),
            title: 'Product'
        },
        {
            id: '2',
            img: require('../images/productDetails.png'),
            title: 'Product'
        },
        {
            id: '3',
            img: require('../images/productDetails.png'),
            title: 'Product'
        },
        {
            id: '4',
            img: require('../images/productDetails.png'),
            title: 'Product'
        },
    ]



    const getAllProductsFromFavcy = async () => {
        setLoading(true)
        try {

            let { data: res } = await getShopProductsForKid()
            if (res.data) {
                let filteredArr = [];
                for (const el of res?.data?.inventory_Data) {
                    if (filteredArr.some(ele => ele.item_id == el.item_id) == false) {
                        filteredArr.push(el);
                    }
                };
                console.log(JSON.stringify(filteredArr, null, 2), "filtered 123 Arr");
                setProductArr(filteredArr);
                setDisplayProductArr(filteredArr);
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

    const renderItem = ({ item: flatlistItem }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: flatlistItem.id, itemId: flatlistItem.item_id })} style={[styles.listView]}>
                <Image source={{ uri: flatlistItem?.item?.default_media[0]?.full_media_url }} style={{ width: '98%', height: hp(18), borderTopLeftRadius: 25 }} />
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
                        {/* let percentageValue = */}
                    </View>
                </View>
            </TouchableOpacity>

            // <View style={{ width: '50%' }}>
            //     <View style={[styles.listView]}>
            //         <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} style={{ alignItems: 'center', justifyContent: 'center' }}>
            //             <Image source={item.img} resizeMode='cover' style={{ width: '98%', height: hp(18), borderTopLeftRadius: 25 }} />
            //         </TouchableOpacity>
            //         <View style={[commonStyle.flexRow, { justifyContent: 'space-between', width: wp(45), paddingBottom: Spacing.MARGIN_5 }]}>
            //             <View style={[commonStyle.flexRow, { justifyContent: 'space-between', width: '100%', paddingHorizontal: Spacing.MARGIN_10, }]}>
            //                 <View style={{ flexDirection: 'column' }}>
            //                     <Text style={[styles.listTitle]}>{item.title}</Text>
            //                     <Text style={[styles.listSubTitle]}>Price</Text>
            //                 </View>
            //                 <TouchableOpacity onPress={() => wishList()}>
            //                     <AntDesign name={ANTDESIGN.HEART} color={clicked ? '#e99740' : '#DBDFE3'} size={Spacing.MARGIN_20} />
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
            //     </View>
            // </View>
        )
    }


    useEffect(() => {
        if (focused) {
            getAllProductsFromFavcy()
        }
    }, [focused])


    const getPercentage = () => {

    }





    return (
        <View>
            <View >
                <FlatList
                    data={productArr}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    renderItem={renderItem}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ListHeaderComponent={
                        <>
                            <Image source={require('../images/shopTop.png')} resizeMode='stretch' style={{ height: hp(37), width: '100%', marginTop: Spacing.MARGIN_30 }} />
                            <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_20, marginBottom: Spacing.MARGIN_40 }]}>Shop{' '}<Image source={require('../images/truck.png')} resizeMethod="resize" resizeMode='contain' style={[styles.bag]} /></Text>
                        </>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    bag: {
        height: hp(5),
        width: wp(8)
    },
    listTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '700',
        color: Colors.LIGHT_BLACK,
    },
    listSubTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: '600',
        color: Colors.PRIMARY,

    },
    listView: {
        width: wp(45),
        minHeight: hp(35),
        alignSelf: 'center',
        alignContent: 'center',
        marginBottom: Spacing.MARGIN_30,
        // borderWidth: 1,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        //  borderColor: '#50505040',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 6.84,

        elevation: 2,
    }
})