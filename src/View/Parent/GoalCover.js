import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import CommonHeader from '../../Component/Header'
import Check from '../../images/svg/parentsvg/check'
export default function GoalCover() {
    const navigation = useNavigation();

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <CommonHeader logo={true} />
            <ScrollView>
                <ImageBackground source={require('../../images/bg2.png')} resizeMode='cover' style={[commonStyle.fullSize, { height: hp(95) }]}>
                    <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                        <Text style={[styles.rupee]}>2,250</Text>
                        <Text style={[styles.subTitle]}>My Wallet</Text>
                        <Check height={hp(7)} width={wp(10)} style={{ marginTop: Spacing.PADDING_7, marginBottom: Spacing.PADDING_5, alignSelf: 'center' }} />
                        <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.LIGHT_BLACK }]}>250 INR</Text>

                        <View style={[styles.view]}>
                            <Image source={require('../../images/product.png')} resizeMode='cover' style={[styles.img]} />
                            <View style={{ flexDirection: 'column', marginLeft: Spacing.PADDING_15 }}>
                                <Text style={[styles.title]}>High Quality Wooden Bike</Text>
                                <Text style={[styles.inr]}>500 INR</Text>

                                <View style={{ borderWidth: 1, width: '55%', borderColor: Colors.PRIMARY, borderRadius: 5, marginTop: Spacing.PADDING_7 }}>
                                    <View style={[commonStyle.flexRow,]}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.listStatus, { width: '70%' }]} ></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ width: '55%' }}>
                                    <Text style={[styles.bottomInr]}>60 INR more</Text>
                                </View>
                            </View>
                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'ShopStack',params: {screen: 'GoalCart', } })} style={{ marginTop: Spacing.MARGIN_50 }} >
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                <Text style={[commonStyle.btnText]}>Back to My Kid’s Goal</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[styles.bottonPg]} />
                </ImageBackground>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    btnView: {
        width: wp(87.5),
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_10,
    },
    linearBtn: {
        width: '100%',
        borderRadius: 7,
        marginVertical: Spacing.PADDING_10,
    },
    whiteBackground: {
        marginHorizontal: Spacing.MARGIN_40,
        marginVertical: Spacing.MARGIN_50,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: Spacing.MARGIN_30,
        paddingVertical: Spacing.MARGIN_10
    },
    modalText: {
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.MARGIN_5,
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular'
    },
    bottonPg: {
        position: 'absolute',
        bottom: 37,
        right: 20,
        zIndex: -10,
        height: hp(20),
        width: wp(36),
    },
    subTitle: {
        textAlign: 'center',
        color: '#747474',
        fontFamily: 'Montserrat-Regular',
        marginBottom: Spacing.MARGIN_10,
        fontSize: Typography.FONT_SIZE_13
    },
    rupee: {
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        marginTop: Spacing.MARGIN_20
    },
    img: {
        height: hp(18),
        width: wp(42),
        borderRadius: Spacing.MARGIN_20,
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
    listStatus: {
        borderWidth: 2,
    },
    bottomInr: {
        fontSize: Typography.FONT_SIZE_11,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_2,
        alignSelf: 'flex-end'
    },
    view:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_20,
        width: '99%',
        height: hp(18),
        shadowColor: "#000",
        borderRadius: 20,
       backgroundColor:'#fff',
        borderColor:'#50505040',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }
})