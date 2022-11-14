import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { useNavigation } from '@react-navigation/native';
import Down from '../../images/svg/down';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import MasterData from '../../MasterData';



export default function Report() {


    const navigation = useNavigation();
    const [missionModal, setMissionModal] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [blessingModal, setBlessingModal] = useState(false);
    const [shopModal, setShopModal] = useState(false);
    const [yearSelectModal, setYearSelectModal] = useState(false);
    const [year, setYear] = useState('');
    const yearData = MasterData.year;
    const [monthSelectModal, setMonthSelectModal] = useState(false);
    const [month, setMonth] = useState('');
    const monthData = MasterData.month;
    const [categorySelectModal, setCategorySelectModal] = useState(false);
    const [category, setCategory] = useState('');
    const categoryData = MasterData.schoolSupplies;
    const [statusSelectModal, setStatusSelectModal] = useState(false);
    const [status, setStatus] = useState('');
    const statusData = MasterData.orderedProduct;


    const yearRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setYear(item.year); setYearSelectModal(false); setBlessingModal(true) }} style={[commonStyle.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt]}>{item.year}</Text>
            </TouchableOpacity>
        )
    }

    const monthRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setMonth(item.month); setMonthSelectModal(false); setBlessingModal(true) }} style={[commonStyle.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt]}>{item.month}</Text>
            </TouchableOpacity>
        )
    }

    const categoryRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setCategory(item.name); setCategorySelectModal(false); setShopModal(true) }} style={[commonStyle.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const statusRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setStatus(item.name); setStatusSelectModal(false); setShopModal(true) }} style={[commonStyle.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <Header logo={true} />

            <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
                <ImageBackground source={images.backGround} resizeMode='cover' style={[commonStyle.fullSize]}>
                    <View style={{ padding: Spacing.MARGIN_20 }}>
                        <Text style={[commonStyle.title, { marginTop: hp(2), marginBottom: Spacing.MARGIN_25 }]}>Report</Text>
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

                        <TouchableOpacity onPress={() => navigation.navigate('Blessing')}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText]}>Blessings</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('InCart')}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText]}>Shop</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'SettingStack',params:{screen: 'Pricing',} })}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText]}>Pricing</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'SettingStack' })}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[styles.btnText]}>Settings</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
                {/* MISSION MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={missionModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, paddingBottom: hp(7) }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal, { height: hp(12) }]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE }]}>Missions</Text>
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
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal, { height: hp(12) }]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, }]}>Video</Text>
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
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal, { height: hp(12) }]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE }]}>Blessings</Text>
                            </LinearGradient>

                            <View style={[styles.whiteBackground]}>
                                <View style={{ paddingVertical: 20 }}>
                                    <Text style={[styles.modalText]}>Select Year</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20, marginVertical: 0, width: wp(50.5) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 20, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            {year == '' && (
                                                <Text style={[styles.selectPlaceHolder]}>Year</Text>
                                            )}
                                            {year != '' && (
                                                <Text style={[styles.selectedTxt]}>{year}</Text>
                                            )}
                                            <TouchableOpacity onPress={() => { setYearSelectModal(true); setBlessingModal(false) }}>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <Text style={[styles.modalText]}>Select Months</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 20, marginVertical: 0, width: wp(50.5) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 20, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            {month == '' && (
                                                <Text style={[styles.selectPlaceHolder]}>Month</Text>
                                            )}
                                            {month != '' && (
                                                <Text style={[styles.selectedTxt]}>{month}</Text>
                                            )}
                                            <TouchableOpacity onPress={() => { setMonthSelectModal(true); setBlessingModal(false) }}>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <TouchableOpacity onPress={() => { setBlessingModal(false); navigation.navigate('Blessing') }} style={{ paddingHorizontal: Spacing.MARGIN_30, marginTop: Spacing.MARGIN_10, }}>
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
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal, { height: hp(12) }]} >
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.WHITE, }]}>Shop</Text>
                            </LinearGradient>

                            <View style={[styles.whiteBackground, { borderRadius: 90, paddingVertical: Spacing.MARGIN_30, paddingHorizontal: Spacing.MARGIN_45 }]}>
                                <View style={{}}>
                                    <Text style={[styles.modalText]}>Select Categories</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 15, marginVertical: 0, width: wp(45) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 14, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>

                                            {category == '' && (
                                                <Text style={[styles.selectPlaceHolder]}>School Supplies</Text>
                                            )}
                                            {category != '' && (
                                                <Text style={[styles.selectedTxt]}>{category}</Text>
                                            )}
                                            <TouchableOpacity onPress={() => { setCategorySelectModal(true); setShopModal(false) }}>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <Text style={[styles.modalText]}>Select Status</Text>
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn, { borderRadius: 15, marginVertical: 0, width: wp(45) }]} >
                                        <View style={[styles.btnView, commonStyle.flexRow, { width: '98%', borderRadius: 14, paddingHorizontal: Spacing.MARGIN_15, paddingVertical: Spacing.MARGIN_5, justifyContent: 'space-between' }]}>
                                            {status == '' && (
                                                <Text style={[styles.selectPlaceHolder]}>Ordered Product</Text>
                                            )}
                                            {status != '' && (
                                                <Text style={[styles.selectedTxt]}>{status}</Text>
                                            )}
                                            <TouchableOpacity onPress={() => { setStatusSelectModal(true); setShopModal(false) }}>
                                                <Down height={hp(3)} width={wp(4)} />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>

                                    <TouchableOpacity onPress={() => { setShopModal(false); navigation.navigate('InCart') }} style={{ paddingHorizontal: Spacing.MARGIN_30, marginTop: Spacing.MARGIN_10, }}>
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
                {/* Year select */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={yearSelectModal}
                >
                    <View style={[commonStyle.dopDownModal,]}>
                        <View style={[commonStyle.modalWhiteBg]}>
                            <FlatList
                                data={yearData}
                                renderItem={yearRenderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setYearSelectModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* month select */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={monthSelectModal}
                >
                    <View style={[commonStyle.dopDownModal,]}>
                        <View style={[commonStyle.modalWhiteBg]}>
                            <FlatList
                                data={monthData}
                                renderItem={monthRenderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setMonthSelectModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* category select */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={categorySelectModal}
                >
                    <View style={[commonStyle.dopDownModal,]}>
                        <View style={[commonStyle.modalWhiteBg]}>
                            <FlatList
                                data={categoryData}
                                renderItem={categoryRenderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setCategorySelectModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* status select */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={statusSelectModal}
                >
                    <View style={[commonStyle.dopDownModal,]}>
                        <View style={[commonStyle.modalWhiteBg]}>
                            <FlatList
                                data={statusData}
                                renderItem={statusRenderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setStatusSelectModal(false)}>
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
    selectedTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_14
    },
    selectPlaceHolder: {
        fontFamily: 'Montserrat-Regular',
        color: '#747474',
        fontSize: Typography.FONT_SIZE_14
    }
})