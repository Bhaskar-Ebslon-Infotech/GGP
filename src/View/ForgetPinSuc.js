import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import { ENTYPO } from '../Styles/theme/Icons';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Check from '../images/svg/check';

export default function ForgetPinSuc() {
    return (
        <View>
            <Image source={require('../images/forgetTeady.png')} resizeMode='contain' style={[styles.teady]} />
            <ImageBackground source={require('../images/personal.png')} resizeMode='stretch' style={[styles.bottomImg]}>
                <View style={{ marginTop: Spacing.SIZE_160, paddingHorizontal: Spacing.PADDING_20 }}>
                    <Text style={[CommonStyle.title]}>Forget PIN Sent</Text>
                    <Check height={hp(12)} width={wp(20)} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30 }} />
                    <TouchableOpacity style={{ backgroundColor: Colors.WHITE, paddingVertical: Spacing.PADDING_5, borderRadius: 20, marginTop: Spacing.MARGIN_45 }}>
                        <Text style={[styles.btnText]}>Piggy Bank</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomImg: {
        height: hp(80),
        width: '100%'
    },
    teady: {
        marginTop: Spacing.MARGIN_80,
        height: hp(30),
        width: wp(55),
        alignSelf: 'center',
        marginBottom: -Spacing.MARGIN_80
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
})