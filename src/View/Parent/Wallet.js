import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import CommonHeader from '../../Component/CommonHeader'
import { images } from '../../Constant/background';
export default function Wallet() {
    const navigation = useNavigation();

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <CommonHeader />
            <ScrollView>
                <ImageBackground source={require('../../images/bg2.png')} resizeMode='cover' style={[commonStyle.fullSize, { height: hp(84) }]}>
                    <ImageBackground source={images.backGround} style={[commonStyle.fullSize, { height: hp(90) }]}>
                        <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                            <Text style={[commonStyle.title, { marginTop: hp(12), marginBottom: Spacing.MARGIN_25, color: '#353535', fontSize: Typography.FONT_SIZE_30 }]}>My Wallet</Text>


                            <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText]}>Top Up</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('WalletHistory')}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText]}>View History</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Share')}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText]}>Share and Earn</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
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
        //backgroundColor:'red'
    }
})