import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { ANTDESIGN } from '../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { createMissions, deleteMission, getMissionsCompletedByKidId, getMissionsForApprovalByKidId, getUserMissions } from '../api/Missions';
import { kidContext } from '../Context/CurrentKidContext';
import { LoaderContext, toggleModalContext } from '../../App';

export default function MissionSubmit({ show, close , confirmation }) {
    const focused = useIsFocused()

    const modelClose = () => {
        close()
    }
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                            </LinearGradient>
                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_30 }]}>Do you want to Submit this mission ?</Text>
                            </View>

                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                                <TouchableOpacity style={{ width: '40%' }} onPress={() => confirmation()} >
                                    {/* <TouchableOpacity style={{ width: '40%' }} onPress={() => { setAddVideoModal(true) }} > */}
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]}>
                                        <View style={[styles.btnView]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={modelClose} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/* <TouchableOpacity onPress={modelClose}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity> */}
                    </View>
                </Modal>
            </View>
        )
    }


const styles = StyleSheet.create({
    topView: {
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: 'center',
        width: wp(92),
        borderRadius: 20,
        marginTop: Spacing.MARGIN_15,
        borderColor: '#DEDEDE',
        backgroundColor: Colors.WHITE
    },
    topText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        paddingVertical: Spacing.PADDING_7,
        textAlign: 'center',
    },
    listBorder: {
        padding: Spacing.MARGIN_15,
        marginHorizontal: Spacing.PADDING_2,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15,
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,

    },
    selectWhiteBtn: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.PADDING_7,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_22,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
    },
    listSubTitle: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
    },
    listContain: {
        color: '#747474',
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
        marginTop: Spacing.PADDING_3
    },
    listInr: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        marginRight: Spacing.MARGIN_20
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 1,
    },
    linearSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        alignSelf: 'center',
        borderRadius: 15,
    },
})