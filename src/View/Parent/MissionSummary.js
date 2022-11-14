import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Cut from '../../images/svg/parentsvg/circleMinus';
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Component/Header';
import { useNavigation } from '@react-navigation/native';

export default function MissionSummary() {
    const navigation = useNavigation();
    const [deleteModal, setDeleteModal] = useState(false);
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true}/>
            <View style={{ width: '100%' }}>
                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.LIGHT_BLACK, marginTop: Spacing.MARGIN_25, marginBottom: Spacing.MARGIN_10 }]}>Mission Summary</Text>
                <Text style={[styles.topText, { width: '80%', alignSelf: 'center', }]}>Set a reward either after finishing the whole behavior or finishing per task.</Text>
                <Text style={[styles.topText, { marginTop: Spacing.MARGIN_5 }]}>You can update this anytime.</Text>
            </View>

            <View style={{ flex: 1, position: 'absolute', width: '100%', top: hp(30) }}>
                <ImageBackground source={require('../../images/missionSummaryBg.png')} resizeMode='contain' style={[styles.bg]}>
                    <View style={[styles.View]}>
                        <Text style={[styles.title]}>Hygiene</Text>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.MARGIN_25 }]}>
                            <TouchableOpacity style={[commonStyle.flexRow]} onPress={() => setDeleteModal(true)}>
                                <Cut height={hp(4)} width={wp(7)} />
                                <Text style={[styles.text]}>Comb your hair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyle.flexRow]}  onPress={() => setDeleteModal(true)}>
                                <Cut height={hp(4)} width={wp(7)} />
                                <Text style={[styles.text]}>Brush your teeth</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between', marginTop: Spacing.MARGIN_25 }]}>
                            <TouchableOpacity style={[commonStyle.flexRow]}  onPress={() => setDeleteModal(true)}>
                                <Cut height={hp(4)} width={wp(7)} />
                                <Text style={[styles.text]}>Trim your nails</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyle.flexRow]}  onPress={() => setDeleteModal(true)}>
                                <Cut height={hp(4)} width={wp(7)} />
                                <Text style={[styles.text]}>Wash your hands</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_50, width: '100%', }]}>
                            <TouchableOpacity style={[styles.btn]}>
                                <Text style={[styles.btnText]}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { marginLeft: Spacing.SCALE_12 }]}>
                                <Text style={[styles.btnText]}>Next</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText]}>Are you sure you want to Delete this mission?</Text>


                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={()=>navigation.navigate('BottomTabBar', { screen: 'MissionVideoStack',params:{screen: 'MissionApproved',} })}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} onPress={() => setDeleteModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <Text style={[commonStyle.btnText]}>No</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setDeleteModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>




                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    bg: {
        height: hp(80),
        width: '100%',
        padding: Spacing.MARGIN_20
    },
    View: {
        position: 'absolute',
        top: hp(25),
        padding: Spacing.MARGIN_20,
        width: wp(100)
    },
    title: {
        fontSize: Typography.FONT_SIZE_25,
        color: Colors.WHITE,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    text: {
        marginLeft: Spacing.PADDING_7,
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.WHITE
    },
    btnText: {
        textAlign: 'center',
        paddingVertical: Spacing.PADDING_5,
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
    },
    btn: {
        width: '48%',
        borderWidth: 2,
        borderColor: Colors.WHITE,
        borderRadius: 18
    },
    topText: {
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-REGULAR',
        textAlign: 'center'
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 1,
    },
})