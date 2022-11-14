import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography } from '../Styles/theme';
import Money from '../images/svg/money';
import Coin from '../images/svg/coin';
import TeadyPrize from '../images/svg/teadyPrize';
import { ANTDESIGN } from "../Styles/theme/Icons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Prize from '../images/svg/prize';
import PrizeBg from '../images/svg/prizeBg';


export default function DailyVideo() {
    const [collectModal, setCollectModal] = useState(false);
    const data = [
        {
            id: '1',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            status: '5 INR',
            borderColor: Colors.SECONDARY
        },
        {
            id: '2',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            // status: '5 INR',
            borderColor: Colors.GRADIENT2
        },
        {
            id: '3',
            title: 'Color Pencil',
            leftRupee: '55 INR',
            img: require('../images/cross.png'),
            status: '5 INR',
            borderColor: Colors.PRIMARY
        },

    ]

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.listMainView, { borderColor: item.borderColor }]}>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between', }]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.listTitle, { width: "55%" }]}>{item.title}</Text>
                        <Text style={[styles.inr]}>{item.leftRupee}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={item.img} resizeMode='contain' style={[styles.listImg]} />
                        {item.status && (
                            <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_5, }]}>
                                <Coin height={hp(3)} width={wp(3)} />
                                <Text style={[styles.inr, { fontSize: Typography.FONT_SIZE_12, alignItems: 'center', marginLeft: Spacing.MARGIN_5 }]}>{item.status}</Text>
                            </View>
                        )}

                    </View>
                </View>
            </View>
        )
    }
    return (
        <View>
            <ImageBackground source={require('../images/shippingBg.png')} style={[commonStyle.fullSize]}>
                {/* <Header /> */}
                <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        ListHeaderComponent={
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Spacing.MARGIN_30 }}>
                                    <View style={[commonStyle.flexRow,]}>
                                        <Coin height={hp(5)} width={wp(5)} />
                                        <Text style={[styles.bottomInr, { marginLeft: Spacing.MARGIN_5 }]} >8 INR</Text>
                                    </View>
                                    <Money height={hp(10)} width={wp(25)} style={{ alignSelf: 'center', marginLeft: Spacing.MARGIN_60 }} />
                                </View>
                                <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_15, marginBottom: Spacing.MARGIN_25 }]}>Daily Videos </Text>
                            </>
                        }
                        ListFooterComponent={
                            <View style={{ marginTop: Spacing.MARGIN_20 }}>
                                <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                                    <Coin height={hp(5)} width={wp(5)} />
                                    <Text style={[styles.bottomInr, { marginLeft: Spacing.MARGIN_5 }]} >8 INR</Text>
                                </View>

                                <TouchableOpacity onPress={() => setCollectModal(true)} style={{ width: '40%', alignSelf: 'center', marginTop: Spacing.PADDING_10 }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                        <View style={[styles.btnView]}>
                                            <Text style={[styles.btnText]}>Collect Total</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>

            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={collectModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg]}>
                        <PrizeBg style={[styles.prizeBg]} height={hp(31)} width={'100%'} />
                        <Prize style={[styles.modalPrize]} height={hp(17)} width={wp(24)} />
                        {/* <ImageBackground source={require('../images/prizeBg.png')} style={[styles.prizeBg]}>
                            <Image source={require('../images/prize.png')} resizeMode="contain" style={[styles.modalPrize]} />
                        </ImageBackground> */}
                        <Text style={[commonStyle.modalTitle]}>Video completed</Text>
                        <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK }]}>Amount Earned</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                            <Coin height={hp(3)} width={wp(6)} />
                            <Text style={[styles.bottomInr, { marginLeft: Spacing.PADDING_5 }]} >8 INR</Text>
                        </View>
                        {/* <TeadyPrize height={hp(25)} width={wp(45)} resizeMode='contain' style={[commonStyle.modalTeady]} /> */}
                        <Image source={require('../images/teadyPrize1.png')} resizeMode='cover' style={[commonStyle.modalTeady]} />
                    </View>
                    <TouchableOpacity onPress={() => setCollectModal(false)} style={{ marginTop: Spacing.MARGIN_15 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_35} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    truck: {
        height: hp(5),
        width: wp(5)
    },

    listMainView: {
        paddingHorizontal: Spacing.MARGIN_10,
        paddingVertical: Spacing.MARGIN_5,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15,
        backgroundColor: '#F2F4F6'
    },
    listTitle: {
        fontFamily: 'MontserratH3-SemiBold',
        fontSize: Typography.FONT_SIZE_20,
        color: '#747474',
        fontWeight: '700',
    },
    listImg: {
        height: hp(5),
        width: wp(10),
        alignSelf: 'flex-end'
    },
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        fontWeight: '500',
        alignItems: 'center'
    },
    linearBtn: {
        height: hp(5),
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnView: {
        //  backgroundColor: Colors.WHITE,
        height: "100%",
        width: "100%",
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    bottomInr: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.PRIMARY,
        fontWeight: '700',
    },
    prizeBg: {
        // height: hp(25),
        // width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    modalPrize: {
        height: hp(12),
        width: wp(22),
        position: 'absolute',
        alignSelf: 'center',
        top: hp(7)

    },
    modalTeady: {
        position: 'absolute',
        bottom: -10,
        left: -12,
        padding: 0,
        // backgroundColor:"red",
        height: hp(18),
        width: hp(20)
    }
})
