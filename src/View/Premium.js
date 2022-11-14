import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Modal, Image, TextInput, ScrollView } from 'react-native'
import commonStyle from '../Styles/parentStyle';
import CommonHeader from '../Component/CommonHeader'
import { Colors, Spacing, Typography } from '../Styles/theme'
import { images } from '../Constant/background'
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import parentStyle from '../Styles/parentStyle';

export default function Premium(props) {
    const [modal, setModal] = useState(false);
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ScrollView>
                {/* <ImageBackground source={require('../images/bg2.png')} resizeMode='cover' style={[commonStyle.fullSize, ]}> */}
                <CommonHeader />

                <View style={[styles.mainView]}>
                    <Text style={[styles.head2, { marginTop: Spacing.MARGIN_80, }]}>Go Premium</Text>
                    <Text style={[styles.head1]}>200 INR</Text>

                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.MARGIN_30 }]}>
                        <Text style={[styles.txt]}>Not enough Wallet Amount</Text>
                        <Text style={[styles.txt]}>Top up now </Text>
                    </View>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                        <View style={[styles.btnView, { width: '99%' }]}>
                            <TextInput placeholder='2500' />
                            <Text style={{ color: '#747474', fontSize: 13, fontFamily: 'Montserrat-Regular' }}>My Wallet</Text>
                        </View>
                    </LinearGradient>


                    {/* <TouchableOpacity onPress={() => setModal(true)} style={{ marginTop: Spacing.MARGIN_10 }} > */}
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Dashboard') }} style={{ marginTop: Spacing.MARGIN_10 }} >
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {/* <Image source={require('../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]} /> */}
                {/* </ImageBackground> */}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[styles.head1, { marginTop: 30 }]}>Congratulations!</Text>
                        <Text style={[styles.head2, { fontSize: Typography.FONT_SIZE_17, width: '70%', marginTop: 10, marginBottom: 30 }]}>You are now on an
                            Annual Premium</Text>

                    </View>
                    <TouchableOpacity onPress={() => setModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        padding: Spacing.MARGIN_20,
    },
    btnView: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.MARGIN_15,
        justifyContent: 'space-between',
        height: hp(6)
    },
    head1: {
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginTop: Spacing.MARGIN_5
    },
    head2: {
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
        textAlign: 'center',
        alignSelf: 'center',
    },
    txt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: Colors.PRIMARY
    }
})