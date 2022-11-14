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

export default function AllCategories(props) {
    const navigation = useNavigation();

    const focused = useIsFocused()
    // category

    const [categoryArr, setCategoryArr] = useState([]);
    const [productsArr, setProductsArr] = useState([]);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;


    const categoryRenderItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => props.navigation.navigate("CategoryWiseProducts", { data: item.id })} style={{ marginRight: Spacing.MARGIN_10, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10, width: wp(49) }}>
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





    const handleGetCategoriesData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getShopCategories()
            // console.log(JSON.stringify(res, null, 2))
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




    useEffect(() => {
        if (focused) {
            handleGetCategoriesData()
        }
    }, [focused])

    return (
        <>
            <Header logo={true} />

            <FlatList
                ListHeaderComponent={
                    <Text style={[commonStyle.title, { color: '#353535', marginTop: 20, marginBottom: 30 }]}>Categories</Text>
                }
                contentContainerStyle={{ backgroundColor: '#F2F4F6', paddingBottom: 100 }}
                data={categoryArr}
                renderItem={categoryRenderItem}
                numColumns={2}
                ListEmptyComponent={
                    <Text style={styles.title}>No Data Found</Text>
                }
                showsHorizontalScrollIndicator={false}
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
        height: hp(29),
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