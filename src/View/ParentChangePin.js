import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Header from '../Component/Header';
// import Flag from '../images/svg/flag';
// import Down from '../images/svg/dropDown';

export default function ParentChangePin() {
    const [changePinModal, SetChangePinModal] = useState(false);
    return (
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../images/pigBg.png')} style={[commonStyle.fullSize]}>
                {/* <Header  /> */}
                <View style={{ padding: Spacing.PADDING_20 }}>
                    <Text style={[styles.head1]}>Parent Settings</Text>
                    <Text style={[styles.head2]}>Change PIN</Text>
                    <Text style={[styles.label, { marginTop: Spacing.MARGIN_20 }]}>Old PIN:</Text>
                    <TextInput placeholder='Enter old 4-digit PIN' keyboardType='numeric' style={[styles.input]} />
                    <Text style={[styles.label]}>New PIN:</Text>
                    <TextInput placeholder='Enter new 4-digit PIN' keyboardType='numeric' style={[styles.input]} />
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={() => SetChangePinModal(true)}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Change PIN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={changePinModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>PIN Changed!</Text>


                    </View>
                    <TouchableOpacity onPress={() => SetChangePinModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>




                </View>
            </Modal>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        marginTop: Spacing.MARGIN_15
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_12,
        color: '#747474',
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.PADDING_4
    },
    input: {
        borderWidth: 1,
        height: hp(5.5),
        borderRadius: 20,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.PRIMARY,
        marginTop: Spacing.PADDING_4,
    },
    head1: {
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginTop: Spacing.MARGIN_50
    },
    head2: {
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        textAlign: 'center'
    }
})