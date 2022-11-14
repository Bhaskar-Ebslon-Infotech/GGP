import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import { ENTYPO } from '../Styles/theme/Icons';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../Constant/background';

export default function ForgetPin() {
    const navigation = useNavigation();

    return (
        <View>
            <ImageBackground source={images.backGround} style={[CommonStyle.fullSize]}>
                <Image source={require('../images/forget.png')} resizeMode='cover' style={[styles.topImg]} />
                <View style={{ marginTop: Spacing.SIZE_120 }}>
                    <Text style={[CommonStyle.title, { color: Colors.PRIMARY }]}>Forget PIN</Text>
                    <Text style={[styles.subTitle]}>Don’t worry your parent will help you!</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('ChangePinSuc')} style={{ paddingHorizontal: Spacing.PADDING_20, marginTop: Spacing.MARGIN_60 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <Text style={[styles.btnText]}>Forget PIN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>



            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    topImg: {
        width: '100%',
        height: hp(27)
    },
    subTitle: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '400',
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
        marginTop: Spacing.MARGIN_10
    },
    linearBtn: {
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
})