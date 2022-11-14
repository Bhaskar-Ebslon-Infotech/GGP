import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Dis from '../../images/svg/parentsvg/discount';
import { LoaderContext, toggleModalContext } from '../../../App';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getDiscountCoupon } from '../../api/shop/DiscountCoupons';
import { SelectedDiscountCouponContext } from '../../Context/SelectedDiscountCoupon';

export default function VoucherSelection(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useContext(SelectedDiscountCouponContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [couponDataArr, setCouponDataArr] = useState([]);
    const [query, setQuery] = useState('');
    const [couponMainDataArr, setCouponMainDataArr] = useState([]);
    const data = [
        {
            id: '1',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '2',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },

    ]




    const getDiscountCouponDataFromDb = async () => {
        try {
            setLoading(true)
            let { data: res } = await getDiscountCoupon()
            if (res.data) {

                setLoading(false)
                console.log(JSON.stringify(res.data, null, 2), "res discount Coupon")
                setCouponDataArr(res.data)
                setCouponMainDataArr(res.data)
            }
        }
        catch (error) {
            setLoading(false)
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error.response.data.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
    }


    useEffect(() => {
        if (focused) {
            getDiscountCouponDataFromDb()
        }
    }, [focused])


    const handleSearchVoucher = () => {
        if (query != "") {
            let tempArr = couponMainDataArr.filter(el => `${el.voucher_code}`.toLowerCase().includes(`${query}`.toLowerCase()))
            setCouponDataArr([...tempArr])
        }
        else {
            setCouponDataArr([...couponMainDataArr])
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.listView]}>
                <ImageBackground source={require('../../images/ticket.png')} resizeMode='cover' style={[styles.ticket]}>
                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: -Spacing.MARGIN_10 }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.brand]}>{item.voucher_code}</Text>
                            <Text style={[styles.brand]}>{item.type == "flat_amount" ? `${(item.voucher_value_in_100 / 100)} INR Off` : `${(item.voucher_value_in_100 / 100)}% Off`}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setSelectedDiscountCoupon(item); navigation.goBack() }} style={{ backgroundColor: Colors.WHITE, borderRadius: 5 }}>
                            <Text style={[styles.use]}>Use</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: Spacing.MARGIN_10, paddingVertical: Spacing.MARGIN_10, }}>
                    <Text style={[styles.desc]}>{item.description}</Text>
                    <Text style={[styles.desc]}>Valid Until {`${item.end_timestamp}`.split(" ")[0]}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />

            <FlatList
                data={couponDataArr}
                contentContainerStyle={{ paddingHorizontal: Spacing.MARGIN_15, paddingTop: Spacing.MARGIN_10, paddingBottom: Spacing.MARGIN_20 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={
                    <View style={{ marginVertical: Spacing.MARGIN_20 }}>
                        <Text style={[styles.head]}>Voucher Selection</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                            <TextInput placeholder='Type Code' onChangeText={(val) => setQuery(val)} value={query} style={[styles.input]} />
                            <TouchableOpacity onPress={() => handleSearchVoucher()} style={{ width: '38%', marginLeft: Spacing.MARGIN_10 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '98%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.PRIMARY, paddingVertical: Spacing.MARGIN_5 }]}>Search</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={[styles.desc]}>No vouchers found</Text>

                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    listView: {
        // borderWidth: 1,
        borderColor: '#BFBFBF',
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        marginTop: Spacing.MARGIN_10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,

        elevation: 2,
    },
    ticket: {
        width: '100%',
        height: hp(10),
        paddingHorizontal: Spacing.MARGIN_10,
        justifyContent: 'center'
    },
    brand: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.WHITE
    },
    use: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: 2,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-Regular',
    },
    desc: {
        fontSize: Spacing.MARGIN_12,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
    },
    head: {
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
    },
    input: {
        borderWidth: 1,
        height: hp(5.5),
        borderRadius: 20,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        width: '60%',
    },
    btnView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
})