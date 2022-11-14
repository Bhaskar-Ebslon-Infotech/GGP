import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../../App';
import { deleteMission, getUserMissions } from '../../api/Missions';
import { kidContext } from '../../Context/CurrentKidContext';
import Cancel from '../../images/svg/parentsvg/cancel';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { KidMissionCompletionStatus } from '../../api/utils/StatusForKidMissionCompletionStatus';
import { KidMissionUpdate } from '../../api/kidMissionCompletion';

export default function MissionTodos() {
    const [todoModal, setTodoModal] = useState(false);
    const focused = useIsFocused()
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [selectedMissionId, setSelectedMission] = useState({});
    const [todoArr, setTodoArr] = useState([]);

    const getUserMissionData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getUserMissions(currentKid._id)
            console.log(JSON.stringify(res.data[0]?.status, null, 3), "response ******************************************************************************************************************************************************************************************************************************************")
            console.log(JSON.stringify(res.data.filter(el => el.status == "CREATED").length, null, 3), "response ******************************************************************************************************************************************************************************************************************************************")
            if (res.data) {
                setTodoArr(res.data)
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error.response.data.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        if (focused) {
            getUserMissionData()
        }
    }, [focused])





    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.listBorder, index == todoArr.length - 1 && { marginBottom: Spacing.MARGIN_20, }]}>

                <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'column', width: '70%' }}>
                        <Text style={[styles.listTitle]}>{item?.activityObj?.name}</Text>
                        <Text style={[styles.listSubTitle]}>{item?.categoryObj?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={[styles.listInr]}>{item.attributeArr.reduce((acc, el) => acc + el?.coinsAmount, 0)} INR</Text>
                        <TouchableOpacity onPress={() => { setTodoModal(true); setSelectedMission(item._id); }} style={[commonStyle.flexRow, { marginLeft: Spacing.MARGIN_20 }]}>
                            <Cancel height={hp(3)} width={wp(6)} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    item.timeAndDateObj.daysArr.length > 0 &&
                    <Text style={[styles.listContain,]}>Days - {item?.timeAndDateObj?.daysArr?.map(el => {
                        if (el?.selected) {
                            return `${el?.day} `
                        }
                    })}</Text>
                }
                {
                    item.timeAndDateObj.stopAfter &&
                    <Text style={[styles.listContain,]}>Stop After - {item?.timeAndDateObj?.stopAfter} Day/s</Text>
                }
                {
                    item.timeAndDateObj.stopOn &&
                    <Text style={[styles.listContain,]}>Stop On - {`${new Date(item?.timeAndDateObj?.stopOn).getDate()}/${new Date(item.timeAndDateObj.stopOn).getMonth() + 1}/${new Date(item.timeAndDateObj.stopOn).getFullYear()}`}</Text>
                }
                {
                    item.attributeArr.map((el, index) => {
                        return (
                            <>
                                <Text style={[styles.listContain,]}>{el?.attributesObj?.name}  </Text>
                                <Text style={[styles.listContain,]}>{el?.coinsAmount} Coins - {el?.frequencyAmount} Frequency</Text>
                            </>
                        )
                    })
                }

            </View>
        )
    }

    const handleMissionDelete = async () => {
        setLoading(true)
        try {
            console.log(JSON.stringify(selectedMissionId, null, 2))
            let { data: res } = await deleteMission(selectedMissionId)
            if (res.message) {
                setTodoModal(false)
                setToggleModal(true)
                setMessage(res.message)
                getUserMissionData()
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error.response.data.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
        setLoading(false)
    }



    return (
        <View>
            <FlatList
                data={todoArr}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: Spacing.SIZE_300 }}
                keyExtractor={item => item._id}
                ListEmptyComponent={
                    <Text style={[styles.listContain, { marginLeft: 20, marginTop: 15 }]}>No Data Found</Text>
                }

            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={todoModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>Do you want to remove mission on <Text style={{ color: Colors.PRIMARY }}>To Do?</Text></Text>
                            <Text style={[styles.listSubTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '80%', alignSelf: 'center', marginTop: Spacing.MARGIN_15, fontSize: Typography.FONT_SIZE_15 }]}>Once removed, Mission will not be available for a kid too and you need to add again from Missions.</Text>
                        </View>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => { handleMissionDelete() }}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView,]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setTodoModal(false)} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setTodoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
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