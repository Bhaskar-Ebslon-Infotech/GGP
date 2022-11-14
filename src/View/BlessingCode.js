import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ENTYPO } from '../Styles/theme/Icons';
import Entypo from 'react-native-vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Blessing from '../images/svg/blessingCode';
import Money from '../images/svg/money'

export default function BlessingCode() {
    const base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return (
        <ScrollView style={{backgroundColor:'#fff'}}>
            <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_80 }]}>Ask Blessings</Text>
            <Text style={[styles.text]}>Scan</Text>

            <View style={{ width: '49%', alignSelf: 'center' }}>
                <QRCode
                    value="hii guys"
                    logo={{ uri: base64Logo }}
                    size={Spacing.SIZE_200}
                    logoBackgroundColor='transparent'
                />
                <Entypo name={ENTYPO.SHARE} size={Spacing.MARGIN_25} color={Colors.PRIMARY} style={{ marginTop: Spacing.MARGIN_10 }} />
            </View>
            <View style={[styles.imgView]}>
                <Image source={require('../images/blessingCode.png')} resizeMode='stretch' style={[styles.img]} />
            {/* <Blessing resizeMode='cover' height={hp(10)} width={wp('90%')} /> */}
            {/* <Money resizeMode='cover' height={hp(10)} width={wp('90%')} /> */}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: '600',
        color: '#747474',
        textAlign: 'center',
        marginTop: Spacing.MARGIN_50,
        marginBottom: Spacing.MARGIN_20
    },
    imgView: {
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_60,
        paddingHorizontal: Spacing.MARGIN_30
    },
    img: {
        width: wp(90),
        height: hp(25),
    }
})