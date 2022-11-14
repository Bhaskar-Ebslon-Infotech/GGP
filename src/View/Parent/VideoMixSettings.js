import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Header from '../../Component/Header'
import parentStyle from '../../Styles/parentStyle';
export default function VideoMixSettings() {
    const navigation = useNavigation();

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <Header logo={true} />
            <ScrollView>
                <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize, { height: hp(95) }]}>

                    <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                        <Text style={[commonStyle.title, { marginTop: hp(25), marginBottom: Spacing.MARGIN_25, color: '#353535', fontSize: Typography.FONT_SIZE_30 }]}>VideoMix Settings</Text>


                        <TouchableOpacity onPress={() => navigation.navigate('KidsVideoListEdit')} style={{ marginTop: Spacing.MARGIN_30 }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText]}>Manage VideoMix</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>


                    </View>
                    <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]} />
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
    }
})
