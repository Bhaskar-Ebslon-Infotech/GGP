import React from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import commonStyle from '../Styles/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { images } from '../Constant/background';
import Bless from '../images/svg/blessing';

export default function Blessing() {
    const navigation = useNavigation();

    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={[styles.container]}>
                    <TouchableOpacity onPress={() => navigation.navigate('AskBlessing')} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30, width: '100%' }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <View style={[styles.btnView]}>
                                <Text style={[styles.btnText]}>Amount</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BlessingCode')} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_30, width: '100%' }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <View style={[styles.btnView]}>
                                <Text style={[styles.btnText]}>General QR Code</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Bless height={hp(37)} width={wp('100%')} style={[styles.bottomImg]} />
                    {/* <Image source={require('../images/blessing.png')} resizeMode='stretch' style={[styles.bottomImg]} /> */}
                    <View style={{ position: 'absolute', width: '40%', bottom: hp(32), right: hp(3) }}>
                        <Text style={[styles.bottomImgText]}>Request a blessing from your love ones.</Text>
                    </View>
                </View>
            </ImageBackground>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Spacing.MARGIN_20,
        marginTop: Spacing.SIZE_180,
    },
    linearBtn: {
        borderRadius: 10,
        padding: Spacing.PADDING_3
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_17,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        paddingVertical: Spacing.MARGIN_10,

    },
    btnView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
    },
    bottomImg: {
        // width: wp(90),
        // height: hp(30),
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_60,
        marginBottom: Spacing.MARGIN_40
    },
    bottomImgText: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: '500',
        fontFamily: 'Cookies',
        textAlign: 'center'
    }
})