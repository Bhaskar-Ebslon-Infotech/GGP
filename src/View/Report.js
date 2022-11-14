import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import { ANTDESIGN } from '../Styles/theme/Icons';
import { useNavigation } from '@react-navigation/native';
import Down from '../images/svg/down';

export default function Report() {
    const navigation = useNavigation();
    const [missionModal, setMissionModal] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [blessingModal, setBlessingModal] = useState(false);
    const [shopModal, setShopModal] = useState(false);
    return (
        <>

            <View style={{ backgroundColor: Colors.WHITE, flex: 1, padding: Spacing.MARGIN_20 }}>

                <Text style={[commonStyle.title, { marginTop: hp(12), marginBottom: Spacing.MARGIN_25 }]}>Report</Text>
                <TouchableOpacity onPress={() => setMissionModal(true)}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                        <View style={[styles.btnView]}>
                            <Text style={[styles.btnText]}>Missions</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setVideoModal(true)}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                        <View style={[styles.btnView]}>
                            <Text style={[styles.btnText]}>Video Garage</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setBlessingModal(true)}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                        <View style={[styles.btnView]}>
                            <Text style={[styles.btnText]}>Blessings</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShopModal(true)}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                        <View style={[styles.btnView]}>
                            <Text style={[styles.btnText]}>Shop</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                {/* MISSION MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={missionModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, paddingBottom: hp(7) }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, }]}>Missions</Text>
                            </LinearGradient>
                            <View style={{ paddingHorizontal: Spacing.MARGIN_50, marginTop: hp(7) }}>
                                <TouchableOpacity onPress={() => { setMissionModal(false); navigation.navigate('InProgress') }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                        <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16 }]}>In Progress</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setMissionModal(false); navigation.navigate('Complete') }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                        <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16 }]}>Completed</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setMissionModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* VIDEO MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={videoModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, paddingBottom: hp(7) }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, fontWeight: '700' }]}>Video</Text>
                            </LinearGradient>
                            <View style={{ paddingHorizontal: Spacing.MARGIN_50, marginTop: hp(7) }}>
                                <TouchableOpacity onPress={() => { setVideoModal(false); navigation.navigate('VideoProgress') }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                        <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16 }]}>In Progress</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setVideoModal(false); navigation.navigate('VideoComplete') }}>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                        <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16 }]}>Completed</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setVideoModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* BLESSING MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={blessingModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, fontWeight: '700' }]}>Blessings</Text>
                            </LinearGradient>

                            <View style={[styles.whiteBackground]}>
                                <View>
                                    <Text style={[styles.modalText]}>Select Year</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20, marginVertical: 0, width: wp(50.5) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 20, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            <Text>2021</Text>
                                            <TouchableOpacity>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <Text style={[styles.modalText]}>Select Months</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20, marginVertical: 0, width: wp(50.5) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 20, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            <Text>2021</Text>
                                            <TouchableOpacity>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <TouchableOpacity onPress={() => { setBlessingModal(false); navigation.navigate('Blessing') }} style={{ paddingHorizontal: Spacing.MARGIN_30, marginVertical: Spacing.MARGIN_5, marginBottom: Spacing.MARGIN_10 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                            <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16, paddingVertical: Spacing.PADDING_7, }]}>Proceed</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => setBlessingModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* SHOP MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={shopModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, fontWeight: '700' }]}>Shop</Text>
                            </LinearGradient>

                            <View style={[styles.whiteBackground]}>
                                <View style={{}}>
                                    <Text style={[styles.modalText]}>Select Categories</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 10, marginVertical: 0, width: wp(50) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 10, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            <Text >School Supplies</Text>
                                            <TouchableOpacity>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <Text style={[styles.modalText]}>Select Status</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20, marginVertical: 0, borderRadius: 10, width: wp(50) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 10, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            <Text>Ordered Product</Text>
                                            <TouchableOpacity>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <TouchableOpacity onPress={() => { setShopModal(false); console.log('abc') }} style={{ paddingHorizontal: Spacing.MARGIN_30, marginVertical: Spacing.MARGIN_5, marginBottom: Spacing.MARGIN_10 }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20 }]} >
                                            <Text style={[styles.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_16, paddingVertical: Spacing.PADDING_7, }]}>Proceed</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => setShopModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
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
        fontFamily: 'Montserrat-Regular',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        //fontWeight: '600',
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