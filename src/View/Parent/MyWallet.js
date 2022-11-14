import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Modal, Image } from 'react-native'
import commonStyle from '../../Styles/parentStyle';
import CommonHeader from '../../Component/CommonHeader'
import { Colors, Spacing, Typography } from '../../Styles/theme'
import { images } from '../../Constant/background'
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import parentStyle from '../../Styles/parentStyle';

export default function MyWallet() {
    const [walletModal,setWalletModal]=useState(false);
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize,{height:hp(95)}]}>
                <CommonHeader />
                <View style={[styles.mainView]}>
                    <Text style={[styles.head2,{ marginTop: Spacing.MARGIN_80, width: '50%',}]}>You are about to Top up</Text>
                    <Text style={[styles.head1]}>200 INR</Text>
                    <TouchableOpacity style={{ marginTop: Spacing.MARGIN_30 }} onPress={() => console.log('ahsgh')}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <View style={[styles.btnView, { width: '99%' }]}>
                                <Text style={[commonStyle.btnText, { color: Colors.PRIMARY }]}>Confirm</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: Spacing.MARGIN_10 }} onPress={() => console.log('ahsgh')}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Back</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]}/>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={walletModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[styles.head1]}>200 INR</Text>
                        <Text style={[styles.head2,{fontSize: Typography.FONT_SIZE_15}]}>Successfully Top Up</Text>

                        <View style={[commonStyle.flexRow,{alignSelf:'center',marginVertical:Spacing.MARGIN_30}]}>
                            <Text style={[styles.head2,{fontSize: Spacing.FONT_SIZE_14,  fontFamily: 'Montserrat-Regular'}]}>My wallet amount</Text>
                            <Text style={[styles.head2,{fontSize: Typography.FONT_SIZE_16,color:Colors.PRIMARY,marginLeft:Spacing.PADDING_7,fontFamily: 'Montserrat-Regular'}]}>2700 INR</Text>
                        </View>


                    </View>
                    <TouchableOpacity onPress={() => setWalletModal(false)}>
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
    },
    head1: {
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginTop: Spacing.MARGIN_30
    },
    head2: {
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
        textAlign: 'center',
               alignSelf: 'center',
       
    }
})