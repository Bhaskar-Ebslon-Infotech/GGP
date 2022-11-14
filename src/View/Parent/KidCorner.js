import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import WishList from '../../images/svg/parentsvg/wishList';
import Goals from '../../images/svg/parentsvg/goals';
import Trash from '../../images/svg/parentsvg/trash';
import Cart from '../../images/svg/parentsvg/cart';
import Check from '../../images/svg/parentsvg/check';
import Cancel from '../../images/svg/parentsvg/cancel';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ParentWishlistPage from './ParentWishlistPage';
import ParentCartPage from './ParentCartPage';
import ParentGoalsPage from './ParentGoalsPage';





export default function KidCorner(props) {
    const [wishList, setWishList] = useState(true);
    const [goals, setGoals] = useState(false);
    const [cart, setCart] = useState(false);
    const focused = useIsFocused()
    const wishlist = () => {
        setWishList(true)
        setGoals(false)
        setCart(false)
    }
    const goal = () => {
        setWishList(false)
        setGoals(true)
        setCart(false)
    }
    const carts = () => {
        setWishList(false)
        setGoals(false)
        setCart(true)
    }
    useEffect(() => {
        if (focused) {
            if (props?.route?.params && props?.route?.params?.data == 'cart') {
                carts()
            }
        }
    }, [focused])
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, marginTop: Spacing.PADDING_20 }]}>My Kid’s Corner</Text>
            <View style={{ paddingHorizontal: Spacing.PADDING_20 }}>
                <View style={[commonStyle.flexRow, styles.topView]}>

                    <TouchableOpacity onPress={() => wishlist()} style={{ borderColor: wishList ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.PADDING_10, }]}>
                            <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Wishlist</Text>
                            <WishList height={hp(4)} width={wp(7)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goal()} style={{ borderColor: goals ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.PADDING_10, }]}>
                            <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Goals</Text>
                            <Goals height={hp(4)} width={wp(7)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => carts()} style={{ borderColor: cart ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.PADDING_10, }]}>
                            <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Cart</Text>
                            <Cart height={hp(4)} width={wp(7)} />
                        </View>
                    </TouchableOpacity>
                </View>
                {wishList && (
                    <ParentWishlistPage />
                )}
                {goals && (
                    <ParentGoalsPage />
                )}
                {cart && (
                    <ParentCartPage />
                )}
            </View>

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
        height: hp(20),
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
        width: '70%',
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