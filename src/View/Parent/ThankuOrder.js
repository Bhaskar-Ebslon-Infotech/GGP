import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import Check from '../../images/svg/parentsvg/check';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import parentStyle from '../../Styles/parentStyle';

export default function ThankuOrder() {
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize,{height:hp(90)}]}>
                <Header logo={true} />
                <View style={{ padding: Spacing.MARGIN_20, marginTop: Spacing.MARGIN_20 }}>
                    <Check height={hp(9)} width={wp(16)} style={{ alignSelf: 'center' }} />
                    <Text style={[styles.thanku]}>Thank you for your order!</Text>
                    <View style={[commonStyle.flexRow, styles.view]}>
                        <Image source={require('../../images/product.png')} style={[styles.img]} />
                        <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_20 }}>
                            <Text style={[styles.title]}>High Quality Wooden Bike</Text>
                            <Text style={[styles.amount]}>500 INR</Text>
                        </View>
                    </View>
                    <Text style={[styles.bottomText]}>To ship by the merchant. It will arrive 5-7 days.</Text>
                </View>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]}/>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    thanku: {
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_22,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: Spacing.MARGIN_15
    },
    view: {
        marginTop: Spacing.MARGIN_30,
        backgroundColor: Colors.WHITE,
        height: hp(20),
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    img: {
        height: '100%',
        width: wp(40),
        borderRadius: 15
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_20,
        width: '70%'
    },
    amount: {
        fontSize: Typography.FONT_SIZE_18,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.MARGIN_35
    },
    bottomText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        width: '55%',
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_5
    }
})