import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Modal, TextInput } from 'react-native';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { getDiscountCoupon } from '../../api/shop/DiscountCoupons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SelectedDiscountCouponContext } from '../../Context/SelectedDiscountCoupon';
import { LoaderContext, toggleModalContext } from '../../../App';


export default function Discount() {
    const [videoModal, setVideoModal] = useState(false)
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

    const onBuffer = () => {

    }
    const videoError = () => {

    }
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
        {
            id: '3',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '4',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        },
        {
            id: '5',
            brand: 'Brand X',
            inr: '30',
            desc: 'Any Purchase of 50 INR or More',
            valid: '01/01/2022',
        }
    ]


    const handleCouponSelection = (item) => {
        setSelectedDiscountCoupon(item);
        // setToggleModal(true)
        // setMessage("Discount voucher selected")
        navigation.navigate("KidCorner", { data: "cart" })
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
                        <TouchableOpacity onPress={() => { handleCouponSelection(item) }} style={{ backgroundColor: Colors.WHITE, borderRadius: 5 }}>
                            <Text style={[styles.use]}>Select</Text>
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
                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_10 }]}>
                        <Text style={{ fontSize: Typography.FONT_SIZE_22, color: Colors.PRIMARY, fontFamily: 'Montserrat-SemiBold', marginLeft: Spacing.MARGIN_5 }}>Discount Vouchers</Text>
                    </View>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg,]}>
                        <Video source={require('../../images/sampleVideo.mp4')}
                            onBuffer={onBuffer}
                            onError={videoError}
                            resizeMode="cover"
                            style={styles.video}
                            paused={false}
                        />
                        <View style={{ paddingVertical: Spacing.PADDING_20, paddingHorizontal: Spacing.PADDING_20 }}>
                            <TextInput placeholder='Apply Discount Code' style={[styles.input]} />

                            <TouchableOpacity style={{ marginTop: Spacing.PADDING_15 }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText]}>Missions</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    listView: {
        //borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.WHITE,
        borderColor: '#BFBFBF',
        marginTop: Spacing.MARGIN_10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,

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
        paddingVertical: Spacing.PADDING_2,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-Regular',
    },
    desc: {
        fontSize: Typography.FONT_SIZE_12,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
    },
    video: {
        width: '100%',
        height: hp(30),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    input: {
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 30,
        fontSize: 15,
        height: hp(6.5),
        color: '#BFBFBF',
        borderColor: '#BFBFBF'
    },
    btnView: {
        width: '99%',
        // backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_5,
    },

})